import React, { useState, useEffect }  from 'react';
import ReactDOM from 'react-dom/client';

//Import router functionality
import { BrowserRouter,Routes,Route } from 'react-router-dom';

//Import pages
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import "./index.css"
import Signin from './Pages/Signin';
import Register from './Pages/Register';
import SongUpload from './Pages/SongUpload';
import Search from './Pages/Search'

export default function App()
{
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' ? true : false;
  });

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
    localStorage.setItem('darkMode', darkMode); // persist
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
          <Route path = "/" element = {<Layout darkMode={darkMode} setDarkMode={setDarkMode}/>}>
            <Route index element = {<Home/>}/>
            <Route path='search' element = {<Search/>}/>
            <Route path="songupload" element={<SongUpload />}/>
          </Route>

          {/*Sign in and register */}
          <Route path ="/signin" element = {<Signin/>}></Route>
          <Route path ="/register" element = {<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}


//Display
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)