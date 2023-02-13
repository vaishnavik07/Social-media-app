const express= require('express');

const {getUser, getUserFriends, addRemoveFriends} = require("../controllers/users.js");

const {verifyToken} = require("../middleware/auth.js");

const router = express.Router();

// READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
router.put("/:id/:friendId", verifyToken, addRemoveFriends);

module.exports = router;