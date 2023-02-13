const User = require("../models/User");

// READ

exports.getUser = async (req,res) => {
    try{
        const {id} =req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    }catch(err)
    {
        res.status(404).json({message: err.message});
    }
}

exports.getUserFriends = async(req,res) => {
    try{

        const {id} =req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        )

        res.status(200).json(formattedFriends);

    }catch(err)
    {
        res.status(404).json({message: err.message});
    }
}

exports.addRemoveFriends = async (req,res) => {
    try{
        
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        //If friend already present then remove otherwise add friend
        if(user.friends.includes(friendId)){
            //remove from user list
            user.friends= user.friends.filter((id) => id!==friendId);
            //remove from friend list
            friend.friends= friend.friends.filter((id) => id!==id);
        }
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        )

        res.status(200).json(formattedFriends);

    }catch(err){
        res.status(404).json({message: err.message});
    }    
}