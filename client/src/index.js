import React from 'react';
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


export default function App()
{
  return (
    <BrowserRouter>
      <Routes>
          <Route path = "/" element = {<Layout/>}>
            <Route index element = {<Home/>}/>
          </Route>

          {/*Sign in and register */}
          <Route path ="/signin" element = {<Signin/>}></Route>
          <Route path ="/register" element = {<Register/>}></Route>
          <Route path ="/songupload" element = {<SongUpload/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}


//Display
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)