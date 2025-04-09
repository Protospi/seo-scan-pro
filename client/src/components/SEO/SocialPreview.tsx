import { useState } from "react";
import { SEOAnalysis } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SocialPreviewTab } from "@/lib/types";
import { 
  CheckCircle, XCircle, Image as ImageIcon, Facebook, 
  Twitter, Linkedin, Share2, PieChart, AlertTriangle 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SocialPreviewProps {
  analysis: SEOAnalysis;
}

const socialPlatforms: (SocialPreviewTab & { icon: React.ReactNode; color: string })[] = [
  { label: "Facebook", value: "facebook", icon: <Facebook className="h-4 w-4 mr-1" />, color: "bg-blue-600" },
  { label: "Twitter", value: "twitter", icon: <Twitter className="h-4 w-4 mr-1" />, color: "bg-sky-500" },
  { label: "LinkedIn", value: "linkedin", icon: <Linkedin className="h-4 w-4 mr-1" />, color: "bg-blue-700" },
];

export function SocialPreview({ analysis }: SocialPreviewProps) {
  const [activeTab, setActiveTab] = useState<string>("facebook");
  const { openGraph, twitter, url } = analysis;
  
  // Get platform-specific data and requirements
  const getActiveData = () => {
    if (activeTab === "twitter") {
      return {
        icon: <Twitter className="h-5 w-5" />,
        title: "Twitter Card",
        bgColor: "bg-sky-50",
        iconColor: "text-sky-500",
        borderColor: "border-sky-100",
        gradient: "from-sky-50",
        requirements: [
          { name: "twitter:card", value: twitter.card },
          { name: "twitter:title", value: twitter.title },
          { name: "twitter:description", value: twitter.description },
          { name: "twitter:image", value: twitter.image }
        ]
      };
    } else if (activeTab === "linkedin") {
      return {
        icon: <Linkedin className="h-5 w-5" />,
        title: "LinkedIn Share",
        bgColor: "bg-blue-50",
        iconColor: "text-blue-700",
        borderColor: "border-blue-100",
        gradient: "from-blue-50",
        requirements: [
          { name: "og:title", value: openGraph.title },
          { name: "og:description", value: openGraph.description },
          { name: "og:image", value: openGraph.image },
          { name: "og:url", value: openGraph.url },
          { name: "og:type", value: openGraph.type }
        ]
      };
    } else {
      return {
        icon: <Facebook className="h-5 w-5" />,
        title: "Facebook Share",
        bgColor: "bg-blue-50",
        iconColor: "text-blue-600",
        borderColor: "border-blue-100",
        gradient: "from-blue-50",
        requirements: [
          { name: "og:title", value: openGraph.title },
          { name: "og:description", value: openGraph.description },
          { name: "og:image", value: openGraph.image },
          { name: "og:url", value: openGraph.url },
          { name: "og:type", value: openGraph.type }
        ]
      };
    }
  };
  
  const activeData = getActiveData();
  
  // Calculate implementation percentage
  const calculateImplementationPercentage = () => {
    const totalTags = activeData.requirements.length;
    const implementedTags = activeData.requirements.filter(req => !!req.value).length;
    return Math.round((implementedTags / totalTags) * 100);
  };

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
  
  // Get header background based on platform
  const getHeaderBackground = () => {
    switch(activeTab) {
      case "facebook":
        return "bg-gradient-to-b from-blue-50 to-white";
      case "twitter":
        return "bg-gradient-to-b from-sky-50 to-white";
      case "linkedin":
        return "bg-gradient-to-b from-blue-50 to-white";
      default:
        return "bg-gradient-to-b from-gray-50 to-white";
    }
  };
  
  // Get color scheme for social platform
  const getPlatformColor = () => {
    switch(activeTab) {
      case "facebook":
        return {
          header: "bg-[#4267B2]",
          text: "text-white"
        };
      case "twitter":
        return {
          header: "bg-[#1DA1F2]",
          text: "text-white"
        };
      case "linkedin":
        return {
          header: "bg-[#0077B5]",
          text: "text-white"
        };
      default:
        return {
          header: "bg-gray-800",
          text: "text-white"
        };
    }
  };
  
  const platformColor = getPlatformColor();
  const implementationPercentage = calculateImplementationPercentage();

  return (
    <Card className="card h-full shadow-md">
      <CardHeader className={`px-6 py-4 border-b border-gray-100 ${getHeaderBackground()}`}>
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 ${activeData.bgColor} rounded-full ${activeData.iconColor}`}>
            <Share2 className="h-5 w-5" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">
            Social Media Preview
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Implementation overview */}
        <div className="mb-6 p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${activeData.bgColor} ${activeData.iconColor} mr-3`}>
                {activeData.icon}
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-800">{activeData.title} Implementation</h3>
                <p className="text-sm text-gray-500">
                  {implementationPercentage === 100 
                    ? "All required tags are implemented" 
                    : implementationPercentage === 0 
                      ? "No required tags are implemented"
                      : "Some required tags are missing"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900">{implementationPercentage}%</span>
            </div>
          </div>
          
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                implementationPercentage === 100 ? "bg-success-500" : 
                implementationPercentage >= 50 ? "bg-warning-500" : 
                "bg-danger-500"
              }`}
              style={{ width: `${implementationPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Platform selector tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {socialPlatforms.map((platform) => (
              <Button
                key={platform.value}
                type="button"
                variant={activeTab === platform.value ? "secondary" : "outline"}
                className={activeTab === platform.value 
                  ? `bg-${platform.value === "twitter" ? "sky" : "blue"}-100 hover:bg-${platform.value === "twitter" ? "sky" : "blue"}-200 text-${platform.value === "twitter" ? "sky" : "blue"}-800 border border-${platform.value === "twitter" ? "sky" : "blue"}-200 shadow-sm flex items-center` 
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 shadow-sm flex items-center"}
                onClick={() => setActiveTab(platform.value)}
              >
                {platform.icon}
                {platform.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Social card preview with platform-specific styling */}
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md bg-white mb-6 hover:shadow-lg transition-all duration-200">
          {/* Platform-specific header */}
          <div className={`${platformColor.header} ${platformColor.text} py-3 px-4 flex items-center`}>
            <div className="mr-2">
              {activeTab === "facebook" && <Facebook className="h-5 w-5" />}
              {activeTab === "twitter" && <Twitter className="h-5 w-5" />}
              {activeTab === "linkedin" && <Linkedin className="h-5 w-5" />}
            </div>
            <div className="text-sm font-medium">
              {activeTab === "facebook" ? "Facebook" : 
               activeTab === "twitter" ? "Twitter" : 
               "LinkedIn"} Post Preview
            </div>
          </div>
          
          {/* Preview content */}
          <div className={activeTab === "twitter" ? "border-l-2 border-r-2 border-sky-100" : ""}>
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
                  <span className="text-xs mt-2 px-3 py-1 bg-gray-200 rounded-full">
                    {activeTab === "twitter" ? "twitter:image" : "og:image"} is missing
                  </span>
                </div>
              )}
            </div>
            <div className="p-5">
              {/* Site domain with platform-specific styling */}
              {activeTab === "twitter" ? (
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-gray-200 mr-2"></div>
                  <div>
                    <span className="text-sm font-bold text-gray-900">Website Name</span>
                    <span className="text-sm text-gray-500 ml-1">@{getHostname(url).split('.')[0]}</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{getHostname(url)}</div>
              )}
              
              <h3 className={`${activeTab === "twitter" ? "mt-3" : "mt-2"} text-xl font-bold text-gray-900 leading-tight line-clamp-2`}>
                {getTitle() || "No title available"}
              </h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {getDescription() || "No description available"}
              </p>
              
              {/* Platform-specific UI elements */}
              {activeTab === "twitter" && (
                <div className="mt-4 flex items-center justify-between text-gray-500 text-sm">
                  <div className="flex space-x-10">
                    <div>💬 0</div>
                    <div>🔄 0</div>
                    <div>❤️ 0</div>
                  </div>
                  <div>📤</div>
                </div>
              )}
              
              {activeTab === "facebook" && (
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-gray-500 text-sm">
                  <div className="flex space-x-10">
                    <div>👍 Like</div>
                    <div>💬 Comment</div>
                    <div>↗️ Share</div>
                  </div>
                </div>
              )}
              
              {activeTab === "linkedin" && (
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-gray-500 text-sm">
                  <div className="flex space-x-10">
                    <div>👍 Like</div>
                    <div>💬 Comment</div>
                    <div>↗️ Share</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Missing tags warning if needed */}
        {implementationPercentage < 100 && (
          <div className="mb-6 p-4 bg-warning-50 border border-warning-100 rounded-lg">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-warning-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-warning-800">Missing Tags Detected</h4>
                <p className="text-sm text-warning-700 mt-1">
                  Some required tags for {activeTab === "twitter" ? "Twitter Cards" : "Open Graph"} are missing. 
                  Add these tags to improve how your content appears when shared on {
                    activeTab === "twitter" ? "Twitter" : 
                    activeTab === "linkedin" ? "LinkedIn" : 
                    "Facebook"
                  }.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Tag status boxes */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
            <PieChart className="mr-2 h-5 w-5 text-primary" />
            Required {activeTab === "twitter" ? "Twitter" : "Open Graph"} Tags
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeData.requirements.map((req, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <div className={`mr-3 p-1.5 rounded-full ${
                    req.value ? "bg-success-100 text-success-600" : "bg-danger-100 text-danger-600"
                  }`}>
                    {req.value ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">{req.name}</span>
                    <div className="text-xs text-gray-500">
                      {req.value ? 
                        (req.value.length > 30 ? `${req.value.substring(0, 30)}...` : req.value) : 
                        "Not implemented"}
                    </div>
                  </div>
                </div>
                <Badge className={`${getBadgeClass(!!req.value)} flex items-center gap-1 px-2.5 py-0.5`}>
                  {req.value ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                  <span>{req.value ? "Present" : "Missing"}</span>
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SocialPreview;
