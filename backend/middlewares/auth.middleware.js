import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const protectRoute = async(req, res, next) => {
    try {
        if(!req.cookies.jwt){
        return res.status(401).json({message: 'Not Authorized!!'});
    }

    const decoded = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);


    req.user = {id: decoded.id};

    next();  
    } catch (error) {
        res.status(500).json({message: `${error}`});
    }
  
};

export default protectRoute;