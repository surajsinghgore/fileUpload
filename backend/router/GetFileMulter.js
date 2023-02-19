const express = require("express");
const router = express.Router();
const FileSchema = require("../schema/FileInfoSchema");
require('dotenv').config()
const cors=require('cors')
router.use(cors())


router.post("/MultiFile",  async(req, res) => {

  try {
   let data=await FileSchema.find();
return res.status(201).json({ files: data}); 
  
  } catch (e) {
  
    console.log(e);
   
    return res.status(500).json({ error: "Internal Server Error" });
  }

  }
);

module.exports = router;
