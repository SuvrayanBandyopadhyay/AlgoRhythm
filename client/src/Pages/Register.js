import RegisterForm from '../Components/RegisterForm/RegisterForm'
import {Outlet,Link} from 'react-router-dom'
//This will be shown in all pages
export default function Register()
{
    return(
        <>
       
        {/*Additional content which changes from page to page*/}
        <div>
        <RegisterForm/>
        </div> 
        </>
    )
}
