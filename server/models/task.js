const mongoose=require("mongoose");
const schema=mongoose.Schema;

const TaskSchema=new schema({
    name:{
        type:String,
        required:true
    },
    from_person:{
        type:String,
        required:true
    },
    to_person:{
        type:String,
        required:true
    },
    done:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})
module.exports=mongoose.model('Tasks',TaskSchema);