import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Auth from '../models/Auth.js';
import dotenv from 'dotenv';

dotenv.config();


const generateToken = (user) =>{
    //console.log("User Token :", user);
    return jwt.sign({id:user.id,email:user.email,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
    );
};

export const register = async(req,res) =>{
    try{
        const {email,password,role='user'} = req.body;


        if (!email || !password){
            return res.status(400).json({
                sucess:false,
                message:'Missing user and/or password'
        });
        }

        const emailExists = await Auth.emailExists(email);
        if (emailExists) {
            return res.status(409).json({success: false, message: "User account already exists"});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);

        const userData = {email,
            pwd:hashedPassword,
            role:role || 'user',
        };

        const newUser = await Auth.registerUser(userData);

        //console.log("New User :",newUser);

        const token = generateToken(newUser);

        res.status(201).json({success: true, message: 'Account sucessfuly created',data: { user: { id:newUser.id,email:newUser.email,role:newUser.role},token}});

    }catch(error){
        console.error('Registering error :',error);
        res.status(500).json({success:false,message:error.message});
    }
};

export const login = async(req,res) =>{
    const {login,password} = req.body;

    if(!login || !password){
        return res.status(400).json({status:false,message:'Missing user and/or password'});
    }

    const user = await Auth.findByEmail(login);

    if (!user){
        return res.status(400).json( {status:false,message:'Invalid credentials'});
    }

    if (!user.is_active){
        return res.status(403).json({status:false,message:'User Account disabled, please contact and administrator'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.pwd);
    if (!isPasswordValid){
        return res.status(401).json({success:false,message:'Wrong credentials'});
    }
    const token = generateToken(user);

    console.log('Token : ', jwt.verify(token, process.env.JWT_SECRET));

    await Auth.updateLastLogin(user.id);

    return res.json({succes:true,message:'logged in successfully',data:{user:{
        id:user.id,
        email:user.email,
        role:user.role},
        token}
    });

}

