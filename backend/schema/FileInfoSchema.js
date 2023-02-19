const mongoose=require('mongoose');
const {Schema} =mongoose;

const fileInto=new Schema({
username:{type:String,required:'username cannot be blank',trim: true},
fileLocal:[],
title:{type:String,required:'title cannot be blank'},
keyword:{type:String,required:'description cannot be blank'},
imgOnlineURl:[],
liveUrl:{type:String,required:'live url cannot be blank'},
date:{type:String,required:'date cannot be blank'},
},
  { timestamps: true }
)


const FileSchema = mongoose.model('FileData', fileInto);

module.exports=FileSchema;