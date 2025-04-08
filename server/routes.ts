import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeSEO } from "./seoAnalyzer";
import { seoAnalysisSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to analyze a URL for SEO tags
  app.get("/api/analyze", async (req, res) => {
    try {
      const url = req.query.url as string;
      
      if (!url) {
        return res.status(400).json({ 
          message: "URL parameter is required" 
        });
      }
      
      let formattedUrl = url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        formattedUrl = `https://${url}`;
      }

      try {
        // Fetch the HTML content from the given URL
        const response = await fetch(formattedUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; SEOTagInspector/1.0; +https://seotaginspector.example.com)"
          }
        });
        
        if (!response.ok) {
          return res.status(response.status).json({ 
            message: `Failed to fetch URL: ${response.statusText}` 
          });
        }
        
        const html = await response.text();
        
        // Analyze the HTML for SEO tags
        const analysis = await analyzeSEO(formattedUrl, html);
        
        // Validate the analysis against the schema
        const validatedAnalysis = seoAnalysisSchema.parse(analysis);
        
        return res.json(validatedAnalysis);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(500).json({ 
            message: "Error validating analysis results", 
            details: error.errors 
          });
        }
        
        console.error("Error analyzing URL:", error);
        return res.status(500).json({ 
          message: "Error analyzing URL", 
          details: (error as Error).message 
        });
      }
    } catch (error) {
      console.error("Server error:", error);
      return res.status(500).json({ 
        message: "Internal server error", 
        details: (error as Error).message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
