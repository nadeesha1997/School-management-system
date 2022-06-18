const mongoose=require("mongoose");
const schema=mongoose.Schema;

const TaskSchema=new schema({
    topic:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    from_person:{
        type:schema.Types.ObjectId,
        required:true,
        ref:'Users'
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