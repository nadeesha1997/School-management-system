const express=require("express");
const task = require("../../models/task");
const router=express.Router();

const Tasks=require("../../models/task");

router.post('/',async (req,res)=>{
    const newTask=new task(req.body);
    try{
        const task=await newTask.save();
        if(!task) throw Error("Adding task failed");

        res.status(200).json(task);
    }catch(err){
        res.status(400).json({msg:err});
    }
});

router.get('/',async (req,res)=>{
    try{
        const tasks=await Tasks.find();
        if(!tasks) throw Error("No tasks");

        res.status(200).json(tasks);
    }catch(err){
        res.status(400).json({msg:err});
    }
});

router.get('/',async (req,res)=>{
    try{
        const tasks=await Tasks.find();
        if(!tasks) throw Error("No tasks");

        res.status(200).json(tasks);
    }catch(err){
        res.status(400).json({msg:err});
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const task=await Tasks.findById(req.params.id);
        if(!task) throw Error("No task");

        res.status(200).json(task);
    }catch(err){
        res.status(400).json({msg:err});
    }
});

router.patch('/:id',async (req,res)=>{
    const newTask=new task(req.body);
    try{
        const task=await Tasks.findByIdAndUpdate(req.params.id,newTask);
        if(!task) throw Error("No task");

        res.status(200).json(task);
    }catch(err){
        res.status(400).json({msg:err});
    }
});

router.delete('/:id',async (req,res)=>{
    try{
        const task=await Tasks.findByIdAndDelete(req.params.id);
        if(!task) throw Error("No task");

        res.status(200).json(task);
    }catch(err){
        res.status(400).json({msg:err});
    }
});

module.exports=router
