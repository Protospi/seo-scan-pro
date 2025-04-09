import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, X, Search, Loader2, Globe, ArrowRight } from "lucide-react";

interface UrlFormProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

const exampleUrls = ["smarttalks.ai", "twitter.com", "apple.com", "airbnb.com"];

export function UrlForm({ onAnalyze, isLoading }: UrlFormProps) {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url) {
      let formattedUrl = url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        formattedUrl = `https://${url}`;
      }
      onAnalyze(formattedUrl);
    }
  };

  const handleExampleClick = (example: string) => {
    const formattedUrl = `https://${example}`;
    setUrl(formattedUrl);
    onAnalyze(formattedUrl);
  };

  const handleClear = () => {
    setUrl("");
  };

  return (
    <div className="card p-8 mb-10 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/20"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-primary/5 blur-2xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-1 bg-primary rounded-full"></div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Pedro Loes SEO Tag Analyzer
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Enter any website URL to analyze its SEO meta tags, preview search and social appearances, 
            and get actionable recommendations.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-12 pr-12 py-7 text-base rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
                disabled={isLoading}
              />
              {url && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
                    onClick={handleClear}
                    disabled={isLoading}
                    aria-label="Clear input"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="px-6 py-7 bg-primary hover:bg-primary/90 text-white font-medium text-base shadow-md hover:shadow-lg flex items-center gap-2 transition-all duration-200 rounded-lg" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Analyze</span>
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-sm text-gray-500 flex flex-wrap items-center gap-2.5">
          <span className="font-medium">Try these examples:</span>
          <div className="flex flex-wrap gap-2">
            {exampleUrls.map((example) => (
              <button
                key={example}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:border-primary/30 text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors text-sm font-medium"
                onClick={() => handleExampleClick(example)}
                disabled={isLoading}
              >
                {example}
                <ArrowRight className="h-3.5 w-3.5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UrlForm;
