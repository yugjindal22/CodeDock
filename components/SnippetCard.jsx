'use client';

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const SnippetCard = ({ post, handleTagClick, handleEdit, handleDelete}) => {

  const [copied, setCopied] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.snippet);
    navigator.clipboard.writeText(post.snippet);
    setTimeout(() => setCopied(''), 3000); 
  }

  const openProfile = () => {
    // Always route to the appropriate profile
    const profilePath = post.creator._id === session?.user?.id 
      ? '/profile'  // Own profile
      : `/profile/${post.creator._id}`;  // Other user's profile
    
    router.push(profilePath);
  }

  return (
    <div className='snippet_card group hover:border-blue-500/50 transition-all duration-300'>
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain ring-2 ring-gray-700 hover:ring-blue-500 transition-all duration-300'
            onClick={openProfile}
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-100 hover:text-blue-400 transition-colors duration-200">
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-400'>{post.creator.email}</p>
          </div>
        </div>

        <div className="copy_btn hover:bg-gray-700/50 active:scale-95" onClick={handleCopy}>
          <Image
            src={copied === post.snippet ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt={copied === post.snippet ? 'copied' : 'copy'}
            width={12}
            height={12}
            className={copied === post.snippet ? 'text-green-500' : 'text-gray-400'}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 my-4">
        {post.tag.split(' ').map((tag, index) => (
          <button
            key={index}
            onClick={() => handleTagClick && handleTagClick(tag)}
            className="px-3 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20 
            hover:bg-blue-500/20 transition-colors duration-200"
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="relative">
        <div 
          className={`grid transition-all duration-300 ${
            isCollapsed ? 'grid-rows-[200px]' : 'grid-rows-[1fr]'
          }`}
        >
          <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 font-mono text-sm overflow-hidden">
            <pre className="text-gray-200 whitespace-pre-wrap break-words">
              <code>{post.snippet}</code>
            </pre>
          </div>
        </div>
        
        {isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
        )}
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute bottom-2 right-2 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-gray-400 hover:text-gray-300 transition-all duration-200"
        >
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              isCollapsed ? 'rotate-0' : 'rotate-180'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {session?.user?.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-700/50 pt-3">
          <button 
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200 flex items-center gap-2" 
            onClick={handleEdit}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button 
            className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200 flex items-center gap-2" 
            onClick={handleDelete}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-6v.01M5 7V4a1 1 0 011-1h12a1 1 0 011 1v3" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default SnippetCard
