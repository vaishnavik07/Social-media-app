const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            min:2,
            max:50
        },
        lastName:{
            type: String,
            required: true,
            min:2,
            max:50
        },
       
        friends: {
            type: Array,
            default:[]
        }, email:{
            type: String,
            required: true,
            max:50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 5
        },
        picturePath:{
            type: String,
            default:""
        },
        location: String,
        ccupation: String,
        viewedProfile: Number,
        impressions: Number,

    },
    {timestamps: true}

);

// const User = mongoose.model("User", UserSchema);
let User
try {
  User = mongoose.model('User');
} catch (error) {
  User = mongoose.model('User', UserSchema);
}
module.exports=User;