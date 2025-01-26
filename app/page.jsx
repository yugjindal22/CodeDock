'use client';
import Feed from '@components/Feed';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

const Home = () => {
  const { data: session } = useSession();

  const handleCreateClick = (e) => {
    if (!session) {
      e.preventDefault();
      signIn();
    }
  };

  return (
    <section className="relative w-full flex-center flex-col">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-blue-500/20 to-transparent blur-3xl animate-slow-spin"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-cyan-500/20 to-transparent blur-3xl animate-reverse-slow-spin"></div>
      </div>

      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-8 lg:py-12">
          <div className="flex-1 text-left space-y-6">
            <div className="space-y-2">
              <h2 className="text-blue-400 font-semibold tracking-wide uppercase">Welcome to CodeDock</h2>
              <h1 className="head_text text-left max-w-3xl">
                <span className="text-gray-100 leading-tight">Where Code Meets</span>
                <span className="orange_gradient block"> Community</span>
              </h1>
            </div>
            
            <p className="desc text-left">
              Discover, share, and learn from a curated collection of code snippets. Join thousands of developers building the future together.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Link 
                href={session ? "/create-snippet" : "#"}
                onClick={handleCreateClick}
                className="cta_button"
              >
                Share Your Code
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="#explore" className="secondary_button">
                Explore Snippets
              </Link>
            </div>

            
          </div>

          {/* Interactive Preview Card */}
          <div className="flex-1 w-full max-w-xl">
            <div className="preview_card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-gray-300">preview.jsx</span>
              </div>
              <pre className="text-sm">
                <code className="language-javascript text-gray-50 font-medium">
                  {`function Welcome() {
  return (
    <div className="hello-world">
      <h1>Hello, CodeDock! 👋</h1>
    </div>
  );
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative mt-14 mb-16"> {/* Changed from mt-32 to mt-16 */}
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-100">
              Powerful Features for Developers
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Everything you need to share and discover high-quality code snippets
            </p>
          </div>

          {/* Features Grid with Better Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Share Code Snippets",
                description: "Easily share your code snippets with the developer community in a clean, organized format",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Quick Search",
                description: "Find snippets using tags, usernames, or content through our simple search functionality",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )
              },
              {
                title: "Community Driven",
                description: "Browse through a collection of snippets shared by developers from around the world",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              }
            ].map((feature, i) => (
              <div key={i} className="feature_card group hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg group-hover:bg-blue-500/30 transition-all duration-300"></div>
                    <div className="relative text-blue-400">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-100">{feature.title}</h3>
                </div>
                <p className="text-gray-400 pl-16">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feed Section */}
        <div id="explore" className="py-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-100">Recent Snippets</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover the latest code snippets shared by our community
            </p>
          </div>
          <Feed />
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "Smart Syntax Highlighting",
    description: "Automatic language detection and beautiful syntax highlighting for over 100+ programming languages.",
    icon: <svg>...</svg> // Add your icon here
  },
  // Add more features...
];

export default Home;
