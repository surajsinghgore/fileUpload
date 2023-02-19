const mongoose=require('mongoose');
require('dotenv').config()
var mongoURI=process.env.DATABASE_CONNECTION;
mongoose.set('strictQuery', true);

const ConnectionDB=async(req,res,next)=>{
try{
const res=await mongoose.connect(mongoURI);
if(res){
console.log("connection successful")
}
next()

}
catch(e){
console.log(e)
return res.status(500).json({error:"Internal Server Error"})
}
}

module.exports=ConnectionDB;