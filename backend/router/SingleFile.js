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



router.post("/singleFile", upload.single("file"), async(req, res) => {
  let fileName=`./public/${req.file.filename}`;
  try {
    const { username, title, keyword ,date} = req.body;

    if (!username) {
          fs.unlink(fileName,(err=>{console.log(err)}))
      return res.status(400).json({ message: "username field not empty" });
    }
    if (!title) {
          fs.unlink(fileName,(err=>{console.log(err)}))
      return res.status(400).json({ message: "title field not empty" });
    }
    if (!keyword) {
         fs.unlink(fileName,(err=>{console.log(err)}))
      return res.status(400).json({ message: "keyword field not empty" });
    }
    if (!date) {
         fs.unlink(fileName,(err=>{console.log(err)}))
      return res.status(400).json({ message: "date field not empty" });
    }


const ressGetCloud=await cloudinary.uploader.upload(fileName, {public_id: req.file.filename})

if(!ressGetCloud){
fs.unlink(fileName,(err=>{console.log(err)}))
      return res.status(400).json({ message: "image not send to cloudinary" });
}
else{
// Generate 
    let sendData=new FileSchema({
    username,
    title,
    keyword,
    date,
    fileLocal:req.file.filename,
    imgOnlineURl:ressGetCloud,
    liveUrl:ressGetCloud.url
    })

const ress=await sendData.save()
// //! Add File
// // ? Cloudnairy-->  1 . const ressGetCloud=await cloudinary.uploader.upload(fileName, {public_id: req.file.filename})
// // ! Delete File
// //? 1. Cloudnairy--> const ressGeDel=await cloudinary.uploader.destroy(ressGetCloud.public_id)
// //? 2. LocalSystem--> fs.unlink(fileName,(err=>{console.log(err)}))
// // console.log(ressGeDel)
// // !Update File
// // ? Cloudnairy--> 1. update image to cloudinary Overwrite exitsing file                     
// // ? Cloudnairy--> 2. destory then add new Image to cloudinary
// //? LocalSystem--> same proccess as above

    return res.status(201).json({ files: ress}); 
}
  } catch (e) {
     fs.unlink(fileName,(err=>{console.log(err)}))
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  }
);

module.exports = router;
