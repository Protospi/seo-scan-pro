export function LoadingState() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <h2 className="text-lg font-medium text-gray-900">Analyzing SEO tags...</h2>
        <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
      </div>
    </div>
  );
}

export default LoadingState;
