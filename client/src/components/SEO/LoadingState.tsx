import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="card p-12 mb-8 flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-sm mx-auto text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping"></div>
          <div className="relative animate-pulse flex items-center justify-center rounded-full h-24 w-24 bg-primary/20 border border-primary/30">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Analyzing SEO tags...</h2>
        <p className="text-gray-600 mt-2 max-w-xs mx-auto">
          We're inspecting the website's meta tags and preparing your SEO analysis
        </p>
      </div>
    </div>
  );
}

export default LoadingState;
