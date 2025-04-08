import { useState } from "react";
import { SEOAnalysis } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SocialPreviewTab } from "@/lib/types";
import { CheckCircle, XCircle, Image as ImageIcon } from "lucide-react";

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
  
  const getBadgeClass = (present: boolean) => {
    return present ? "badge-success" : "badge-danger";
  };

  return (
    <Card className="card h-full">
      <CardHeader className="px-6 py-4 border-b border-gray-100">
        <CardTitle className="text-xl font-bold text-gray-900">Social Media Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {socialPlatforms.map((platform) => (
            <Button
              key={platform.value}
              type="button"
              variant={activeTab === platform.value ? "secondary" : "outline"}
              className={activeTab === platform.value 
                ? "bg-primary-100 text-primary-800 hover:bg-primary-200 border border-primary-200" 
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"}
              onClick={() => setActiveTab(platform.value)}
            >
              {platform.label}
            </Button>
          ))}
        </div>
        
        {/* Social card preview */}
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white mb-6 hover:shadow-md transition-all duration-200">
          <div className="h-48 sm:h-64 bg-gray-100 relative">
            {getImage() ? (
              <img 
                src={getImage()} 
                alt={`${activeTab} preview image`} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <ImageIcon className="h-12 w-12 mb-2 opacity-30" />
                <span className="text-sm">No image available</span>
              </div>
            )}
          </div>
          <div className="p-5">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{getHostname(url)}</div>
            <h3 className="mt-2 text-xl font-bold text-gray-900 leading-tight line-clamp-2">
              {getTitle() || "No title available"}
            </h3>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">
              {getDescription() || "No description available"}
            </p>
          </div>
        </div>
        
        {/* Tag status boxes */}
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
          <div className="text-base font-medium text-gray-800 mb-4">Required Meta Tags</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTab === "facebook" || activeTab === "linkedin" ? (
              <>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                  <span className="font-medium text-gray-700">og:title</span>
                  <Badge className={`${getBadgeClass(!!openGraph.title)} flex items-center gap-1 px-2.5 py-0.5`}>
                    {openGraph.title ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    <span>{openGraph.title ? "Present" : "Missing"}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                  <span className="font-medium text-gray-700">og:description</span>
                  <Badge className={`${getBadgeClass(!!openGraph.description)} flex items-center gap-1 px-2.5 py-0.5`}>
                    {openGraph.description ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    <span>{openGraph.description ? "Present" : "Missing"}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                  <span className="font-medium text-gray-700">og:image</span>
                  <Badge className={`${getBadgeClass(!!openGraph.image)} flex items-center gap-1 px-2.5 py-0.5`}>
                    {openGraph.image ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    <span>{openGraph.image ? "Present" : "Missing"}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                  <span className="font-medium text-gray-700">og:url</span>
                  <Badge className={`${getBadgeClass(!!openGraph.url)} flex items-center gap-1 px-2.5 py-0.5`}>
                    {openGraph.url ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    <span>{openGraph.url ? "Present" : "Missing"}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                  <span className="font-medium text-gray-700">og:type</span>
                  <Badge className={`${getBadgeClass(!!openGraph.type)} flex items-center gap-1 px-2.5 py-0.5`}>
                    {openGraph.type ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    <span>{openGraph.type ? "Present" : "Missing"}</span>
                  </Badge>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                  <span className="font-medium text-gray-700">twitter:card</span>
                  <Badge className={`${getBadgeClass(!!twitter.card)} flex items-center gap-1 px-2.5 py-0.5`}>
                    {twitter.card ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    <span>{twitter.card ? "Present" : "Missing"}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                  <span className="font-medium text-gray-700">twitter:title</span>
                  <Badge className={`${getBadgeClass(!!twitter.title)} flex items-center gap-1 px-2.5 py-0.5`}>
                    {twitter.title ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    <span>{twitter.title ? "Present" : "Missing"}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                  <span className="font-medium text-gray-700">twitter:description</span>
                  <Badge className={`${getBadgeClass(!!twitter.description)} flex items-center gap-1 px-2.5 py-0.5`}>
                    {twitter.description ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    <span>{twitter.description ? "Present" : "Missing"}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                  <span className="font-medium text-gray-700">twitter:image</span>
                  <Badge className={`${getBadgeClass(!!twitter.image)} flex items-center gap-1 px-2.5 py-0.5`}>
                    {twitter.image ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    <span>{twitter.image ? "Present" : "Missing"}</span>
                  </Badge>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SocialPreview;
