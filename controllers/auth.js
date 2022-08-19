import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const register = async(req,res,next) => {
    try{

        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);

        const newUser =new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        })

        await newUser.save()
        res.status(200).send("user has been ceated")
    }catch(err){
        next(err)
    }
}


export const login = async(req,res,next) => {
    try{
        const user= await User.findOne({username:req.body.username})
        if(!user) return next(createError(404, "User Not Found!!"))
       
        console.log("req.body.password----"+req.body.password)
        console.log("user.password----"+user.password)
        const isPassswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPassswordCorrect) 
           return next(createError(400,"Wrong password or username!!"))
        

           const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT);

           const{ password, isAdmin, ...otherDetails}=user._doc;
          // res.status(200).json({...otherDetails});
          res.cookie("access_token",token,{httpOnly:true}).status(200).json({ details: { ...otherDetails }, isAdmin });
    }catch(err){
        next(err)
    }
}