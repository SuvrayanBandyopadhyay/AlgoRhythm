import RegisterForm from '../Components/RegisterForm/RegisterForm'
import {Outlet,Link} from 'react-router-dom'
//This will be shown in all pages
export default function Register({darkMode})
{
    const styles = {
        container: {
            backgroundColor: darkMode ? '#121212' : '#f4f4f4',
            color: darkMode ? 'white' : 'black',
            minHeight: '100vh',
        }
    };

    return(
        <>
       
        {/*Additional content which changes from page to page*/}
        <div style={styles.container}>
            <RegisterForm darkMode={darkMode}/>
        </div> 
        </>
    )
}
