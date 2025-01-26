'use client';

import { useState, useEffect } from 'react';
import SnippetCard from './SnippetCard';
import Loader from './Loader';

const SnippetCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 snippet_layout'>
      {data.map((post) => (
        <SnippetCard
          key={post._id} // _id is a default field in MongoDB, which acts as a unique identifier for each documentmnnmnmm 
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
};


const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Add loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/snippet');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  },[]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    filterPosts(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    filterPosts(tag);
  }

  const filterPosts = (searchText) => {
    const searchLower = searchText.toLowerCase();
    const filtered = posts.filter(post => 
      (post.creator.username && post.creator.username.toLowerCase().includes(searchLower)) ||
      (post.snippet && post.snippet.toLowerCase().includes(searchLower)) ||
      (post.tag && post.tag.toLowerCase().includes(searchLower))
    );
    setFilteredPosts(filtered);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {isLoading ? (
        <div className="mt-16">
          <Loader />
        </div>
      ) : (
        <SnippetCardList 
          data={filteredPosts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  );
};

export default Feed;
