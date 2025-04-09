import { useState } from "react";
import { SEOAnalysis } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, Search, Filter, Tag, FileText, Share2, Code, 
  Check, AlertTriangle, XCircle, BarChart3, PieChart 
} from "lucide-react";
import { TagItem } from "./TagItem";
import { TabOption } from "@/lib/types";
import { filterMetaTagsByCategory, getMetaTagCountByCategory, getStatusBadgeColor } from "@/lib/seoUtils";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MetaTagsPanelProps {
  analysis: SEOAnalysis;
}

export function MetaTagsPanel({ analysis }: MetaTagsPanelProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { metaTags } = analysis;
  
  // Get statistics for each category
  const basicTags = filterMetaTagsByCategory(metaTags, "basic");
  const socialTags = filterMetaTagsByCategory(metaTags, "social");
  const technicalTags = filterMetaTagsByCategory(metaTags, "technical");
  
  const calculateStats = (tags: typeof metaTags) => {
    return {
      implemented: tags.filter(tag => tag.status === "good").length,
      needsImprovement: tags.filter(tag => tag.status === "needs_improvement").length,
      missing: tags.filter(tag => tag.status === "missing").length,
      total: tags.length
    };
  };
  
  const basicStats = calculateStats(basicTags);
  const socialStats = calculateStats(socialTags);
  const technicalStats = calculateStats(technicalTags);
  
  const calculatePercentage = (count: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

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
  
  // Group tags by category and status
  const basicTagsByStatus = {
    good: basicTags.filter(tag => tag.status === "good"),
    needsImprovement: basicTags.filter(tag => tag.status === "needs_improvement"),
    missing: basicTags.filter(tag => tag.status === "missing")
  };
  
  const socialTagsByStatus = {
    good: socialTags.filter(tag => tag.status === "good"),
    needsImprovement: socialTags.filter(tag => tag.status === "needs_improvement"),
    missing: socialTags.filter(tag => tag.status === "missing")
  };
  
  const technicalTagsByStatus = {
    good: technicalTags.filter(tag => tag.status === "good"),
    needsImprovement: technicalTags.filter(tag => tag.status === "needs_improvement"),
    missing: technicalTags.filter(tag => tag.status === "missing")
  };
  
  // Prepare data for the current view
  const viewTags = activeTab === "all" ? filteredTags : 
                   activeTab === "basic" ? basicTags.filter(matchesSearch) :
                   activeTab === "social" ? socialTags.filter(matchesSearch) :
                   technicalTags.filter(matchesSearch);
  
  const viewTagsByStatus = activeTab === "basic" ? basicTagsByStatus :
                          activeTab === "social" ? socialTagsByStatus :
                          activeTab === "technical" ? technicalTagsByStatus : 
                          {
                            good: filteredTags.filter(tag => tag.status === "good"),
                            needsImprovement: filteredTags.filter(tag => tag.status === "needs_improvement"),
                            missing: filteredTags.filter(tag => tag.status === "missing")
                          };
  
  function matchesSearch(tag: typeof metaTags[0]) {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      tag.name.toLowerCase().includes(query) || 
      tag.content.toLowerCase().includes(query) ||
      (tag.property && tag.property.toLowerCase().includes(query))
    );
  }
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "basic":
        return <FileText className="h-5 w-5 text-blue-600" />;
      case "social":
        return <Share2 className="h-5 w-5 text-purple-600" />;
      case "technical":
        return <Code className="h-5 w-5 text-emerald-600" />;
      default:
        return <Tag className="h-5 w-5 text-gray-600" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-success-500";
      case "needs_improvement":
        return "bg-warning-500";
      case "missing":
        return "bg-danger-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <Card className="card shadow-md">
      <CardHeader className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle className="text-xl font-bold text-gray-900">Meta Tags Analysis</CardTitle>
        <div>
          <Button variant="outline" size="sm" onClick={handleExport} className="flex items-center gap-1.5 shadow-sm">
            <Download className="h-4 w-4" />
            <span>Export JSON</span>
          </Button>
        </div>
      </CardHeader>
      
      {/* Summary Dashboard */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
        <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-primary" />
          Meta Tags Overview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-sm">
            <CardHeader className="py-3 px-4 flex items-center space-x-2 border-b bg-blue-50">
              <FileText className="h-5 w-5 text-blue-600" />
              <h4 className="text-sm font-medium text-blue-900">Essential Tags</h4>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Implementation</span>
                <span className="text-sm font-medium">{calculatePercentage(basicStats.implemented, basicStats.total)}%</span>
              </div>
              <Progress 
                value={calculatePercentage(basicStats.implemented, basicStats.total)} 
                className="h-2 mb-3" 
                color="bg-blue-500"
              />
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-2">
                <div className="p-1 rounded bg-success-50 border border-success-100">
                  <div className="flex justify-center items-center mb-1">
                    <Check className="h-3 w-3 text-success-500 mr-1" />
                    <span className="text-success-700 text-xs">Good</span>
                  </div>
                  <span className="font-medium text-success-700">{basicStats.implemented}</span>
                </div>
                <div className="p-1 rounded bg-warning-50 border border-warning-100">
                  <div className="flex justify-center items-center mb-1">
                    <AlertTriangle className="h-3 w-3 text-warning-500 mr-1" />
                    <span className="text-warning-700 text-xs">Needs Work</span>
                  </div>
                  <span className="font-medium text-warning-700">{basicStats.needsImprovement}</span>
                </div>
                <div className="p-1 rounded bg-danger-50 border border-danger-100">
                  <div className="flex justify-center items-center mb-1">
                    <XCircle className="h-3 w-3 text-danger-500 mr-1" />
                    <span className="text-danger-700 text-xs">Missing</span>
                  </div>
                  <span className="font-medium text-danger-700">{basicStats.missing}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="py-3 px-4 flex items-center space-x-2 border-b bg-purple-50">
              <Share2 className="h-5 w-5 text-purple-600" />
              <h4 className="text-sm font-medium text-purple-900">Social Tags</h4>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Implementation</span>
                <span className="text-sm font-medium">{calculatePercentage(socialStats.implemented, socialStats.total)}%</span>
              </div>
              <Progress 
                value={calculatePercentage(socialStats.implemented, socialStats.total)} 
                className="h-2 mb-3" 
                color="bg-purple-500"
              />
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-2">
                <div className="p-1 rounded bg-success-50 border border-success-100">
                  <div className="flex justify-center items-center mb-1">
                    <Check className="h-3 w-3 text-success-500 mr-1" />
                    <span className="text-success-700 text-xs">Good</span>
                  </div>
                  <span className="font-medium text-success-700">{socialStats.implemented}</span>
                </div>
                <div className="p-1 rounded bg-warning-50 border border-warning-100">
                  <div className="flex justify-center items-center mb-1">
                    <AlertTriangle className="h-3 w-3 text-warning-500 mr-1" />
                    <span className="text-warning-700 text-xs">Needs Work</span>
                  </div>
                  <span className="font-medium text-warning-700">{socialStats.needsImprovement}</span>
                </div>
                <div className="p-1 rounded bg-danger-50 border border-danger-100">
                  <div className="flex justify-center items-center mb-1">
                    <XCircle className="h-3 w-3 text-danger-500 mr-1" />
                    <span className="text-danger-700 text-xs">Missing</span>
                  </div>
                  <span className="font-medium text-danger-700">{socialStats.missing}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="py-3 px-4 flex items-center space-x-2 border-b bg-emerald-50">
              <Code className="h-5 w-5 text-emerald-600" />
              <h4 className="text-sm font-medium text-emerald-900">Technical Tags</h4>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Implementation</span>
                <span className="text-sm font-medium">{calculatePercentage(technicalStats.implemented, technicalStats.total)}%</span>
              </div>
              <Progress 
                value={calculatePercentage(technicalStats.implemented, technicalStats.total)} 
                className="h-2 mb-3" 
                color="bg-emerald-500"
              />
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-2">
                <div className="p-1 rounded bg-success-50 border border-success-100">
                  <div className="flex justify-center items-center mb-1">
                    <Check className="h-3 w-3 text-success-500 mr-1" />
                    <span className="text-success-700 text-xs">Good</span>
                  </div>
                  <span className="font-medium text-success-700">{technicalStats.implemented}</span>
                </div>
                <div className="p-1 rounded bg-warning-50 border border-warning-100">
                  <div className="flex justify-center items-center mb-1">
                    <AlertTriangle className="h-3 w-3 text-warning-500 mr-1" />
                    <span className="text-warning-700 text-xs">Needs Work</span>
                  </div>
                  <span className="font-medium text-warning-700">{technicalStats.needsImprovement}</span>
                </div>
                <div className="p-1 rounded bg-danger-50 border border-danger-100">
                  <div className="flex justify-center items-center mb-1">
                    <XCircle className="h-3 w-3 text-danger-500 mr-1" />
                    <span className="text-danger-700 text-xs">Missing</span>
                  </div>
                  <span className="font-medium text-danger-700">{technicalStats.missing}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="p-6 border-b border-gray-100 bg-white">
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
              className="pl-10 shadow-sm"
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
                    ? "px-3 py-2 bg-primary-100 text-primary-800 hover:bg-primary-200 border border-primary-200 shadow-sm" 
                    : "px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 shadow-sm"
                }
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tag Tabs By Status */}
      <div className="px-6 pt-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="all" className="text-sm">All Tags</TabsTrigger>
            <TabsTrigger value="good" className="text-sm">
              <Check className="h-3 w-3 mr-1 text-success-500" />
              Good
            </TabsTrigger>
            <TabsTrigger value="needs_improvement" className="text-sm">
              <AlertTriangle className="h-3 w-3 mr-1 text-warning-500" />
              Needs Work
            </TabsTrigger>
            <TabsTrigger value="missing" className="text-sm">
              <XCircle className="h-3 w-3 mr-1 text-danger-500" />
              Missing
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {viewTags.length > 0 ? (
              <div className="space-y-6 pb-6">
                {viewTags.map((tag, index) => (
                  <TagItem key={`tag-${index}`} tag={tag} />
                ))}
              </div>
            ) : (
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
          </TabsContent>
          
          <TabsContent value="good">
            {viewTagsByStatus.good.length > 0 ? (
              <div className="space-y-6 pb-6">
                {viewTagsByStatus.good.map((tag, index) => (
                  <TagItem key={`good-${index}`} tag={tag} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-50 mb-4">
                  <Check className="h-8 w-8 text-success-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properly implemented tags found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  No tags with "Good" status were found in the {activeTab !== "all" ? activeTab : "selected"} category.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="needs_improvement">
            {viewTagsByStatus.needsImprovement.length > 0 ? (
              <div className="space-y-6 pb-6">
                {viewTagsByStatus.needsImprovement.map((tag, index) => (
                  <TagItem key={`needs-${index}`} tag={tag} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warning-50 mb-4">
                  <AlertTriangle className="h-8 w-8 text-warning-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tags need improvement</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  No tags with "Needs Improvement" status were found in the {activeTab !== "all" ? activeTab : "selected"} category.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="missing">
            {viewTagsByStatus.missing.length > 0 ? (
              <div className="space-y-6 pb-6">
                {viewTagsByStatus.missing.map((tag, index) => (
                  <TagItem key={`missing-${index}`} tag={tag} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-danger-50 mb-4">
                  <XCircle className="h-8 w-8 text-danger-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No missing tags</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  No tags with "Missing" status were found in the {activeTab !== "all" ? activeTab : "selected"} category.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}

export default MetaTagsPanel;
