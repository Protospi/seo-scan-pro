import { useState } from "react";
import { SEOAnalysis } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SocialPreviewTab } from "@/lib/types";
import { getStatusBadgeColor } from "@/lib/seoUtils";

interface SocialPreviewProps {
  analysis: SEOAnalysis;
}

const socialPlatforms: SocialPreviewTab[] = [
  { label: "Facebook", value: "facebook" },
  { label: "Twitter", value: "twitter" },
  { label: "LinkedIn", value: "linkedin" },
];

export function SocialPreview({ analysis }: SocialPreviewProps) {
  const [activeTab, setActiveTab] = useState<string>("facebook");
  const { openGraph, twitter, url } = analysis;

  const getImage = () => {
    if (activeTab === "twitter" && twitter.image) {
      return twitter.image;
    }
    return openGraph.image || "";
  };

  const getTitle = () => {
    if (activeTab === "twitter" && twitter.title) {
      return twitter.title;
    }
    return openGraph.title || analysis.title.content || "";
  };

  const getDescription = () => {
    if (activeTab === "twitter" && twitter.description) {
      return twitter.description;
    }
    return openGraph.description || analysis.description.content || "";
  };

  // Get hostname from URL
  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <CardTitle className="text-lg font-medium text-gray-900">Social Media Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex space-x-4 mb-4">
          {socialPlatforms.map((platform) => (
            <Button
              key={platform.value}
              type="button"
              variant={activeTab === platform.value ? "secondary" : "ghost"}
              className={activeTab === platform.value 
                ? "px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50" 
                : "px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"}
              onClick={() => setActiveTab(platform.value)}
            >
              {platform.label}
            </Button>
          ))}
        </div>
        
        <div className="max-w-md mx-auto overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="h-52 bg-gray-200 relative">
            {getImage() ? (
              <img 
                src={getImage()} 
                alt={`${activeTab} preview image`} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>
          <div className="p-4 bg-white">
            <div className="text-xs text-gray-500 uppercase">{getHostname(url)}</div>
            <h3 className="mt-1 text-lg font-semibold text-gray-900 leading-tight">
              {getTitle() || "No title available"}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {getDescription() || "No description available"}
            </p>
          </div>
        </div>
        
        <div className="mt-4 space-y-2 text-sm">
          {activeTab === "facebook" || activeTab === "linkedin" ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">og:title</span>
                <Badge className={`${getStatusBadgeColor(openGraph.title ? "good" : "missing")}`}>
                  {openGraph.title ? "Present" : "Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">og:description</span>
                <Badge className={`${getStatusBadgeColor(openGraph.description ? "good" : "missing")}`}>
                  {openGraph.description ? "Present" : "Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">og:image</span>
                <Badge className={`${getStatusBadgeColor(openGraph.image ? "good" : "missing")}`}>
                  {openGraph.image ? "Present" : "Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">og:url</span>
                <Badge className={`${getStatusBadgeColor(openGraph.url ? "good" : "missing")}`}>
                  {openGraph.url ? "Present" : "Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">og:type</span>
                <Badge className={`${getStatusBadgeColor(openGraph.type ? "good" : "missing")}`}>
                  {openGraph.type ? "Present" : "Missing"}
                </Badge>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">twitter:card</span>
                <Badge className={`${getStatusBadgeColor(twitter.card ? "good" : "missing")}`}>
                  {twitter.card ? "Present" : "Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">twitter:title</span>
                <Badge className={`${getStatusBadgeColor(twitter.title ? "good" : "missing")}`}>
                  {twitter.title ? "Present" : "Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">twitter:description</span>
                <Badge className={`${getStatusBadgeColor(twitter.description ? "good" : "missing")}`}>
                  {twitter.description ? "Present" : "Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">twitter:image</span>
                <Badge className={`${getStatusBadgeColor(twitter.image ? "good" : "missing")}`}>
                  {twitter.image ? "Present" : "Missing"}
                </Badge>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default SocialPreview;
