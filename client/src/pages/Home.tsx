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
import { AlertCircle } from "lucide-react";

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
      
      <main className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-10 sm:px-6 lg:px-8 flex-grow">
        <UrlForm onAnalyze={handleAnalyze} isLoading={isLoading} />
        
        {isLoading && <LoadingState />}
        
        {isError && (
          <div className="card border-red-200 bg-red-50 text-red-700 px-6 py-4 rounded-xl mb-8 shadow-sm" role="alert">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="rounded-full p-2 bg-red-100">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-red-800 text-lg mb-1">Analysis Error</h3>
                <p className="text-red-700">{(error as Error)?.message || "Failed to analyze the URL. Please try again with a different website."}</p>
              </div>
            </div>
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
