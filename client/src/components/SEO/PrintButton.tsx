import { Button } from "@/components/ui/button";
import { Download, Printer, FileDown } from "lucide-react";
import { SEOAnalysis } from "@shared/schema";
import { useState } from "react";

interface PrintButtonProps {
  analysis: SEOAnalysis;
}

export function PrintButton({ analysis }: PrintButtonProps) {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    
    // Generate a printable version using browser's print functionality
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert('Please allow pop-ups to print the report');
      setIsPrinting(false);
      return;
    }
    
    // Basic styles for the print version
    const styles = `
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #2563eb;
          font-size: 28px;
          margin-bottom: 10px;
          border-bottom: 2px solid #2563eb;
          padding-bottom: 10px;
        }
        h2 {
          color: #1f2937;
          font-size: 22px;
          margin-top: 30px;
          margin-bottom: 15px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 8px;
        }
        h3 {
          color: #374151;
          font-size: 18px;
          margin-top: 25px;
          margin-bottom: 10px;
        }
        .section {
          margin-bottom: 30px;
          background-color: #ffffff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        }
        .meta-tag {
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 12px;
        }
        .meta-tag-name {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .meta-tag-content {
          font-family: monospace;
          background-color: #f3f4f6;
          padding: 8px;
          border-radius: 4px;
          word-break: break-all;
        }
        .status-good {
          color: #047857;
          font-weight: bold;
        }
        .status-needs_improvement {
          color: #d97706;
          font-weight: bold;
        }
        .status-missing {
          color: #dc2626;
          font-weight: bold;
        }
        .score-card {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        .score-value {
          font-size: 48px;
          font-weight: bold;
          padding: 20px;
          border-radius: 50%;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
        }
        .score-good {
          color: #047857;
          background-color: #d1fae5;
        }
        .score-needs_improvement {
          color: #d97706;
          background-color: #fef3c7;
        }
        .score-poor {
          color: #dc2626;
          background-color: #fee2e2;
        }
        .score-stats {
          display: flex;
          gap: 15px;
        }
        .stat-box {
          padding: 10px;
          border-radius: 6px;
          min-width: 100px;
          text-align: center;
        }
        .recommendation {
          background-color: #f3f4f6;
          border-left: 4px solid #2563eb;
          padding: 12px;
          margin-bottom: 10px;
          border-radius: 4px;
        }
        .preview-box {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
        }
        .preview-title {
          color: #1d4ed8;
          font-size: 18px;
          margin-bottom: 5px;
        }
        .preview-url {
          color: #059669;
          font-size: 14px;
          margin-bottom: 8px;
        }
        .preview-description {
          color: #4b5563;
          font-size: 14px;
        }
        .category-title {
          display: flex;
          align-items: center;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
        }
        @media print {
          body {
            font-size: 12pt;
          }
          .section {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          h1, h2, h3 {
            break-after: avoid;
            page-break-after: avoid;
          }
        }
      </style>
    `;
    
    // Get status text
    const getStatusText = (status: string | undefined) => {
      switch (status) {
        case "good":
          return '<span class="status-good">Good</span>';
        case "needs_improvement":
          return '<span class="status-needs_improvement">Needs Improvement</span>';
        case "missing":
          return '<span class="status-missing">Missing</span>';
        case "poor":
          return '<span class="status-missing">Poor</span>';
        default:
          return '<span>Unknown</span>';
      }
    };
    
    // Get truncated URL
    const getTruncatedUrl = (url: string) => {
      try {
        const urlObj = new URL(url);
        return urlObj.hostname;
      } catch (e) {
        return url;
      }
    };
    
    // Calculate score class
    const getScoreClass = (score: number) => {
      if (score >= 80) return "score-good";
      if (score >= 50) return "score-needs_improvement";
      return "score-poor";
    };
    
    // Format current date
    const formatDate = () => {
      const now = new Date();
      return now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
    
    // Generate HTML content for the print window
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>SEO Analysis Report - ${analysis.url}</title>
        ${styles}
      </head>
      <body>
        <h1>Pedro Loes SEO Tag Inspector</h1>
        <p>Analysis for: <strong>${analysis.url}</strong></p>
        <p>Generated on: ${formatDate()}</p>
        
        <div class="section">
          <h2>SEO Score Summary</h2>
          
          <div class="score-card">
            <div class="score-value ${getScoreClass(analysis.score.value)}">
              ${analysis.score.value}
            </div>
            <div>
              <p>Based on ${analysis.score.implemented + analysis.score.needsImprovement + analysis.score.missing} SEO elements analyzed</p>
              <div class="score-stats">
                <div class="stat-box" style="background-color: #d1fae5; color: #047857;">
                  <div>${analysis.score.implemented}</div>
                  <div>Implemented</div>
                </div>
                <div class="stat-box" style="background-color: #fef3c7; color: #d97706;">
                  <div>${analysis.score.needsImprovement}</div>
                  <div>Needs Work</div>
                </div>
                <div class="stat-box" style="background-color: #fee2e2; color: #dc2626;">
                  <div>${analysis.score.missing}</div>
                  <div>Missing</div>
                </div>
              </div>
            </div>
          </div>
          
          <h3>Top Recommendations</h3>
          <div>
            ${analysis.recommendations.map(rec => `
              <div class="recommendation">
                ${getStatusText(rec.status)}: ${rec.message}
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="section">
          <h2>Google Search Preview</h2>
          <div class="preview-box">
            <div class="preview-url">${getTruncatedUrl(analysis.url)}</div>
            <div class="preview-title">${analysis.title.content || "No title available"}</div>
            <div class="preview-description">${analysis.description.content || "No description available"}</div>
          </div>
          
          <h3>SEO Element Status</h3>
          <div class="meta-tag">
            <div class="category-title">Title Tag</div>
            <p>Status: ${getStatusText(analysis.title.status)}</p>
            <p>${analysis.title.length} characters - ${analysis.title.message}</p>
            <div class="meta-tag-content">${analysis.title.content || "No title available"}</div>
          </div>
          
          <div class="meta-tag">
            <div class="category-title">Meta Description</div>
            <p>Status: ${getStatusText(analysis.description.status)}</p>
            <p>${analysis.description.length} characters - ${analysis.description.message}</p>
            <div class="meta-tag-content">${analysis.description.content || "No description available"}</div>
          </div>
          
          <div class="meta-tag">
            <div class="category-title">Canonical URL</div>
            <p>Status: ${getStatusText(analysis.canonical.status)}</p>
            <p>${analysis.canonical.message}</p>
            <div class="meta-tag-content">${analysis.canonical.content || "No canonical URL available"}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Social Media Tags</h2>
          
          <h3>Open Graph Tags</h3>
          <p>Status: ${getStatusText(analysis.openGraph.status)}</p>
          
          <div class="meta-tag">
            <div class="meta-tag-name">og:title</div>
            <div class="meta-tag-content">${analysis.openGraph.title || "Missing"}</div>
          </div>
          
          <div class="meta-tag">
            <div class="meta-tag-name">og:description</div>
            <div class="meta-tag-content">${analysis.openGraph.description || "Missing"}</div>
          </div>
          
          <div class="meta-tag">
            <div class="meta-tag-name">og:image</div>
            <div class="meta-tag-content">${analysis.openGraph.image || "Missing"}</div>
          </div>
          
          <div class="meta-tag">
            <div class="meta-tag-name">og:url</div>
            <div class="meta-tag-content">${analysis.openGraph.url || "Missing"}</div>
          </div>
          
          <div class="meta-tag">
            <div class="meta-tag-name">og:type</div>
            <div class="meta-tag-content">${analysis.openGraph.type || "Missing"}</div>
          </div>
          
          <h3>Twitter Card Tags</h3>
          <p>Status: ${getStatusText(analysis.twitter.status)}</p>
          
          <div class="meta-tag">
            <div class="meta-tag-name">twitter:card</div>
            <div class="meta-tag-content">${analysis.twitter.card || "Missing"}</div>
          </div>
          
          <div class="meta-tag">
            <div class="meta-tag-name">twitter:title</div>
            <div class="meta-tag-content">${analysis.twitter.title || "Missing"}</div>
          </div>
          
          <div class="meta-tag">
            <div class="meta-tag-name">twitter:description</div>
            <div class="meta-tag-content">${analysis.twitter.description || "Missing"}</div>
          </div>
          
          <div class="meta-tag">
            <div class="meta-tag-name">twitter:image</div>
            <div class="meta-tag-content">${analysis.twitter.image || "Missing"}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>All Meta Tags</h2>
          
          ${analysis.metaTags.map(tag => `
            <div class="meta-tag">
              <div class="meta-tag-name">${tag.name}</div>
              <p>Status: ${getStatusText(tag.status)}</p>
              ${tag.message ? `<p>${tag.message}</p>` : ''}
              <div class="meta-tag-content">${tag.content}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="footer">
          <p>Generated by Pedro Loes SEO Tag Inspector</p>
          <p>© ${new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </body>
      </html>
    `;
    
    // Write the content to the new window
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Print the page
    printWindow.onload = () => {
      printWindow.print();
      // Close the print window/tab after printing
      printWindow.onafterprint = () => {
        printWindow.close();
        setIsPrinting(false);
      };
      // If user cancels the print
      setTimeout(() => {
        if (printWindow.document.readyState === 'complete') {
          setIsPrinting(false);
        }
      }, 2000);
    };
  };

  return (
    <Button 
      onClick={handlePrint}
      disabled={isPrinting}
      className="bg-primary hover:bg-primary/90 text-white transition-colors shadow-sm flex items-center gap-2"
    >
      {isPrinting ? (
        <>
          <FileDown className="h-4 w-4" />
          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          <Printer className="h-4 w-4" />
          <span>Print Report</span>
        </>
      )}
    </Button>
  );
}

export default PrintButton;