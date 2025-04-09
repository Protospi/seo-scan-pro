import { SEOAnalysis } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, AlertTriangle, XCircle, Tag, FileText, Share2, 
  Code, TrendingUp, AlertCircle, ArrowRight 
} from "lucide-react";
import { filterMetaTagsByCategory } from "@/lib/seoUtils";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface ScoreCardProps {
  analysis: SEOAnalysis;
}

export function ScoreCard({ analysis }: ScoreCardProps) {
  const { score, recommendations, metaTags } = analysis;
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // Calculate category-specific stats
  const basicTags = filterMetaTagsByCategory(metaTags, "basic");
  const socialTags = filterMetaTagsByCategory(metaTags, "social");
  const technicalTags = filterMetaTagsByCategory(metaTags, "technical");
  
  const basicStats = {
    implemented: basicTags.filter(tag => tag.status === "good").length,
    needsImprovement: basicTags.filter(tag => tag.status === "needs_improvement").length,
    missing: basicTags.filter(tag => tag.status === "missing").length,
    total: basicTags.length,
  };
  
  const socialStats = {
    implemented: socialTags.filter(tag => tag.status === "good").length,
    needsImprovement: socialTags.filter(tag => tag.status === "needs_improvement").length,
    missing: socialTags.filter(tag => tag.status === "missing").length,
    total: socialTags.length,
  };
  
  const technicalStats = {
    implemented: technicalTags.filter(tag => tag.status === "good").length,
    needsImprovement: technicalTags.filter(tag => tag.status === "needs_improvement").length,
    missing: technicalTags.filter(tag => tag.status === "missing").length,
    total: technicalTags.length,
  };
  
  // Calculate category scores
  const calculateCategoryScore = (stats: typeof basicStats) => {
    if (stats.total === 0) return 0;
    return Math.round((stats.implemented + (stats.needsImprovement * 0.5)) / stats.total * 100);
  };
  
  const basicScore = calculateCategoryScore(basicStats);
  const socialScore = calculateCategoryScore(socialStats);
  const technicalScore = calculateCategoryScore(technicalStats);
  
  const getScoreStatus = (score: number) => {
    if (score >= 80) return "good";
    if (score >= 50) return "needs_improvement";
    return "poor";
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "good":
        return "Good";
      case "needs_improvement":
        return "Needs Improvement";
      case "poor":
        return "Poor";
      default:
        return "Unknown";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "good":
        return "badge-success";
      case "needs_improvement":
        return "badge-warning";
      case "poor":
        return "badge-danger";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getIconForRecommendation = (status: string) => {
    switch (status) {
      case "good":
        return <Check className="h-5 w-5 text-[hsl(var(--success-500))] mr-2 flex-shrink-0" />;
      case "needs_improvement":
        return <AlertTriangle className="h-5 w-5 text-[hsl(var(--warning-500))] mr-2 flex-shrink-0" />;
      case "missing":
        return <XCircle className="h-5 w-5 text-[hsl(var(--danger-500))] mr-2 flex-shrink-0" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />;
    }
  };

  const scoreStatus = getScoreStatus(score.value);
  
  // Get appropriate color for the score
  const getScoreColor = (status: string) => {
    switch (status) {
      case "good":
        return "hsl(var(--success-500))";
      case "needs_improvement":
        return "hsl(var(--warning-500))";
      case "poor":
        return "hsl(var(--danger-500))";
      default:
        return "#9CA3AF";
    }
  };
  
  const scoreColor = getScoreColor(scoreStatus);
  
  const getCategoryData = (category: string) => {
    switch(category) {
      case "basic":
        return { 
          title: "Essential SEO", 
          description: "Fundamental SEO elements like title, description, and canonical tags",
          icon: <FileText className="h-5 w-5 text-blue-600" />,
          score: basicScore,
          color: "blue",
          stats: basicStats
        };
      case "social":
        return { 
          title: "Social Sharing", 
          description: "Open Graph and Twitter Card tags for social media visibility",
          icon: <Share2 className="h-5 w-5 text-purple-600" />,
          score: socialScore,
          color: "purple",
          stats: socialStats
        };
      case "technical":
        return { 
          title: "Technical SEO", 
          description: "Technical elements like structured data, robots, and viewport",
          icon: <Code className="h-5 w-5 text-emerald-600" />,
          score: technicalScore,
          color: "emerald",
          stats: technicalStats
        };
      default:
        return { 
          title: "Unknown Category", 
          description: "",
          icon: <AlertCircle className="h-5 w-5 text-gray-600" />,
          score: 0,
          color: "gray",
          stats: { implemented: 0, needsImprovement: 0, missing: 0, total: 0 }
        };
    }
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-success-500";
    if (score >= 50) return "bg-warning-500";
    return "bg-danger-500";
  };
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <Card className="card shadow-md">
      <CardHeader className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">SEO Health Overview</CardTitle>
          <Badge className={`${getStatusBadgeClass(scoreStatus)} px-3 py-1 text-xs font-medium rounded-full`}>
            {getStatusLabel(scoreStatus)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-6">
          <div className="relative w-36 h-36 flex-shrink-0 drop-shadow-lg">
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#f3f4f6" 
                  strokeWidth="10" 
                />
                
                {/* Progress circle with gradient */}
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={scoreStatus === "good" ? "hsl(142, 76%, 45%)" : 
                                             scoreStatus === "needs_improvement" ? "hsl(43, 96%, 58%)" : 
                                             "hsl(0, 72%, 51%)"}/>
                    <stop offset="100%" stopColor={scoreStatus === "good" ? "hsl(160, 84%, 39%)" : 
                                              scoreStatus === "needs_improvement" ? "hsl(36, 100%, 52%)" : 
                                              "hsl(354, 70%, 54%)"}/>
                  </linearGradient>
                </defs>
                
                <circle 
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * score.value / 100)}
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="283" 
                    to={283 - (283 * score.value / 100)} 
                    dur="1s" 
                    fill="freeze" 
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1"
                  />
                </circle>
              </svg>
              
              {/* Score text as a separate div positioned absolutely */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold" style={{ color: scoreColor }}>
                  {score.value}
                </span>
                <span className="text-xs mt-1 text-gray-500">Overall Score</span>
              </div>
            </div>
          </div>
          
          <div className="w-full">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Based on {score.implemented + score.needsImprovement + score.missing} SEO elements analyzed
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[hsl(var(--success-50))] border border-[hsl(var(--success-100))] text-center shadow-sm">
                <div className="flex justify-center items-center mb-1">
                  <Check className="h-4 w-4 text-[hsl(var(--success-500))] mr-1" />
                  <span className="text-[hsl(var(--success-700))] text-sm font-medium">Implemented</span>
                </div>
                <span className="block text-2xl font-bold text-[hsl(var(--success-700))]">{score.implemented}</span>
              </div>
              <div className="p-4 rounded-xl bg-[hsl(var(--warning-50))] border border-[hsl(var(--warning-100))] text-center shadow-sm">
                <div className="flex justify-center items-center mb-1">
                  <AlertTriangle className="h-4 w-4 text-[hsl(var(--warning-500))] mr-1" />
                  <span className="text-[hsl(var(--warning-700))] text-sm font-medium">Needs Work</span>
                </div>
                <span className="block text-2xl font-bold text-[hsl(var(--warning-700))]">{score.needsImprovement}</span>
              </div>
              <div className="p-4 rounded-xl bg-[hsl(var(--danger-50))] border border-[hsl(var(--danger-100))] text-center shadow-sm">
                <div className="flex justify-center items-center mb-1">
                  <XCircle className="h-4 w-4 text-[hsl(var(--danger-500))] mr-1" />
                  <span className="text-[hsl(var(--danger-700))] text-sm font-medium">Missing</span>
                </div>
                <span className="block text-2xl font-bold text-[hsl(var(--danger-700))]">{score.missing}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Category Summaries Section */}
        <div className="mt-8 mb-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            SEO Category Performance
          </h3>
          
          <div className="space-y-4">
            {["basic", "social", "technical"].map((category) => {
              const data = getCategoryData(category);
              return (
                <div key={category} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => toggleSection(category)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="rounded-full bg-gray-100 p-2 mr-3">
                          {data.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{data.title}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{data.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <span className={`text-lg font-bold ${
                            getScoreStatus(data.score) === "good" ? "text-success-600" :
                            getScoreStatus(data.score) === "needs_improvement" ? "text-warning-600" :
                            "text-danger-600"
                          }`}>
                            {data.score}%
                          </span>
                        </div>
                        <ArrowRight className={`h-4 w-4 text-gray-400 transition-transform ${
                          expandedSection === category ? "rotate-90" : ""
                        }`} />
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={data.score} className="h-2" 
                        color={getProgressColor(data.score)} />
                    </div>
                  </div>
                  
                  {expandedSection === category && (
                    <div className="px-4 pb-4 pt-1 bg-gray-50 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div className="p-2 rounded bg-success-50 border border-success-100">
                          <span className="block text-success-700 font-medium">{data.stats.implemented}</span>
                          <span className="text-xs text-success-600">Implemented</span>
                        </div>
                        <div className="p-2 rounded bg-warning-50 border border-warning-100">
                          <span className="block text-warning-700 font-medium">{data.stats.needsImprovement}</span>
                          <span className="text-xs text-warning-600">Needs Work</span>
                        </div>
                        <div className="p-2 rounded bg-danger-50 border border-danger-100">
                          <span className="block text-danger-700 font-medium">{data.stats.missing}</span>
                          <span className="text-xs text-danger-600">Missing</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Top Recommendations Section */}
        <div className="mt-8">
          <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
            <Tag className="mr-2 h-5 w-5 text-primary" />
            Top Recommendations
          </h3>
          <div className="space-y-3">
            {recommendations.slice(0, 3).map((recommendation, index) => (
              <div key={index} className="flex items-start p-4 rounded-xl border shadow-sm bg-white hover:shadow-md transition-shadow">
                {getIconForRecommendation(recommendation.status)}
                <span className="text-gray-700">{recommendation.message}</span>
              </div>
            ))}
            {recommendations.length > 3 && (
              <p className="text-sm text-gray-500 text-center mt-2">
                +{recommendations.length - 3} more recommendations
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ScoreCard;
