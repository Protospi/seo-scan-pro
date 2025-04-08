import { useState } from "react";
import { SEOAnalysis } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Search, Filter, Tag } from "lucide-react";
import { TagItem } from "./TagItem";
import { TabOption } from "@/lib/types";
import { filterMetaTagsByCategory, getMetaTagCountByCategory } from "@/lib/seoUtils";
import { Input } from "@/components/ui/input";

interface MetaTagsPanelProps {
  analysis: SEOAnalysis;
}

export function MetaTagsPanel({ analysis }: MetaTagsPanelProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  // Filter tags by category and search query
  const filteredTags = filterMetaTagsByCategory(metaTags, activeTab).filter(tag => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      tag.name.toLowerCase().includes(query) || 
      tag.content.toLowerCase().includes(query) ||
      (tag.property && tag.property.toLowerCase().includes(query))
    );
  });
  
  // Group tags by category
  const basicTags = filteredTags.filter(tag => tag.category === "basic" || (activeTab === "basic"));
  const socialTags = filteredTags.filter(tag => tag.category === "social" || (activeTab === "social"));
  const technicalTags = filteredTags.filter(tag => tag.category === "technical" || (activeTab === "technical"));

  return (
    <Card className="card">
      <CardHeader className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle className="text-xl font-bold text-gray-900">Meta Tags Analysis</CardTitle>
        <div>
          <Button variant="outline" size="sm" onClick={handleExport} className="flex items-center gap-1.5">
            <Download className="h-4 w-4" />
            <span>Export JSON</span>
          </Button>
        </div>
      </CardHeader>
      
      <div className="p-6 border-b border-gray-100 bg-gray-50">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search tags by name or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500 hidden sm:inline">Filter:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.value}
                type="button"
                variant={activeTab === tab.value ? "secondary" : "outline"}
                size="sm"
                className={
                  activeTab === tab.value
                    ? "px-3 py-2 bg-primary-100 text-primary-800 hover:bg-primary-200 border border-primary-200" 
                    : "px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        {(activeTab === "all" || activeTab === "basic") && basicTags.length > 0 && (
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5 text-[hsl(var(--success-500))]" />
              <h3 className="text-base font-semibold text-gray-900">Basic Tags</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{basicTags.length}</span>
            </div>
            <div className="space-y-6">
              {basicTags.map((tag, index) => (
                <TagItem key={`basic-${index}`} tag={tag} />
              ))}
            </div>
          </div>
        )}
        
        {(activeTab === "all" || activeTab === "social") && socialTags.length > 0 && (
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5 text-[hsl(var(--primary))]" />
              <h3 className="text-base font-semibold text-gray-900">Social Tags</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{socialTags.length}</span>
            </div>
            <div className="space-y-6">
              {socialTags.map((tag, index) => (
                <TagItem key={`social-${index}`} tag={tag} />
              ))}
            </div>
          </div>
        )}
        
        {(activeTab === "all" || activeTab === "technical") && technicalTags.length > 0 && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5 text-gray-600" />
              <h3 className="text-base font-semibold text-gray-900">Technical Tags</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{technicalTags.length}</span>
            </div>
            <div className="space-y-6">
              {technicalTags.map((tag, index) => (
                <TagItem key={`technical-${index}`} tag={tag} />
              ))}
            </div>
          </div>
        )}

        {filteredTags.length === 0 && (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matching tags found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchQuery 
                ? `No ${activeTab !== "all" ? activeTab : ""} tags matching "${searchQuery}" were found.` 
                : `No ${activeTab !== "all" ? activeTab : ""} tags were found for this URL.`}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default MetaTagsPanel;
