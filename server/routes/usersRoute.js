const router=require('express').Router();
const User=require('../models/userModel');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');

//register user account

router.post('/register',async(req,res)=>{
    try{

        //check if user already exists
        let user=await User.findOne({email : req.body.email});
        if(user){
            return res.send({
                success:false,
                message:"User already exists",
            });
        }

        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(req.body.password,salt);
        req.body.password=hashPassword;
        const newUser=new User(req.body);
        await newUser.save();
        res.send({
            message:"User created successfully",
            data:null,
            success:true,
        });
    }catch(error){
        res.send({
            message:error.message,
            success:false
        });
    }
});


//Login user account
router.post("/login",async(req,res)=>{
    try {

        //check if user already exists
        let user=await User.findOne({email : req.body.email});
        if(!user){
            return res.send({
                success:false,
                message:"User already exists",
            });
        }

        //check if password is correct
        const validPassword=await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            return res.send({
                success:false,
                message:"Invalid Password",
            })             
        }

        //generate token
        const token=jwt.sign(
            {userId:user._id},
            process.env.jwt_secret, {expiresIn:"1d"}
        );
        res.send({
            message:"User logged in Successfully",
            data:token,
            success:true
        });
    } catch (error) {
        res.send({
            message:error.message,
            success:false,
        });
    }
});

//get user info
router.post("/get-user-info",authMiddleware,async(req,res)=>{
    try {
        const user=await User.findById(req.userId);
        res.send({
            message:"User info fetched Successfully",
            data:user,
            success:true,
        });
    } catch (error) {
        res.send({
            message:error.message,
            success:false,
        });
    }
});

module.exports=router;