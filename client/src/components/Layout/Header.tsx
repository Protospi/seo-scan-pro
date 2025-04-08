import { FaSearch } from "react-icons/fa";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaSearch className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-gray-900">SEO Tag Inspector</h1>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <a href="#" className="text-gray-500 hover:text-gray-700 text-sm font-medium">Help</a>
          <a href="#" className="text-gray-500 hover:text-gray-700 text-sm font-medium">About</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
