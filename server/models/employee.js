const mongoose =require("mongoose");

const employeeSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
    },
    adresse:{
        type:String,
        required:true
    },
    numcompte:{
        type:Number,
        required:true
    },
    grade:{
        type:String,
        required:true
    },
    sup:{
        type:String,
        required:true
    },
});
module.exports = Employee = mongoose.model("employee", employeeSchema);