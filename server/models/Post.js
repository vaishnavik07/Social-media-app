const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        location:String,
        description: String,
        picturePath: String,
        userPicturePath: String,

        // Format{someid: true/false}
        likes:{
            type: Map, //type array will require O(n) time to add or delete like it will require O(1)
            of: Boolean
        },

        comments:{
            type: Array,
            default:[]
        }
    },
    {
        timestamps:true
    }
)

const Post= mongoose.model("Post", postSchema);

module.exports = Post;