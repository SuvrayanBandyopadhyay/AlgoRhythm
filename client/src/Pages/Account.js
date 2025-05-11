import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import AccountInfo from "../Components/AccountInfo/AccountInfo";

export default function Account({darkMode})
{
    const {id}= useParams();//Get id from router parameter
    const [song,setSong] = useState(null); //Loading song
    //If we havent loaded song yet
 
   
    return(
        <AccountInfo darkMode={darkMode}></AccountInfo>
    );
    

}