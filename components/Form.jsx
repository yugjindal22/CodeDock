import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <div className="w-full max-w-full grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Main form section - takes 3 columns */}
      <div className="lg:col-span-3">
        <section className="w-full">
          <h1 className="head_text text-left">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {type} Snippet
            </span>
          </h1>
          <p className="desc text-left max-w-md">
            Share your code snippets with the world and help others learn from your experience.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 w-full flex flex-col gap-7 glassmorphism border-2 border-gray-700/30 backdrop-blur-lg"
          >
            <label>
              <span className="font-satoshi font-semibold text-base text-blue-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Code Snippet
              </span>
              <textarea
                value={post.snippet}
                onChange={(e) => setPost({ ...post, snippet: e.target.value })}
                placeholder="// Paste your code snippet here..."
                required
                className="mt-2 w-full flex rounded-lg h-[300px] font-mono text-gray-200 text-sm p-4 bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none resize-none"
              />
            </label>

            <label>
              <span className="font-satoshi font-semibold text-base text-blue-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Tags
              </span>
              <input
                value={post.tag}
                onChange={(e) => setPost({ ...post, tag: e.target.value })}
                placeholder="#javascript #react #webdev"
                required
                className="mt-2 w-full flex rounded-lg p-4 text-sm bg-gray-800/50 text-gray-200 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none"
              />
            </label>

            <div className="flex-end mx-3 mb-5 gap-4">
              <Link 
                href="/" 
                className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {type}ing...
                  </>
                ) : (
                  type
                )}
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Tips section - takes 2 columns */}
      <div className="hidden lg:block lg:col-span-2">
        <div className="sticky top-24 space-y-6">
          <div className="glassmorphism p-6">
            <h3 className="text-xl font-bold text-gray-100 mb-4">Tips for Great Snippets</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                <span>Write clear, concise code that focuses on a single functionality or concept</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                <span>Add descriptive comments to explain complex logic or usage instructions</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                <span>Use relevant tags to help others discover your snippet</span>
              </li>
            </ul>
          </div>

          <div className="glassmorphism p-6">
            <h3 className="text-xl font-bold text-gray-100 mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['#javascript', '#react', '#python', '#css', '#webdev', '#beginners'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="glassmorphism p-6 bg-blue-500/5">
            <div className="flex items-start gap-3">
              <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-300 text-sm">
                Your snippet will be reviewed and published immediately. Make sure it follows our community guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
