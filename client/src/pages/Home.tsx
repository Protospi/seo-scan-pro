import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SEOAnalysis } from "@shared/schema";
import { UrlForm } from "@/components/SEO/UrlForm";
import { LoadingState } from "@/components/SEO/LoadingState";
import { ScoreCard } from "@/components/SEO/ScoreCard";
import { GooglePreview } from "@/components/SEO/GooglePreview";
import { SocialPreview } from "@/components/SEO/SocialPreview";
import { MetaTagsPanel } from "@/components/SEO/MetaTagsPanel";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

export default function Home() {
  const [url, setUrl] = useState<string | null>(null);

  const {
    data: analysis,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<SEOAnalysis>({
    queryKey: [url ? `/api/analyze?url=${encodeURIComponent(url)}` : null],
    enabled: !!url,
  });

  const handleAnalyze = (url: string) => {
    setUrl(url);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <UrlForm onAnalyze={handleAnalyze} isLoading={isLoading} />
        
        {isLoading && <LoadingState />}
        
        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{(error as Error)?.message || "Failed to analyze the URL. Please try again."}</span>
          </div>
        )}
        
        {analysis && !isLoading && (
          <div className="space-y-8">
            <ScoreCard analysis={analysis} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <GooglePreview analysis={analysis} />
              <SocialPreview analysis={analysis} />
            </div>
            
            <MetaTagsPanel analysis={analysis} />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
