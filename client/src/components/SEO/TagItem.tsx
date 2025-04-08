import { MetaTag } from "@/lib/types";
import { Check, AlertTriangle, XCircle } from "lucide-react";
import { getStatusColor } from "@/lib/seoUtils";

interface TagItemProps {
  tag: MetaTag;
}

export function TagItem({ tag }: TagItemProps) {
  const { name, content, status, message } = tag;
  
  const getStatusIcon = () => {
    switch (status) {
      case "good":
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success-50">
            <Check className="h-4 w-4 text-success-500" />
          </span>
        );
      case "needs_improvement":
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-warning-50">
            <AlertTriangle className="h-4 w-4 text-warning-500" />
          </span>
        );
      case "missing":
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-danger-50">
            <XCircle className="h-4 w-4 text-danger-500" />
          </span>
        );
      default:
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-50">
            <Check className="h-4 w-4 text-gray-500" />
          </span>
        );
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "good":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-50 text-success-700">
            Good
          </span>
        );
      case "needs_improvement":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-50 text-warning-700">
            Needs Improvement
          </span>
        );
      case "missing":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-50 text-danger-700">
            Missing
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-6 bg-gray-50 rounded-lg p-4">
      <div className="flex items-start mb-2">
        <div className="flex-shrink-0 mt-0.5">
          {getStatusIcon()}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">{name}</h4>
            {getStatusBadge()}
          </div>
          {message && (
            <div className="mt-1 text-sm text-gray-500">
              {message}
            </div>
          )}
        </div>
      </div>
      <div className={`mt-2 bg-white p-3 rounded border ${status === "missing" ? "border-dashed border-gray-300" : "border-gray-200"}`}>
        <code className={`text-sm font-mono break-all ${status === "missing" ? "text-gray-500" : "text-gray-800"}`}>
          {status === "missing" 
            ? `Recommended: ${tag.property 
                ? `<meta property="${tag.property}" content="${content}">` 
                : `<meta name="${name}" content="${content}">`}`
            : tag.property 
                ? `<meta property="${tag.property}" content="${content}">`
                : `<meta name="${name}" content="${content}">`}
        </code>
      </div>
    </div>
  );
}

export default TagItem;
