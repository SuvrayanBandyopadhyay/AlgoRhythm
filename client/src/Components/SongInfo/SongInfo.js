import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";

export default function SongInfo({ darkMode})
{
    const {id}= useParams();//Get id from router parameter
    const [song,setSong] = useState(null); //Loading song
    
    //CSS
    //Form container
        const Overlay = 
        {
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:"60%",
            minWidth:"300px"
        }
    
        //Overall form properties
        const desc=
        {
    
            display: "block",
            background: darkMode ? "#333333" : "rgb(245, 245, 245)",
            padding: "5%",
            width: "80%", // Relative width for better scaling
            maxWidth: "400px", // Prevents it from getting too big
            borderRadius: "5%",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            minWidth: "250px",
            color: darkMode ? "white" : "black"
    
    
        }
        //Each input box
        const container=
        {
            paddingTop:"4%",
            paddingBottom:"4%",
        }
        
        //Label formatting
        const label =
        {
            fontSize:"2vw",
            color:darkMode ? "rgba(173, 144, 255, 1)" : "rgba(96, 0, 230, 1)",
            fontWeight:"bold",
            fontFamily:"Arial"
        }
    
        //Filename formatting
        const Text=
        {
            fontSize:"1.5vw",
            display:"flex",
            alignItems:"center",
            paddingTop:"1.5%",
            paddingLeft:"1%"
           
        }
        //Image formatting
        const imageStyle=
        {
          
            marginLeft:'10%',
            width:'15vw',
            height:'15vw',
            objectFit:'fill',
        }
    

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
        return(<div>{id}</div>)
    }
    else
    {
        var audiosrc = "http://localhost:5000/"+song.audiofile.replace(/\\/g, "/");


        var img = "/defaultImage.png"
        if(song.imagefile)
        {
        var imgsrc = "http://localhost:5000/"+song.imagefile.replace(/\\/g, "/");
        }
        
        var title = song.title
        var user = song.username
        var date = song.upload_timestamp.split('T')[0]
        /*return(
            <div>{song.title}
            <br></br>
            <audio controls src={audiosrc}></audio>

            </div>
        );*/
    return(  
     
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "8%",
        gap: "5%",
        flexWrap: "wrap" // optional: allows responsiveness
    }}>
    <img style={imageStyle} src={imgsrc} alt = "Image"></img>
    
    <div style = {Overlay}>
    {/*Form*/}
    <div style={desc}>

            {/*Title*/}
            <div style={container} >
                <label style={label}>Title </label>
                <div style={Text}>{title}</div>
            </div>
            
            {/*Uploaded by*/}
            <div style={container}>
                <label style={label}>Uploaded by</label>
                <div style={Text}>{user}</div>
            </div>

            {/*Date*/}
            <div style={container}>
                <label style={label}>Uploaded on</label>
                <div style={Text}>{date}</div>
            </div>

            <div style={container}>
                <label style={label}>Play</label>
                <br></br>
                <audio controls src={audiosrc}></audio>
            </div>

            
       
    </div>
    </div>
    </div>
    
    )
    }

}

