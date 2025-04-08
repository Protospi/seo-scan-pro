import { SEOAnalysis } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTruncatedUrl } from "@/lib/seoUtils";
import { ExternalLink, CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface GooglePreviewProps {
  analysis: SEOAnalysis;
}

export function GooglePreview({ analysis }: GooglePreviewProps) {
  const { url, title, description, favicon, canonical } = analysis;
  const truncatedUrl = getTruncatedUrl(url);

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "good":
        return (
          <Badge className="badge-success ml-2 flex items-center gap-1 px-2 py-1">
            <CheckCircle className="h-3 w-3" />
            <span>Good</span>
          </Badge>
        );
      case "needs_improvement":
        return (
          <Badge className="badge-warning ml-2 flex items-center gap-1 px-2 py-1">
            <AlertCircle className="h-3 w-3" />
            <span>Needs Work</span>
          </Badge>
        );
      case "missing":
        return (
          <Badge className="badge-danger ml-2 flex items-center gap-1 px-2 py-1">
            <XCircle className="h-3 w-3" />
            <span>Missing</span>
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="card h-full">
      <CardHeader className="px-6 py-4 border-b border-gray-100">
        <CardTitle className="text-xl font-bold text-gray-900">Google Search Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="w-full border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
          {/* Google search result preview */}
          <div className="text-sm text-green-800 flex items-center overflow-hidden">
            <span className="truncate">{truncatedUrl}</span>
            <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0" />
          </div>
          <div className="text-xl text-blue-600 font-medium mt-1 hover:underline cursor-pointer line-clamp-2">
            {title.content || "No title available"}
          </div>
          <div className="text-sm text-gray-700 mt-1 line-clamp-2">
            {description.content || "No description available"}
          </div>
        </div>
        
        {/* Meta fields status */}
        <div className="mt-6 space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div className="text-base font-medium text-gray-800 mb-2">SEO Element Status</div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-gray-700 font-medium">Favicon</span>
              <div className="ml-1 text-gray-400 text-xs">
                {favicon.status === "good" ? "(Present)" : "(Missing)"}
              </div>
            </div>
            {getStatusBadge(favicon.status)}
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div className="flex items-center">
              <span className="text-gray-700 font-medium">Title</span>
              <div className="ml-1 text-gray-400 text-xs">
                {title.length ? `(${title.length} characters)` : "(Missing)"}
              </div>
            </div>
            {getStatusBadge(title.status)}
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div className="flex items-center">
              <span className="text-gray-700 font-medium">Description</span>
              <div className="ml-1 text-gray-400 text-xs">
                {description.length ? `(${description.length} characters)` : "(Missing)"}
              </div>
            </div>
            {getStatusBadge(description.status)}
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div className="flex items-center">
              <span className="text-gray-700 font-medium">URL Structure</span>
              <div className="ml-1 text-gray-400 text-xs">
                {canonical.status === "good" ? "(SEO-friendly)" : "(Issues detected)"}
              </div>
            </div>
            {getStatusBadge(canonical.status)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GooglePreview;
