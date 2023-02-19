import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
function App() {
const [data,setData]=useState([])
const get=async()=>{
let res = await fetch(`${process.env.REACT_APP_URL}/api/allFiles`);
let resData=await res.json();
if(res.status===200){
setData(resData.data)
console.log(data)
}
}
useEffect(()=>{

get()
// eslint-disable-next-line
},[])
  return (
    <div className="App">
<Header />



{/* image banner section */}
<div className="banner">
<div className="images">
<img src="hero.jpg" alt="hero not displayed" />
</div>
<div className="search">
<input type="search" name="search" placeholder="search" />
<button><i className="fa-solid fa-magnifying-glass"></i></button>
</div>

</div>




<div className="imagesAll">
<div className="top">
<div className="title">
<h2>Latest Photos</h2>

</div>
<div className="pages">
Page <input type="text" placeholder='1' /> of 200
</div>
</div>


<div className="imagesSection">

{(data.length!==0)? <>
{(data.map((item)=>{
return <div className="Imgcard" key={item._id}>
<div className="img">
<img src={`${process.env.REACT_APP_URL}/${item.fileLocal[0]}`} alt={item.liveUrl} />
<div className="hover">
<div className="keyword">
<h3>{item.keyword}</h3>
<div className="innerBg"></div>
</div>
<div className="outter">
</div>
</div>
</div>
<div className="deatils">
<div className="date">{item.date}</div>
<div className="author">{item.username}</div>
</div>


</div>
}))}
</>:""}



</div>


</div>
    </div>
  );
}

export default App;
