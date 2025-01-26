const Loader = () => {
  return (
    <div className="w-full space-y-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="snippet_card animate-pulse">
          {/* User info skeleton */}
          <div className="flex justify-between items-start gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700/50" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-700/50 rounded" />
                <div className="h-3 w-24 bg-gray-700/50 rounded" />
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-gray-700/50" />
          </div>

          {/* Code block skeleton */}
          <div className="my-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50">
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-700/50 rounded" />
              <div className="h-4 w-2/3 bg-gray-700/50 rounded" />
              <div className="h-4 w-1/2 bg-gray-700/50 rounded" />
            </div>
          </div>

          {/* Tags skeleton */}
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-gray-700/50" />
            <div className="h-6 w-20 rounded-full bg-gray-700/50" />
            <div className="h-6 w-14 rounded-full bg-gray-700/50" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
