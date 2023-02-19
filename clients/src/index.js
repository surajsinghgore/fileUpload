import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Upload from './Upload';
import { BrowserRouter, Routes, Route } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
 <BrowserRouter>
  <React.StrictMode>
    <Routes>
                    <Route exact path="/" element={<App />} />
                    <Route exact path="/upload" element={<Upload />} />
                   
                </Routes>
  </React.StrictMode></BrowserRouter>
</>
);


