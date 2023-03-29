import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar'

import Header from './components/Header'
import {

  useNavigate
} from 'react-router-dom';

export default function Upload() {
 const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

const [file,setFile]=useState(null)
const [author,setAuthor]=useState('')
const [title,setTitle]=useState('')
const [keyword,setKeyword]=useState('')
const [disable,setDisable]=useState(true);
const [image,setImage]=useState(false)
const [pdf,setPdf]=useState(false)
const [video,setVideo]=useState(false)
const [other,setOther]=useState(false)

const setFiles=(e)=>{

console.log(e.target.files)
if(e.target.files.length>10){
 toast.error("Maximum 10 files allowed to select One Time")
 setTimeout(()=>{
e.target.value = null;
  },1000)
return
}
for(let i=0;i<e.target.files.length;i++){
let fileExtensionGets=e.target.files[0].type;
if(fileExtensionGets.includes('image')){}
if(fileExtensionGets.includes('application/pdf')){}
if(fileExtensionGets.includes('video')){}
if(fileExtensionGets.includes('video')){}
if(fileExtensionGets.includes('image/webp')){}
}
setFile(e.target.files)
}

const sendFile=async(e)=>{
e.preventDefault();
setDisable(false)
setProgress(20)
let date=new Date();
let month;
if(date.getMonth()===0){month='Jan'}
else if(date.getMonth()===1){month='Feb'}
else if(date.getMonth()===2){month='mar'}
else if(date.getMonth()===3){month='Apr'}
else if(date.getMonth()===4){month='May'}
else if(date.getMonth()===5){month='Jun'}
else if(date.getMonth()===6){month='Jul'}
else if(date.getMonth()===7){month='Aug'}
else if(date.getMonth()===8){month='Sep'}
else if(date.getMonth()===9){month='Oct'}
else if(date.getMonth()===10){month='Nov'}
else{month='Dec'}
let fullDate=`${date.getDate()} ${month} ${date.getFullYear()}`;
setProgress(50)
const data = new FormData();
data.append("username", author);
data.append("title", title);
data.append("keyword", keyword);
data.append("date", fullDate);
let filesNew=file[0];

if(file.length===1){
    data.append('file', filesNew);
 
       let res = await fetch(`${process.env.REACT_APP_URL}/api/singleFile`, {
      method: "POST",
      body: data,
    });

setProgress(100)

setDisable(true)
if(res.status===500){
toast.error("Internal Server Error")
}
if(res.status===400){}
    if(res.status===201){
    toast.success('Successfully toasted!')
    setTimeout(()=>{
    
navigate('/')
    },1500)
}
 

    
    
 

}

else{
setProgress(60)
 for (let i = 0; i < file.length; i++) {
      data.append('file', file[i]);
    }


let res = await fetch(`${process.env.REACT_APP_URL}/api/MultiFile`, {
      method: "POST",
      body: data,
    });
    setDisable(true)
setProgress(100)
if(res.status===501){toast.error("Internal Server Error")}
if(res.status===400){}
    if(res.status===201){
    toast.success('Successfully toasted!')
    setTimeout(()=>{
    
navigate('/')
    },1500)
}
  
}

}
  return (
    <div className="App"> <LoadingBar
        color='#0477ba'
        height="5px"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <Toaster
  position="bottom-center"
  reverseOrder={false}
/>
    <Header />


    <div className="upload">
    
    <form encType='multipart-form-data'>
    
    <li>
    <h1>Author Name</h1>
    <input type="text" placeholder='Enter Author Full Name' value={author} onChange={(e)=>setAuthor(e.target.value)}/>
    {(author.length===0)?<p>Note-: Please Provide Author FullName for this Post </p> :""}
    </li>
   

    <li>
    <h1>Post Title</h1>
    <input type="text" placeholder='Enter Title of this Post'value={title} onChange={(e)=>setTitle(e.target.value)}/>
      {(title.length===0)?<p>Note-: Please Provide Title for this Post </p>:""}
    </li>

    
    <li>
    <h1>Post Keyword</h1>
    <input type="text" placeholder='Enter Keyword of this Post'value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
     {(keyword.length===0)?<p>Note-: Please Provide Keyword for this Post </p>:""}

    </li>
         <li>
    <h1>File Select</h1>
    <input type="file" placeholder='Enter Title of this Post' name="files"  onChange={(e) => setFiles(e)} multiple  />
    {(file===null)?<p>Note-: Please Select Files To Post</p>:""}


    </li>
{((author.length===0)||(title.length===0)||(keyword.length===0)||(file===null))? <button  id="dis">Upload Post</button> : <>
{(disable)? <button onClick={sendFile}>Upload Post</button>:<button  id="dis">Upload Post</button>}
</>
}
   
    </form>
    </div>
    
    
    </div>
  )
}
