import { Heart, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary/10 text-primary">
                <Heart className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">SEO Tag Inspector</h3>
            </div>
            <p className="mt-3 text-gray-600 text-sm max-w-md">
              A powerful tool to analyze website SEO meta tags, assess optimization status, 
              and provide actionable recommendations for better search engine ranking.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary text-sm">Help Center</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary text-sm">Documentation</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary text-sm">SEO Guidelines</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary text-sm">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary text-sm">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SEO Tag Inspector. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="https://github.com" className="text-gray-500 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" className="text-gray-500 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" className="text-gray-500 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
