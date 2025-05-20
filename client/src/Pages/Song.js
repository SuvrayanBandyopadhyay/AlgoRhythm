import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import SongInfo from "../Components/SongInfo/SongInfo";
import CommentBox from "../Components/CommentSection/CommentBox";
import CommentSection from "../Components/CommentSection/CommentSection";

export default function Song({darkMode})
{
    const {id}= useParams();//Get id from router parameter
    const [song,setSong] = useState(null); //Loading song
    
  
    return(
        <>
        <SongInfo darkMode={darkMode}></SongInfo>
        <div style={{height:"200px"}}></div>
        <CommentBox darkMode={darkMode}></CommentBox>
        <CommentSection></CommentSection>
       
        </>
    );

}