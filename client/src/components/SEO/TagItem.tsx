import { MetaTag } from "@/lib/types";
import { Check, AlertTriangle, XCircle, Copy } from "lucide-react";

interface TagItemProps {
  tag: MetaTag;
}

export function TagItem({ tag }: TagItemProps) {
  const { name, content, property, status, message } = tag;
  
  const getStatusIcon = () => {
    switch (status) {
      case "good":
        return (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--success-50))] border border-[hsl(var(--success-100))]">
            <Check className="h-4 w-4 text-[hsl(var(--success-500))]" />
          </span>
        );
      case "needs_improvement":
        return (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--warning-50))] border border-[hsl(var(--warning-100))]">
            <AlertTriangle className="h-4 w-4 text-[hsl(var(--warning-500))]" />
          </span>
        );
      case "missing":
        return (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--danger-50))] border border-[hsl(var(--danger-100))]">
            <XCircle className="h-4 w-4 text-[hsl(var(--danger-500))]" />
          </span>
        );
      default:
        return (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 border border-gray-100">
            <Check className="h-4 w-4 text-gray-400" />
          </span>
        );
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "good":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium badge-success">
            Good
          </span>
        );
      case "needs_improvement":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium badge-warning">
            Needs Improvement
          </span>
        );
      case "missing":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium badge-danger">
            Missing
          </span>
        );
      default:
        return null;
    }
  };
  
  const getBgColorByStatus = () => {
    switch (status) {
      case "good":
        return "bg-[hsl(var(--success-50))] border-[hsl(var(--success-100))]";
      case "needs_improvement":
        return "bg-[hsl(var(--warning-50))] border-[hsl(var(--warning-100))]";
      case "missing":
        return "bg-[hsl(var(--danger-50))] border-[hsl(var(--danger-100))]";
      default:
        return "bg-gray-50 border-gray-100";
    }
  };
  
  const getMetaTagString = () => {
    if (property) {
      return `<meta property="${property}" content="${content}">`;
    }
    return `<meta name="${name}" content="${content}">`;
  };
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(getMetaTagString());
  };

  return (
    <div className={`mb-6 rounded-xl p-5 border ${getBgColorByStatus()}`}>
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0">
          {getStatusIcon()}
        </div>
        <div className="ml-4 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h4 className="text-base font-semibold text-gray-900">{name}</h4>
            {getStatusBadge()}
          </div>
          {message && (
            <div className="mt-1 text-sm text-gray-600">
              {message}
            </div>
          )}
        </div>
      </div>
      
      <div className="relative bg-white rounded-lg border border-gray-200 shadow-sm group hover:shadow-md transition-all duration-200">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={handleCopyClick}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <code className={`text-sm font-mono ${status === "missing" ? "text-gray-500" : "text-gray-800"}`}>
            {status === "missing" 
              ? `Recommended: ${getMetaTagString()}`
              : getMetaTagString()}
          </code>
        </div>
      </div>
    </div>
  );
}

export default TagItem;
