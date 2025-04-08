import { FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="https://github.com" className="text-gray-400 hover:text-gray-500" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">GitHub</span>
              <FaGithub className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} SEO Tag Inspector. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
