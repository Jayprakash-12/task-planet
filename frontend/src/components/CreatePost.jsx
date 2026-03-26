import React, { useState, useContext } from 'react';
import { Paper, Box, InputBase, Button, Avatar } from '@mui/material';
import { Send } from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image.trim()) return;

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('http://localhost:5000/api/posts', { content, image }, config);
      onPostCreated(data);
      setContent('');
      setImage('');
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
        <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>
          {user ? user.name.charAt(0).toUpperCase() : 'U'}
        </Avatar>
        <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <InputBase
            placeholder="What's on your mind?"
            fullWidth
            multiline
            minRows={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ p: 1, bgcolor: '#f0f2f5', borderRadius: 2 }}
          />
          <InputBase
            placeholder="Image URL (optional)"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
            sx={{ p: 1, bgcolor: '#f0f2f5', borderRadius: 2, fontSize: '0.875rem' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button type="submit" variant="contained" endIcon={<Send />} sx={{ borderRadius: 6, textTransform: 'none', fontWeight: 600, px: 3 }}>
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreatePost;
