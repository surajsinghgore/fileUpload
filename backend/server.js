const express=require('express')
const app=express();
const port=process.env.Production||5000;
const ConnectionDB =require('./middleware/DbConnection');
const SingleFile=require('./router/SingleFile');
const MultiFile=require('./router/MultiFile');
const allFiles=require('./router/GetFile');
const path = require("path");
require('dotenv').config()


app.use(ConnectionDB)
app.use(express.static(__dirname+'/public'))
app.use(express.static(path.join(__dirname, "../clients/build")));
app.get("/",(req,res)=>{
res.status(200).send("dd")
})

// single file [GET,POST] request
app.use("/api",SingleFile);
app.use("/api",MultiFile);
app.use("/api",allFiles);



app.listen(port,()=>{
console.log(`Server is runnig on Port http://localhost:${port}`)
})