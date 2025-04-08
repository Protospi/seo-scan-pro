import { SEOAnalysis } from "@shared/schema";
import { TagStatus } from "./types";

export function getStatusColor(status: TagStatus | undefined): string {
  switch (status) {
    case "good":
      return "text-green-700 bg-green-50 border-green-200";
    case "needs_improvement":
      return "text-amber-700 bg-amber-50 border-amber-200";
    case "missing":
      return "text-red-700 bg-red-50 border-red-200";
    default:
      return "text-gray-700 bg-gray-50 border-gray-200";
  }
}

export function getStatusBadgeColor(status: TagStatus | undefined): string {
  switch (status) {
    case "good":
      return "bg-success-50 text-success-700";
    case "needs_improvement":
      return "bg-warning-50 text-warning-700";
    case "missing":
      return "bg-danger-50 text-danger-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
}

export function getStatusLabel(status: TagStatus | undefined): string {
  switch (status) {
    case "good":
      return "Good";
    case "needs_improvement":
      return "Needs Improvement";
    case "missing":
      return "Missing";
    default:
      return "Unknown";
  }
}

export function getStatusIcon(status: TagStatus | undefined): string {
  switch (status) {
    case "good":
      return "check";
    case "needs_improvement":
      return "alert-circle";
    case "missing":
      return "x-circle";
    default:
      return "help-circle";
  }
}

export function getTruncatedUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    const path = urlObj.pathname.length > 1 ? " › " + urlObj.pathname.split("/").filter(Boolean)[0] : "";
    return `${domain}${path}`;
  } catch (e) {
    return url;
  }
}

export function filterMetaTagsByCategory(metaTags: SEOAnalysis["metaTags"], category: string): SEOAnalysis["metaTags"] {
  if (category === "all") {
    return metaTags;
  }
  return metaTags.filter((tag) => tag.category === category);
}

export function getMetaTagCountByCategory(metaTags: SEOAnalysis["metaTags"], category: string): number {
  if (category === "all") {
    return metaTags.length;
  }
  return metaTags.filter((tag) => tag.category === category).length;
}
