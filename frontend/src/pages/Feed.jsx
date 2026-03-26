import React, { useEffect, useState, useContext } from 'react';
import { Container, Box } from '@mui/material';
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import PostItem from '../components/PostItem';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchPosts();
    }
  }, [user, navigate]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/posts`);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(posts.map(p => p._id === updatedPost._id ? updatedPost : p));
  };

  if (!user) return null;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="sm" sx={{ pt: 3, pb: 6 }}>
        <CreatePost onPostCreated={handlePostCreated} />
        {posts.map(post => (
          <PostItem key={post._id} post={post} onPostUpdate={handlePostUpdate} />
        ))}
      </Container>
    </Box>
  );
};

export default Feed;
