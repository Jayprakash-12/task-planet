import Post from '../models/Post.js';

export const createPost = async (req, res) => {
    const { content, image } = req.body;
    if (!content && !image) {
        return res.status(400).json({ message: 'Either content or image is required' });
    }
    try {
        const post = new Post({
            user: req.user._id,
            content,
            image
        });
        const createdPost = await post.save();
        const populatedPost = await Post.findById(createdPost._id).populate('user', 'name');
        res.status(201).json(populatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate('user', 'name')
            .populate('comments.user', 'name')
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const userId = req.user._id;
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
        const comment = {
            user: req.user._id,
            text
        };
        post.comments.push(comment);
        await post.save();
        const updatedPost = await Post.findById(req.params.id)
            .populate('user', 'name')
            .populate('comments.user', 'name');
        res.status(201).json(updatedPost.comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
