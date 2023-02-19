import multer from "multer";
const express=require('express')
const app=express();

const multerMiddleware=(req,res,next)=>{
try{

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
    fileSize: 1024 * 1024 * 5, //5 mb
  },
  fileFilter: fileFilter,
});

app.use(upload.single('Image'))


next();


}catch(e){
console.log(e)
return res.status(500).json({error:"Internal Server Error"})

}

}

module.export=multerMiddleware;