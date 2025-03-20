import SigninForm from '../Components/SigninForm/SigninForm'
import {Outlet,Link} from 'react-router-dom'
//This will be shown in all pages
export default function Signin()
{
    return(
        <>
       
        {/*Additional content which changes from page to page*/}
        <div>
        <SigninForm/>
        </div> 
        </>
    )
}

