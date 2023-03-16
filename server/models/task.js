const mongoose =require("mongoose");

const taskSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    ide:{
        type:String,
        required:true
    }
});
module.exports = Task = mongoose.model("task", taskSchema);