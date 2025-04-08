import { useState } from "react";
import { SEOAnalysis } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";
import { TagItem } from "./TagItem";
import { TabOption } from "@/lib/types";
import { filterMetaTagsByCategory, getMetaTagCountByCategory } from "@/lib/seoUtils";

interface MetaTagsPanelProps {
  analysis: SEOAnalysis;
}

export function MetaTagsPanel({ analysis }: MetaTagsPanelProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { metaTags } = analysis;

  const handleExport = () => {
    // Create downloadable data
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(analysis, null, 2)
    )}`;
    
    // Create a download link and trigger click
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `seo-analysis-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const tabs: TabOption[] = [
    { label: `All Tags (${metaTags.length})`, value: "all" },
    { label: `Essential (${getMetaTagCountByCategory(metaTags, "basic")})`, value: "basic" },
    { label: `Social (${getMetaTagCountByCategory(metaTags, "social")})`, value: "social" },
    { label: `Technical (${getMetaTagCountByCategory(metaTags, "technical")})`, value: "technical" },
  ];

  const filteredTags = filterMetaTagsByCategory(metaTags, activeTab);
  
  // Group tags by category
  const basicTags = filteredTags.filter(tag => tag.category === "basic" || (activeTab === "basic"));
  const socialTags = filteredTags.filter(tag => tag.category === "social" || (activeTab === "social"));
  const technicalTags = filteredTags.filter(tag => tag.category === "technical" || (activeTab === "technical"));

  return (
    <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
      <CardHeader className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <CardTitle className="text-lg font-medium text-gray-900">All Meta Tags</CardTitle>
        <div>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-1.5" />
            Export
          </Button>
        </div>
      </CardHeader>
      
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              type="button"
              variant={activeTab === tab.value ? "secondary" : "ghost"}
              size="sm"
              className={
                activeTab === tab.value
                  ? "px-3 py-1.5 text-xs font-medium text-primary-700 bg-primary-50 rounded-md border border-primary-200"
                  : "px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-md border border-transparent"
              }
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {(activeTab === "all" || activeTab === "basic") && basicTags.length > 0 && (
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Basic Tags</h3>
            {basicTags.map((tag, index) => (
              <TagItem key={`basic-${index}`} tag={tag} />
            ))}
          </div>
        )}
        
        {(activeTab === "all" || activeTab === "social") && socialTags.length > 0 && (
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Social Tags</h3>
            {socialTags.map((tag, index) => (
              <TagItem key={`social-${index}`} tag={tag} />
            ))}
          </div>
        )}
        
        {(activeTab === "all" || activeTab === "technical") && technicalTags.length > 0 && (
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Technical Tags</h3>
            {technicalTags.map((tag, index) => (
              <TagItem key={`technical-${index}`} tag={tag} />
            ))}
          </div>
        )}

        {filteredTags.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No {activeTab !== "all" ? activeTab : ""} tags found for this URL
          </div>
        )}
      </div>
    </Card>
  );
}

export default MetaTagsPanel;
