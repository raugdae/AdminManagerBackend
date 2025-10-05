import jwt from 'jsonwebtoken';

export const authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];

 

    const token = authHeader && authHeader.split(' ')[1];


    if (!token) {
        return res.status(401).json({succes:false,message:'Missing token, access denied'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }catch (error){
        return res.status(403).json({
            success:false,
            message : 'token invalid or expired'
        });
    }
};

export const authorizeRole = (...roles) =>{

    return (req,res,next) =>{
        if (!req.user){
            return res.status(401).json({success:false,message:'No authentication'});
        }

        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:false, message:'Access denied, insufficent rights'});
        }

        next();
    }
}
