import Header from "../Components/Header/Header";
import {Outlet,Link} from 'react-router-dom'
//This will be shown in all pages
export default function Layout()
{
    return(
        <>
        <Header/> 
       
        <Outlet/> 
        </>
    )
}

