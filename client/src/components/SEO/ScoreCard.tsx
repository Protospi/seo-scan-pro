import { SEOAnalysis } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
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
        return "bg-success-50 text-success-700";
      case "needs_improvement":
        return "bg-warning-50 text-warning-700";
      case "poor":
        return "bg-danger-50 text-danger-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getIconForRecommendation = (status: string) => {
    switch (status) {
      case "good":
        return <Check className="h-5 w-5 text-success-500 mr-2 flex-shrink-0" />;
      case "needs_improvement":
        return <AlertTriangle className="h-5 w-5 text-warning-500 mr-2 flex-shrink-0" />;
      case "missing":
        return <XCircle className="h-5 w-5 text-danger-500 mr-2 flex-shrink-0" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />;
    }
  };

  const scoreStatus = getScoreStatus(score.value);
  const dashArray = `${score.value}, 100`;

  return (
    <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">SEO Score</h2>
          <Badge className={getStatusBadgeClass(scoreStatus)}>
            {getStatusLabel(scoreStatus)}
          </Badge>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="relative w-24 h-24 mr-6">
            <svg viewBox="0 0 36 36" className="w-24 h-24">
              <path 
                className="stroke-current text-gray-200" 
                strokeWidth="3" 
                fill="none" 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
              />
              <path 
                className={`stroke-current ${scoreStatus === 'good' ? 'text-success-500' : scoreStatus === 'needs_improvement' ? 'text-warning-500' : 'text-danger-500'}`}
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round" 
                strokeDasharray={dashArray} 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
              />
              <text 
                x="18" 
                y="20.5" 
                className="text-lg font-semibold" 
                textAnchor="middle" 
                fill={scoreStatus === 'good' ? '#10B981' : scoreStatus === 'needs_improvement' ? '#F59E0B' : '#EF4444'}
              >
                {score.value}%
              </text>
            </svg>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-success-50 rounded-lg">
                <span className="block text-xl font-semibold text-success-700">{score.implemented}</span>
                <span className="text-xs text-gray-500">Implemented</span>
              </div>
              <div className="p-3 bg-warning-50 rounded-lg">
                <span className="block text-xl font-semibold text-warning-700">{score.needsImprovement}</span>
                <span className="text-xs text-gray-500">Needs Improvement</span>
              </div>
              <div className="p-3 bg-danger-50 rounded-lg">
                <span className="block text-xl font-semibold text-danger-700">{score.missing}</span>
                <span className="text-xs text-gray-500">Missing</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Quick recommendations:</h3>
          <ul className="space-y-2 text-sm">
            {recommendations.slice(0, 3).map((recommendation, index) => (
              <li key={index} className="flex items-start">
                {getIconForRecommendation(recommendation.status)}
                <span>{recommendation.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default ScoreCard;
