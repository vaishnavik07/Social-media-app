const express = require('express');
const {getFeedPosts, getUserPosts, likePost} = require('../controllers/posts');
const {verifyToken} = require('../middleware/auth');

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);

module.exports = router;