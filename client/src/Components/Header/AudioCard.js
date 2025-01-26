import React,{useState} from 'react';


function AudioCard(props)
{
    const [hover,setHover]= useState("")
    const card=
    {
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        width:"20%",
        height:"15%",
        maxHeight:"40vh",
        marginTop:"5vh",
        paddingBottom:"2.5%",
        marginRight:"2.5%",
        marginLeft:"2.5%",

        scale: hover? "1.05":"1.0"
    }

    const cardImage=
    {
        width:"100%",
        height:"30vh",

    }

    const cardName = 
    {
        color:"Black",
        fontSize:"200%",
        textAlign:"center",
        fontFamily:"Arial"

    }

    const cardArtist = 
    {

        color:"rgba(117, 117, 117, 1)",
        fontSize:"100%",
        textAlign:"center",
        fontFamily:"Arial",
        marginTop:"1vh"
    }
    return(
    <>
        <div style = {card}
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
        >
            <img src = {props.info.image} alt = "IMAGE NOT FOUND" style={cardImage}>
            </img>

            <div style = {cardName}>
            {props.info.text}
            </div>
            
            <div style = {cardArtist}>
            {props.info.artist}
            </div>
        </div>
    </>)

}

export default AudioCard