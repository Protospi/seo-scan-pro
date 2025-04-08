import { SEOAnalysis } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, XCircle } from "lucide-react";

interface ScoreCardProps {
  analysis: SEOAnalysis;
}

export function ScoreCard({ analysis }: ScoreCardProps) {
  const { score, recommendations } = analysis;
  
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
  const dashArray = `${score.value}, 100`;
  
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

  return (
    <Card className="card">
      <CardHeader className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">SEO Score</CardTitle>
          <Badge className={`${getStatusBadgeClass(scoreStatus)} px-3 py-1 text-xs font-medium rounded-full`}>
            {getStatusLabel(scoreStatus)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-8">
          <div className="relative w-36 h-36 flex-shrink-0">
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                {/* Background circle */}
                <circle 
                  cx="18" cy="18" r="15.9155" 
                  className="stroke-current text-gray-100" 
                  strokeWidth="3" 
                  fill="none" 
                />
                
                {/* Progress circle */}
                <circle 
                  cx="18" cy="18" r="15.9155" 
                  className="stroke-current" 
                  style={{ stroke: scoreColor, strokeDasharray: dashArray, strokeDashoffset: 0 }}
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  fill="none" 
                  transform="rotate(-90 18 18)" 
                />
                
                {/* Shadow for depth effect */}
                <circle 
                  cx="18" cy="18" r="13.9155" 
                  fill="white" 
                />
                
                {/* Score text */}
                <text 
                  x="18" 
                  y="18" 
                  className="text-3xl font-bold" 
                  textAnchor="middle" 
                  dominantBaseline="central"
                  fill={scoreColor}
                >
                  {score.value}%
                </text>
              </svg>
            </div>
          </div>
          
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[hsl(var(--success-50))] border border-[hsl(var(--success-100))] text-center">
                <span className="block text-2xl font-bold text-[hsl(var(--success-700))]">{score.implemented}</span>
                <span className="text-sm font-medium text-[hsl(var(--success-500))]">Implemented</span>
              </div>
              <div className="p-4 rounded-xl bg-[hsl(var(--warning-50))] border border-[hsl(var(--warning-100))] text-center">
                <span className="block text-2xl font-bold text-[hsl(var(--warning-700))]">{score.needsImprovement}</span>
                <span className="text-sm font-medium text-[hsl(var(--warning-500))]">Needs Work</span>
              </div>
              <div className="p-4 rounded-xl bg-[hsl(var(--danger-50))] border border-[hsl(var(--danger-100))] text-center">
                <span className="block text-2xl font-bold text-[hsl(var(--danger-700))]">{score.missing}</span>
                <span className="text-sm font-medium text-[hsl(var(--danger-500))]">Missing</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Top Recommendations</h3>
          <ul className="space-y-3 text-sm">
            {recommendations.slice(0, 3).map((recommendation, index) => (
              <li key={index} className="flex items-start p-3 rounded-lg bg-gray-50">
                {getIconForRecommendation(recommendation.status)}
                <span className="text-gray-700">{recommendation.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default ScoreCard;
