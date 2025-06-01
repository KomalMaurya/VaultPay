const router=require('express').Router();
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Transaction=require('../models/transactionModel');

//transfer money from one account to another
router.post('/transfer-funds',authMiddleware,async(req,res)=>{
    try {

        //save the transaction
        const newTransaction=new Transaction(req.body);
        await newTransaction.save();

        //decrease the sender's balance
        await User.findByIdAndUpdate(req.body.sender,{
            $inc:{balance:-req.body.amount},
        });


        //increase the receiver's balance
        await User.findByIdAndUpdate(req.body.receiver,{
            $inc:{balance: req.body.amount},
        });
        res.send({
            message:"Transaction Successful",
            data:newTransaction,
            success:true
        });
    } catch (error) {
        res.send({
            message:"Transaction failed",
            data:error.message,
            success:false,
        });
    }
});

//verify the receiver's account number
router.post("/verify-account",authMiddleware,async(req,res)=>{
    try {
        const user=await User.findOne({_id:req.body.receiver});
        if(user){
            res.send({
                message:"Account Verified",
                data:user,
                success:true,
            });
        }else{
            res.send({
                message:"Account not found",
                data:null,
                success:false,
            });
        }
    } catch (error) {
        res.send({
                message:"Account not found",
                data:null,
                success:false,
            });
    }
} );

//get all the transactions for a user

router.post("/get-all-transactions-by-user",authMiddleware,async(req,res)=>{
    try{
        const transactions=await Transaction.find({$or :[{sender : req.userId},{receiver: req.userId}],});
        res.send({
            message:"Transaction fecthed",
            data:transactions,
            success:true,
        });
    }catch(error){
        res.send({
            message:"Transaction not fecthed",
            data:error.message,
            success:false,
        });
    }
});


module.exports=router;