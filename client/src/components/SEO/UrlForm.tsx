import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

interface UrlFormProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

const exampleUrls = ["twitter.com", "apple.com", "airbnb.com"];

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
    setUrl(`https://${example}`);
  };

  const handleClear = () => {
    setUrl("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Analyze website SEO tags</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex-grow">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Link className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10 pr-12 py-3"
              required
            />
            {url && (
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={handleClear}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            )}
          </div>
        </div>
        <Button 
          type="submit" 
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700" 
          disabled={isLoading}
        >
          Analyze
        </Button>
      </form>
      <div className="mt-3 text-xs text-gray-500">
        <p>
          Examples:{" "}
          {exampleUrls.map((example, index) => (
            <span key={example}>
              <Button
                type="button"
                variant="link"
                className="text-primary-500 hover:text-primary-700 p-0 h-auto text-xs font-normal"
                onClick={() => handleExampleClick(example)}
              >
                {example}
              </Button>
              {index < exampleUrls.length - 1 && ", "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default UrlForm;
