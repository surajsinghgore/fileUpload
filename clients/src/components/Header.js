import React from 'react'


import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <header>
<div className="left">PRP WEBSITE</div>
<div className="right">
<li><Link to="/">Photos</Link></li>
<li>Videos</li>
<li>About</li>
<li><Link to="/upload">Upload</Link></li>
</div>
</header>
  )
}
