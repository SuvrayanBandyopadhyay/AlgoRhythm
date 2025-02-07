import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

//Import router functionality
import { BrowserRouter,Routes,Route } from 'react-router-dom';

//Import pages
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Browse from './Pages/Browse';
import "./index.css"
import Signin from './Pages/Signin';

export default function App()
{
  return (
    <BrowserRouter>
      <Routes>
          <Route path = "/" element = {<Layout/>}>
            <Route index element = {<Home/>}/>
            <Route path = "/browse" element = {<Browse/>}/>
          </Route>

          <Route path ="/signin" element = {<Signin/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}


//Display
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)