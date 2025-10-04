import User from '../models/User.js';

export const getInfo = (req,res) => {
    
    res.json({message:'henlo'});
};

export const userProfile = async (req,res) => {
    try {
        const userId = req.params.id;
        const user = await User.userProfile(userId);

        if(!user) {
            return res.status(404).json({succes : false, message : 'user not found'});
        }
        res.json({success:true,data:user});


    }
    catch (error){
        res.status(500).json({success:false,message:error.message});
    }
}

export const attendedEvent = async (req,res) =>{
    const userID = req.params.id;
    const eventList = await User.attendedEvent(userID);

    return res.json({success:true,data:eventList});
}