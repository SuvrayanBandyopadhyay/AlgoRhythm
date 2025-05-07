import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import SongInfo from "../Components/SongInfo/SongInfo";

export default function Song({darkMode})
{
    const {id}= useParams();//Get id from router parameter
    const [song,setSong] = useState(null); //Loading song
    
    //Use an effect to fetch 
    useEffect(() => {
        async function getSongInfo()
        {
            const response = await fetch(`http://localhost:5000/song/${id}`);
            const data = await response.json()
            setSong(data.data)  
        }
        
        getSongInfo();
    },[id]);
    //If we havent loaded song yet
    if(!song)
    {
        return(<div>Loading</div>)
    }
    else
    {
        var audiosrc = "http://localhost:5000/"+song.audiofile.replace(/\\/g, "/");

        return(
            <SongInfo darkMode={darkMode}></SongInfo>
        );
    }

}