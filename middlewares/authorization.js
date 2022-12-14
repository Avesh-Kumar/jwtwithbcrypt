import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

var checkUserAuth = async (req,res,next) =>{
    let token;
    const {authorization}=req.headers;
    console.log(authorization);
    console.log(req.body);
    if(authorization && authorization.startsWith('Bearer')){
        try{
            token=authorization.split(' ')[1];
            const {user_id}=jwt.verify(token,process.env.SECRET_KEY);
            req.user=await User.findById(user_id).select('-password');
            next();
        }catch(err){
            res.status(401).send({"status":"failed","message":"unauthorized person"});
        }
    }
    if(!token){
        res.status(401).send({"status":"failed","message":"token not found"});

    }
}
export default checkUserAuth;