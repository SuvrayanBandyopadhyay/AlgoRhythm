import { color, startOptimizedAppearAnimation } from 'framer-motion';
import React,{useState} from 'react';


function UploadForm({ darkMode})
{
    const [filename1,setFileName1] = useState("No File Chosen")
    const [filename2,setFileName2] = useState("No File Chosen")
    const [image,setImage]= useState("/defaultImage.png");

    //A function to handle image change
    const handleImageChange = (e) => {
        
        setFileName1(e.target.files[0]?.name || "No File Chosen")
        const file = e.target.files[0];
        if(file)
        {
            setImage(URL.createObjectURL(file))
        }
        else
        {
            setImage("/defaultImage.png")
        }
    }


    //Form container
    const formContainer = 
    {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"60%",
        minWidth:"300px"
    }

    //Overall form properties
    const form=
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
    const inputContainer=
    {
        paddingTop:"8%",
        paddingBottom:"4%",
    }
    
    //Label formatting
    const label =
    {
        color:darkMode ? "rgba(173, 144, 255, 1)" : "rgba(96, 0, 230, 1)",
        fontWeight:"bold",
        fontFamily:"Arial"
    }

    //Filename formatting
    const fileText=
    {
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

    //Field formatting
    const field ={
        marginTop:"1%",
        width:"80%",
        height: "30px",display: "flex",  justifyContent: "center",  alignItems: "center",
        
        border: "1px solid rgba(0, 0, 0, 0.2)",
        backgroundColor: darkMode ? "#2a2a2a" : "white",
        color: darkMode ? "white" : "black"
    }
    
    //The submit button
    const submit = {
        marginTop: "10px",
        cursor: "pointer",
        fontSize: "100%",
        background: " rgba(96, 0, 230, 1)",
        border: "1px solid rgba(96, 0, 230, 1)",
        color: "#fff",
        padding: "3% 3%",
        paddingBottom:"3%",
        marginBottom:"5%"
    
    }

    //The submit button
    const error = {
        color:"rgba(255,0,0,1)",
        fontWeight:"bold"
    }
    
    const params = new URLSearchParams(window.location.search);
    const failed = params.get("failed") == "true"//Strict equality check;

    return(
    <>
    {/*Display Image*/}
    {image && (
      
        <img style={imageStyle} src={image} alt = "Image"></img>
        
    )}
        
    <div style = {formContainer}>
    {/*Form*/}
    <div style={form}>
        
        <form action="http://localhost:5000/songupload" method="POST" encType="multipart/form-data">
            {/*Title*/}
            <div style={inputContainer} >
                <label style={label}>Title </label>
                <br/>
                <input type="text" name="title" required style={field}/>
            </div>
            
            {/*Image*/}
            <div style={inputContainer}>
            <label style={label}>Display Image</label>
            <br/>
            <label style={{ ...field, display: 'inline-block', cursor: 'pointer' }}>
                <input 
                type="file" 
                accept="image/*"
                name="imageFile" 
                onChange={handleImageChange} 
                style={{display:'none'}}/>
            <div style={fileText}>{filename1}</div>
            </label>
            </div>

            {/*Filename*/}
            <div style={inputContainer}>
            <label style={label}>File </label>
            <br/>
            <label style={{ ...field, display: 'inline-block', cursor: 'pointer' }}>
                <input 
                type="file" 
                accept="audio/*"
                name="audioFile" 
                required 
                onChange={(e) => setFileName2(e.target.files[0]?.name || "No File Chosen")} 
                style={{display:'none'}}/>
            <div style={fileText}>{filename2}</div>
            </label>
            </div>


            <div className="button-container">
                <input type="submit"  style={submit}/>
            </div>        
        </form>
        {/*Failed login check*/}
        {filename2=="No File Chosen"?<div style={error}>Enter Filename</div>:<></>}
        {failed ? <div style={error}>Invalid Title or Path</div>:<></>}
    </div>
    </div>
 
    
    </>)

}

export default UploadForm