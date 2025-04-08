import { SEOAnalysis } from "@shared/schema";

export interface TabOption {
  label: string;
  value: string;
  count?: number;
}

export interface SocialPreviewTab {
  label: string;
  value: string;
}

export type TagStatus = "good" | "needs_improvement" | "missing";
export type TagCategory = "basic" | "social" | "technical";

export interface MetaTag {
  name: string;
  content: string;
  property?: string;
  status?: TagStatus;
  message?: string;
  category?: TagCategory;
}

export interface Recommendation {
  message: string;
  status: TagStatus;
}

export type Preview = "google" | "facebook" | "twitter" | "linkedin";
