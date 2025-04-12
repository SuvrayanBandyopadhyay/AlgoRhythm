import { text } from 'framer-motion/client';
import SigninForm from '../Components/SigninForm/SigninForm'
import {Outlet,Link} from 'react-router-dom'
//This will be shown in all pages
export default function Signin({darkMode})
{   
    const styles = {
        container: {
            backgroundColor: darkMode ? '#121212' : '#f4f4f4',
            color: darkMode ? 'white' : 'black',
        }
    };
    return(
        <>
       
        {/*Additional content which changes from page to page*/}
        <div style={styles.container}>
            <SigninForm darkMode={darkMode}/>
        </div> 
        </>
    )
}

