import React, { useContext, useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, CardMedia, Avatar, Typography, IconButton, Box, Collapse, TextField, Button } from '@mui/material';
import { Favorite, FavoriteBorder, Comment, Share } from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const PostItem = ({ post, onPostUpdate }) => {
  const { user } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');

  const isLiked = post.likes.includes(user?._id);

  const handleLike = async () => {
    if (!user) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put(`http://localhost:5000/api/posts/${post._id}/like`, {}, config);
      onPostUpdate({ ...post, likes: data });
    } catch (error) {
      console.error('Error liking post', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(`http://localhost:5000/api/posts/${post._id}/comment`, { text: commentText }, config);
      onPostUpdate({ ...post, comments: data });
      setCommentText('');
    } catch (error) {
      console.error('Error commenting on post', error);
    }
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {post.user.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={<Typography variant="subtitle2" fontWeight={600}>{post.user.name}</Typography>}
        subheader={formattedDate}
      />
      {post.content && (
        <CardContent sx={{ pt: 0, pb: 1 }}>
          <Typography variant="body1" color="text.primary" sx={{ whiteSpace: 'pre-wrap' }}>
            {post.content}
          </Typography>
        </CardContent>
      )}
      {post.image && (
        <CardMedia
          component="img"
          image={post.image}
          alt="Post Image"
          sx={{ maxHeight: 500, objectFit: 'cover' }}
        />
      )}
      <CardActions disableSpacing sx={{ justifyContent: 'space-between', px: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleLike} color={isLiked ? "error" : "default"} size="small">
              {isLiked ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5, fontWeight: 500 }}>
              {post.likes.length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => setExpanded(!expanded)} size="small">
              <Comment />
            </IconButton>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5, fontWeight: 500 }}>
              {post.comments.length}
            </Typography>
          </Box>
        </Box>
        <IconButton size="small">
          <Share />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ px: 2, pb: 2 }}>
          {post.comments.map((c, index) => (
            <Box key={index} sx={{ mb: 1.5, display: 'flex', gap: 1 }}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: 'secondary.main', fontSize: '0.875rem' }}>
                {c.user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ bgcolor: '#f0f2f5', p: 1, borderRadius: 2, px: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                  {c.user.name}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                  {c.text}
                </Typography>
              </Box>
            </Box>
          ))}
          {user && (
            <Box component="form" onSubmit={handleComment} sx={{ display: 'flex', gap: 1, mt: 2, alignItems: 'center' }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <TextField
                fullWidth
                size="small"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 5, bgcolor: '#f0f2f5' } }}
              />
              <Button type="submit" variant="contained" size="small" sx={{ borderRadius: 5, textTransform: 'none' }} disabled={!commentText.trim()}>
                Post
              </Button>
            </Box>
          )}
        </Box>
      </Collapse>
    </Card>
  );
};
export default PostItem;
