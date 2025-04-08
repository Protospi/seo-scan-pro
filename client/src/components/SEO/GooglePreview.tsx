import { SEOAnalysis } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTruncatedUrl, getStatusBadgeColor } from "@/lib/seoUtils";

interface GooglePreviewProps {
  analysis: SEOAnalysis;
}

export function GooglePreview({ analysis }: GooglePreviewProps) {
  const { url, title, description, favicon, canonical } = analysis;
  const truncatedUrl = getTruncatedUrl(url);

  return (
    <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <CardTitle className="text-lg font-medium text-gray-900">Google Search Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="max-w-2xl mx-auto border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="text-sm text-green-800 truncate">{truncatedUrl}</div>
          <div className="text-xl text-blue-700 font-medium mt-1 hover:underline cursor-pointer">
            {title.content || "No title available"}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {description.content || "No description available"}
          </div>
          
          <div className="mt-3 flex flex-col space-y-2 text-sm">
            <div>
              <span className="text-gray-500">Favicon:</span>
              <Badge className={`ml-2 ${getStatusBadgeColor(favicon.status)}`}>
                {favicon.status === "good" ? "Present" : "Missing"}
              </Badge>
            </div>
            <div>
              <span className="text-gray-500">Title:</span>
              <Badge className={`ml-2 ${getStatusBadgeColor(title.status)}`}>
                {title.length ? `${title.length} characters ${title.message ? `(${title.message})` : ""}` : "Missing"}
              </Badge>
            </div>
            <div>
              <span className="text-gray-500">Description:</span>
              <Badge className={`ml-2 ${getStatusBadgeColor(description.status)}`}>
                {description.length ? `${description.length} characters ${description.message ? `(${description.message})` : ""}` : "Missing"}
              </Badge>
            </div>
            <div>
              <span className="text-gray-500">URL:</span>
              <Badge className={`ml-2 ${getStatusBadgeColor(canonical.status)}`}>
                {canonical.status === "good" ? "Clean and SEO-friendly" : "Issues detected"}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GooglePreview;
