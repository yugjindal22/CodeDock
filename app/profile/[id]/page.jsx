'use client';

import { useEffect, useState } from "react";
import { use } from 'react';
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const userId = use(params).id;  // Unwrap params using React.use()
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}/posts`);
        const userResponse = await fetch(`/api/users/${userId}`);
        
        const posts = await response.json();
        const userData = await userResponse.json();
        
        setUserPosts(posts);
        setUserInfo(userData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) fetchPosts();
  }, [userId]);  // Updated dependency

  return (
    <Profile
      name={userInfo.username}
      desc={`Welcome to ${userInfo.username}'s profile page`}
      data={userPosts}
      isLoading={isLoading}
    />
  );
};

export default UserProfile;
