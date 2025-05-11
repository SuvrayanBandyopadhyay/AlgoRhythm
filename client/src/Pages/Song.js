import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import SongInfo from "../Components/SongInfo/SongInfo";

export default function Song({darkMode})
{
    const {id}= useParams();//Get id from router parameter
    const [song,setSong] = useState(null); //Loading song
    
  
    return(
        <SongInfo darkMode={darkMode}></SongInfo>
    );

}