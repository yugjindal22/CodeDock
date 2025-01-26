'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { id: userId } = useParams(); // Extracting id from the path parameters
  
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null); // State to store user data

  useEffect(() => {
    
    const fetchUserData = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    }

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    }

    if (userId) {
      fetchUserData(); // Fetch user data
      fetchPosts(); // Fetch posts
    }
  }, [userId]);

  return (
    <div>
      <Profile 
        name={`${user?.username}'s`}
        desc={`Welcome to ${user?.username}'s personalised profile page, Explore ${user?.username}'s exceptional snippets and be inspired by the power of thier creativity!`}
        data={posts}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    </div>
  )
}

export default MyProfile
