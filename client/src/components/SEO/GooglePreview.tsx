import { SEOAnalysis } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTruncatedUrl } from "@/lib/seoUtils";
import { 
  ExternalLink, CheckCircle, AlertCircle, XCircle, 
  Search, Monitor, LayoutGrid, Globe, Info
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GooglePreviewProps {
  analysis: SEOAnalysis;
}

export function GooglePreview({ analysis }: GooglePreviewProps) {
  const { url, title, description, favicon, canonical } = analysis;
  const truncatedUrl = getTruncatedUrl(url);
  
  // Calculate ideal character ranges
  const titleIdealMin = 30;
  const titleIdealMax = 60;
  const descIdealMin = 120;
  const descIdealMax = 155;
  
  // Calculate title width as percentage of ideal range
  const calculateTitleProgress = () => {
    if (!title.length) return 0;
    if (title.length > titleIdealMax) return 100;
    return Math.min(100, Math.round((title.length / titleIdealMax) * 100));
  };
  
  // Calculate description width as percentage of ideal range
  const calculateDescProgress = () => {
    if (!description.length) return 0;
    if (description.length > descIdealMax) return 100;
    return Math.min(100, Math.round((description.length / descIdealMax) * 100));
  };
  
  // Determine if title or description is within ideal range
  const isTitleOptimal = title.length && title.length >= titleIdealMin && title.length <= titleIdealMax;
  const isDescOptimal = description.length && description.length >= descIdealMin && description.length <= descIdealMax;
  
  // Get color for length indicators
  const getLengthColor = (current: number | undefined, min: number, max: number) => {
    if (!current) return "bg-gray-300";
    if (current < min) return "bg-warning-500";
    if (current > max) return "bg-warning-500";
    return "bg-success-500";
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "good":
        return (
          <Badge className="badge-success ml-2 flex items-center gap-1 px-2 py-1">
            <CheckCircle className="h-3 w-3" />
            <span>Good</span>
          </Badge>
        );
      case "needs_improvement":
        return (
          <Badge className="badge-warning ml-2 flex items-center gap-1 px-2 py-1">
            <AlertCircle className="h-3 w-3" />
            <span>Needs Work</span>
          </Badge>
        );
      case "missing":
        return (
          <Badge className="badge-danger ml-2 flex items-center gap-1 px-2 py-1">
            <XCircle className="h-3 w-3" />
            <span>Missing</span>
          </Badge>
        );
      default:
        return null;
    }
  };
  
  // Get tooltip text for length requirements
  const getTitleTooltip = () => {
    if (!title.length) return "Missing title";
    if (title.length < titleIdealMin) return `Too short (${title.length}/${titleIdealMin}-${titleIdealMax})`;
    if (title.length > titleIdealMax) return `Too long (${title.length}/${titleIdealMin}-${titleIdealMax})`;
    return `Optimal (${title.length}/${titleIdealMin}-${titleIdealMax})`;
  };
  
  const getDescTooltip = () => {
    if (!description.length) return "Missing description";
    if (description.length < descIdealMin) return `Too short (${description.length}/${descIdealMin}-${descIdealMax})`;
    if (description.length > descIdealMax) return `Too long (${description.length}/${descIdealMin}-${descIdealMax})`;
    return `Optimal (${description.length}/${descIdealMin}-${descIdealMax})`;
  };

  return (
    <Card className="card h-full shadow-md">
      <CardHeader className="px-6 py-4 border-b border-gray-100 bg-gradient-to-b from-blue-50 to-white">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-blue-100 rounded-full text-blue-600">
            <Search className="h-5 w-5" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">
            Google Search Preview
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Browser chrome styling for a more visual representation */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white">
          <div className="bg-gray-100 p-2 border-b border-gray-200 flex items-center">
            <div className="flex space-x-1.5 ml-1 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 bg-white rounded-md py-1 px-3 text-gray-600 text-xs">
              {url}
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center mb-4">
              <div className="p-1.5 mr-2 rounded-full border border-gray-200">
                <Search className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1 h-10 bg-gray-100 rounded-full"></div>
            </div>
            
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <span className="mr-2">All</span>
              <span className="mr-2 text-blue-600 font-medium border-b-2 border-blue-600 pb-0.5">Images</span>
              <span className="mr-2">News</span>
              <span className="mr-2">Videos</span>
              <span className="mr-2">Maps</span>
              <span>More</span>
            </div>
          </div>
          
          {/* Google search result preview */}
          <div className="p-6">
            <div className="flex flex-col mb-8">
              <div className="text-sm text-green-800 flex items-center overflow-hidden">
                <span className="truncate">{truncatedUrl}</span>
                <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0" />
              </div>
              <div className="text-xl text-blue-600 font-medium mt-1 hover:underline cursor-pointer line-clamp-2">
                {title.content || "No title available"}
              </div>
              <div className="text-sm text-gray-700 mt-1 line-clamp-2">
                {description.content || "No description available"}
              </div>
            </div>
            
            {/* More search results simulation */}
            <div className="space-y-4 opacity-30 pointer-events-none">
              <div>
                <div className="text-sm text-green-800 flex items-center overflow-hidden">
                  <span className="truncate">example.com › page</span>
                </div>
                <div className="text-xl text-blue-600 font-medium mt-1">
                  Example Search Result
                </div>
                <div className="text-sm text-gray-700 mt-1">
                  This is a simulated search result to show what a complete Google search page might look like...
                </div>
              </div>
              
              <div>
                <div className="text-sm text-green-800 flex items-center overflow-hidden">
                  <span className="truncate">anothersite.com</span>
                </div>
                <div className="text-xl text-blue-600 font-medium mt-1">
                  Another Sample Result
                </div>
                <div className="text-sm text-gray-700 mt-1">
                  Here's one more example result to provide context for how your result will appear among others...
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Visual representation of length requirements */}
        <div className="mt-8 mb-4">
          <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
            <Monitor className="mr-2 h-5 w-5 text-primary" />
            Character Length Optimization
          </h3>
          
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span className="text-gray-700 text-sm font-medium">Title</span>
                  <div className={`ml-2 ${isTitleOptimal ? "text-success-600" : "text-warning-600"} text-xs font-medium`}>
                    {getTitleTooltip()}
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {title.length || 0}/{titleIdealMin}-{titleIdealMax}
                </span>
              </div>
              <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-2 rounded-full ${getLengthColor(title.length, titleIdealMin, titleIdealMax)}`} 
                  style={{ width: `${calculateTitleProgress()}%` }}></div>
                {/* Indicator for ideal minimum */}
                <div className="absolute top-0 bottom-0 w-px bg-gray-300" 
                  style={{ left: `${(titleIdealMin / titleIdealMax) * 100}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span className="text-gray-700 text-sm font-medium">Description</span>
                  <div className={`ml-2 ${isDescOptimal ? "text-success-600" : "text-warning-600"} text-xs font-medium`}>
                    {getDescTooltip()}
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {description.length || 0}/{descIdealMin}-{descIdealMax}
                </span>
              </div>
              <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-2 rounded-full ${getLengthColor(description.length, descIdealMin, descIdealMax)}`} 
                  style={{ width: `${calculateDescProgress()}%` }}></div>
                {/* Indicator for ideal minimum */}
                <div className="absolute top-0 bottom-0 w-px bg-gray-300" 
                  style={{ left: `${(descIdealMin / descIdealMax) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Meta fields status */}
        <div className="mt-8 space-y-3 p-4 rounded-xl border border-gray-200 shadow-sm bg-white">
          <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
            <LayoutGrid className="mr-2 h-5 w-5 text-primary" />
            SEO Element Status
          </h3>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <div className="p-1.5 bg-gray-200 rounded-full mr-3">
                <img src={favicon.content || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ii8+PHBvbHlsaW5lIHBvaW50cz0iMjEgMTUgMTYgMTAgNSAyMSIvPjwvc3ZnPg=="} 
                  alt="Site favicon" className="h-5 w-5" onError={(e) => { 
                    (e.target as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ii8+PHBvbHlsaW5lIHBvaW50cz0iMjEgMTUgMTYgMTAgNSAyMSIvPjwvc3ZnPg==";
                  }} />
              </div>
              <div>
                <span className="text-gray-800 font-medium">Favicon</span>
                <div className="text-gray-500 text-xs">
                  {favicon.status === "good" ? "Properly implemented" : "Missing site icon"}
                </div>
              </div>
            </div>
            {getStatusBadge(favicon.status)}
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mr-3">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <span className="text-gray-800 font-medium">Title</span>
                <div className="text-gray-500 text-xs">
                  {title.length ? `${title.length} characters - ${title.message}` : "Missing title tag"}
                </div>
              </div>
            </div>
            {getStatusBadge(title.status)}
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <div className="p-1.5 rounded-full bg-purple-100 text-purple-600 mr-3">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <div>
                <span className="text-gray-800 font-medium">Description</span>
                <div className="text-gray-500 text-xs">
                  {description.length ? `${description.length} characters - ${description.message}` : "Missing description tag"}
                </div>
              </div>
            </div>
            {getStatusBadge(description.status)}
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-600 mr-3">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <span className="text-gray-800 font-medium">URL Structure</span>
                <div className="text-gray-500 text-xs">
                  {canonical.status === "good" ? "Proper canonical URL implementation" : canonical.message}
                </div>
              </div>
            </div>
            {getStatusBadge(canonical.status)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GooglePreview;
