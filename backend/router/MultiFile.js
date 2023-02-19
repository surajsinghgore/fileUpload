const express = require("express");
const multer = require("multer");
const router = express.Router();
const FileSchema = require("../schema/FileInfoSchema");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;
require('dotenv').config()
const cors=require('cors')
router.use(cors())
// select file storage directory
const storage = multer.diskStorage({
  destination: "./public",
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
// filter files extensions
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG , PNG , JPEG Images are Allowed To Upload"));
  }
};
// set file size limit
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
// cloudnairy Configuration
cloudinary.config({
  cloud_name: process.env.cloudinary_api_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret
});


router.post("/MultiFile", upload.array("file"), async(req, res) => {

  try {
    const { username, title, keyword ,date} = req.body;

    if (!username) {
    for(let i=0;i<req.files.length;i++){
  let fileName=`./public/${req.files[i].filename}`;
  fs.unlink(fileName,(err=>{console.log(err)}))
}

      return res.status(400).json({ message: "username field not empty" });
    }
    if (!title) {
         for(let i=0;i<req.files.length;i++){
  let fileName=`./public/${req.files[i].filename}`;
  fs.unlink(fileName,(err=>{console.log(err)}))
}
      return res.status(400).json({ message: "title field not empty" });
    }
    if (!keyword) {
         for(let i=0;i<req.files.length;i++){
  let fileName=`./public/${req.files[i].filename}`;
  fs.unlink(fileName,(err=>{console.log(err)}))
}
      return res.status(400).json({ message: "keyword field not empty" });
    }
    if (!date) {
        for(let i=0;i<req.files.length;i++){
  let fileName=`./public/${req.files[i].filename}`;
  fs.unlink(fileName,(err=>{console.log(err)}))
}
      return res.status(400).json({ message: "date field not empty" });
    }
 let ressGetCloud;
 for(let i=0;i<req.files.length;i++){
  let fileName=`./public/${req.files[i].filename}`;
   ressGetCloud=await cloudinary.uploader.upload(fileName, {public_id: req.files[i].filename})

    let sendData=new FileSchema({
    username,
    title,
    keyword,
    date,
    fileLocal:fileName,
    imgOnlineURl:ressGetCloud,
    liveUrl:ressGetCloud.url
    })
await sendData.save()
}


if(!ressGetCloud){
    for(let i=0;i<req.files.length;i++){
  let fileName=`./public/${req.files[i].filename}`;
  fs.unlink(fileName,(err=>{console.log(err)}))
}
      return res.status(400).json({ message: "image not send to cloudinary" });
}
return res.status(201).json({ files: "ress"}); 
  
  } catch (e) {
  
    console.log(e);
    for(let i=0;i<req.files.length;i++){
  let fileName=`./public/${req.files[i].filename}`;
  fs.unlink(fileName,(err=>{console.log(err)}))
}
    return res.status(500).json({ error: "Internal Server Error" });
  }

  }
);

module.exports = router;
