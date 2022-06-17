const express=require("express");
const router=express.Router();

const User=require("../../models/user");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const secret=require("../../secret.json")

const checkAuth=require("../../middleware/auth");

router.post('/signup',async (req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then(users=>{
        if(users.length>=1){
            return res.status(409).json({
                message:"email already taken"
            });
        }
        else{
            bcrypt.hash(req.body.password,10,function(err,hash){
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user=new User({
                        name:req.body.name,
                        email:req.body.email,
                        password:hash,
                        role:req.body.role
                    })
                    user.save()
                    .then(res=>res.sendStatus(201))
                    .catch(err=>res.status(500).json({error:err}));
                }
            })

        }
    })
})

router.delete('users/delete/:id',async (req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id);
        if(!task) throw Error("No user");

        res.status(200).json(user);
    }catch(err){
        res.status(500).json({msg:err});
    }
})

router.post('/login',async (req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then(users=>{
        if(users.length<1){
            return res.sendStatus(404)
        }
        bcrypt.compare(req.body.password,users[0].password,(err,isEqual)=>{
            if(err) return res.sendStatus(401);
            if(isEqual){
                const token=jwt.sign({
                    name:users[0].name,
                    email:users[0].email,
                    role:users[0].role,
                    userId:users[0]._id
                },
                secret.key,
                {expiresIn:"1h"})
                return res.status(200).json({
                    message:"success",
                    token:token
                })
            }
            res.sendStatus(401);
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

module.exports=router