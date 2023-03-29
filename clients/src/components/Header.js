import {useEffect, useState} from 'react'
import LoadingBar from 'react-top-loading-bar'
import { useLocation,Link } from 'react-router-dom'
export default function Header() {
let location = useLocation();
  const [progress, setProgress] = useState(0);

useEffect(()=>{
setProgress(50);
setTimeout(()=>{
setProgress(100)
},800)
},[location.pathname])

  return (
    <header>
    <LoadingBar
        color='#0477ba'
        height="5px"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
<div className="left"><Link to="/">PRP WEBSITE</Link></div>
<div className="right">
<li><Link to="/">Photos</Link></li>
<li>Videos</li>
<li>PDFs</li>
<li><Link to="/">Others</Link></li>
<li><Link to="/upload">Upload</Link></li>
</div>
</header>
  )
}
