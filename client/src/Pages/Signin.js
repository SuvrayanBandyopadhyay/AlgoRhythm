import SigninForm from '../Components/SigninForm/SigninForm'
import { useLocation } from "react-router-dom";
//This will be shown in all pages
export default function Signin({darkMode})
{   
    const styles = {
        container: {
            backgroundColor: darkMode ? '#121212' : '#f4f4f4',
            color: darkMode ? 'white' : 'grey',
        }
    };
    
    //Get failed status from query
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const failed = query.get("failed")=="true";


    return(
        <>
       
        {/*Additional content which changes from page to page*/}
        <div style={styles.container}>
            <SigninForm darkMode={darkMode} failed={failed}/>
        </div> 
        </>
    )
}

