const mongoose=require('mongoose')

const user=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    isadmin:{type:Boolean,required:true,default:false},
    password:{type:String,required:true},
    isblock:{type:Boolean,required:true,default:false},
    email:{type:String,required:true}
})


module.exports=mongoose.model("user",user)