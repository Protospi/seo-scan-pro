import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define SEO tag structure for analysis results
export const seoAnalysisSchema = z.object({
  url: z.string().url(),
  title: z.object({
    content: z.string().optional(),
    length: z.number().optional(),
    status: z.enum(["good", "needs_improvement", "missing"]).optional(),
    message: z.string().optional(),
  }),
  description: z.object({
    content: z.string().optional(),
    length: z.number().optional(),
    status: z.enum(["good", "needs_improvement", "missing"]).optional(),
    message: z.string().optional(),
  }),
  canonical: z.object({
    content: z.string().optional(),
    status: z.enum(["good", "needs_improvement", "missing"]).optional(),
    message: z.string().optional(),
  }),
  viewport: z.object({
    content: z.string().optional(),
    status: z.enum(["good", "needs_improvement", "missing"]).optional(),
  }),
  favicon: z.object({
    content: z.string().optional(),
    status: z.enum(["good", "needs_improvement", "missing"]).optional(),
  }),
  openGraph: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    url: z.string().optional(),
    type: z.string().optional(),
    status: z.enum(["good", "needs_improvement", "missing"]).optional(),
  }),
  twitter: z.object({
    card: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    status: z.enum(["good", "needs_improvement", "missing"]).optional(),
  }),
  structuredData: z.object({
    content: z.string().optional(),
    status: z.enum(["good", "needs_improvement", "missing"]).optional(),
    message: z.string().optional(),
  }),
  metaTags: z.array(
    z.object({
      name: z.string(),
      content: z.string(),
      property: z.string().optional(),
      status: z.enum(["good", "needs_improvement", "missing"]).optional(),
      message: z.string().optional(),
      category: z.enum(["basic", "social", "technical"]).optional(),
    })
  ),
  score: z.object({
    value: z.number(),
    status: z.enum(["good", "needs_improvement", "poor"]),
    implemented: z.number(),
    needsImprovement: z.number(),
    missing: z.number(),
  }),
  recommendations: z.array(
    z.object({
      message: z.string(),
      status: z.enum(["good", "needs_improvement", "missing"]),
    })
  ),
});

export type SEOAnalysis = z.infer<typeof seoAnalysisSchema>;

// Original users table (keep for backwards compatibility)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
