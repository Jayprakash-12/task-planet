import Post from '../models/Post.js';

/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Private (Requires JWT Token)
 */
export const createPost = async (req, res) => {
    const { content, image } = req.body;
    
    // Validation: Require either text or an image to create a post
    if (!content && !image) {
        return res.status(400).json({ message: 'Either content or image is required' });
    }
    
    try {
        // Instantiate the post with the authenticated user's ID
        const post = new Post({
            user: req.user._id,
            content,
            image
        });
        
        const createdPost = await post.save();
        
        // Populate the user field so the frontend receives the author's name immediately
        const populatedPost = await Post.findById(createdPost._id).populate('user', 'name');
        res.status(201).json(populatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Fetch all posts for the Feed
 * @route   GET /api/posts
 * @access  Public (or Private depending on Feed rules)
 */
export const getPosts = async (req, res) => {
    try {
        // Fetch all posts, sort by newest first, and expand user reference IDs into actionable generic objects (name)
        const posts = await Post.find({})
            .populate('user', 'name')
            .populate('comments.user', 'name')
            .sort({ createdAt: -1 }); // -1 for descending order (newest top)
            
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Toggle Like on a post
 * @route   PUT /api/posts/:id/like
 * @access  Private
 */
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        const userId = req.user._id;
        
        // If user already liked the post, remove their ID (Unlike)
        // Otherwise, add their ID to the likes array (Like)
        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => id.toString() !== userId.toString());
        } else {
            post.likes.push(userId);
        }
        
        await post.save();
        res.json(post.likes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Add a comment to a post
 * @route   POST /api/posts/:id/comment
 * @access  Private
 */
export const commentPost = async (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        return res.status(400).json({ message: 'Comment text is required' });
    }
    
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        // Construct the comment object attached to the current user
        const comment = {
            user: req.user._id,
            text
        };
        
        post.comments.push(comment);
        await post.save();
        
        // Return the updated, fully populated comments array to dynamically update the UI
        const updatedPost = await Post.findById(req.params.id)
            .populate('user', 'name')
            .populate('comments.user', 'name');
            
        res.status(201).json(updatedPost.comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
