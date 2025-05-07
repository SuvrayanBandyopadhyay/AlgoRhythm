import React,{useState,useEffect} from 'react';
import SearchBar from './SearchBar';

function Header({ darkMode, setDarkMode })
{

  
  //To check if we are hovering on sign-in button or not
  const [isSignInHover,setSignInHover] = useState("")
  //To check if we are hovering on register button or not
  const [isRegisterHover,setRegisterHover] = useState("")

   // Toggle handler
   const toggleDarkMode = () => setDarkMode(!darkMode);

 //The header style
  const headerStyle = 
  {
    //To set the position as sticky
    position: "fixed",
    top:"0",
   
    //Setting background color
    backgroundColor:  "rgba(157, 135, 255, 1)",

    //Padding and width
    width: "100vw",
    height: "10vh",

    //Flex
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    //Font family
    fontFamily:"Arial",

    zIndex:"999",
    color:  "black",
  };

  //The style of all the links
  const link=
  {
    textDecoration:'none',
    color:  'black',
    marginRight:"2vw",
    marginLeft:"2vw",
    fontSize:"120%",
  };
  const signin =
  {
  
    backgroundColor:  " rgba(148, 149, 255, 1)",
    marginRight:"0.5vw",
    marginLeft:"2vw",
    paddingLeft:"1.25vw",
    paddingRight:"1.25vw",
    paddingTop:"1.25vh",
    paddingBottom:"1.25vh",

    //Border
    borderStyle:"solid",
 
    //Font
    textDecoration:'none',
    color:  'black',
    fontSize:"120%",  

    borderColor:"rgba(118, 118, 118, 1)",
    borderWidth:"1px",
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 8px",
    //Scaling based on hover
    scale: isSignInHover? "1.1":"1.0",
    transition: "transform 0.2s ease",
  }
 
  const register =
  {
    //Background color
    backgroundColor: " rgba(96, 0, 230, 1)",

    //Positioning
    marginRight:"vw",
    marginLeft:"2vw",
    paddingLeft:"1.25vw",
    paddingRight:"1.25vw",
    paddingTop:"1.25vh",
    paddingBottom:"1.25vh",

    //Font 
    color:"rgba(255,255,255,1)",
    textDecoration:'none',
    fontSize:"120%", 
    
    //Border
    borderStyle:"solid",
 
    borderColor:"rgba(0, 0, 0, 1)",
    borderWidth:"1px",
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 8px",
    //Scaling based on hover
    scale: isRegisterHover? "1.1":"1.0",
    transition: "transform 0.2s ease",
  }

  const toggleButtonStyle = {
    marginTop: "20vh",
    marginRight: "2vw",
    marginLeft: "2vw", // optional: matches spacing of Sign in
    paddingLeft: "0.5vw",
    paddingRight: "0.5vw",
    paddingTop: "0.5vh",
    paddingBottom: "0.5vh",
    fontSize: "120%",
    color:  "#000",
    borderStyle: "solid",
    borderColor: "rgba(118, 118, 118, 1)", // Match sign-in
    borderWidth: "1px",
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 8px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }

  const [isHoveringDarkMode, setIsHoveringDarkMode] = useState(false);
  //Whether user has signed in or not
  const[signedIn,setSignedIn] = useState(false);
  useEffect(()=>
    {
      fetch("http://localhost:5000/auth/check",{method:"GET",credentials:"include"}).then(res=>res.json()).then(data=>{setSignedIn(data.authenitcated)})
    })


  //The component to be returned
  return (
    <>
    <header style = {headerStyle}>
      <SearchBar></SearchBar>

      <div><a href = "/" style = {link}>Home</a></div>
     
      <div><a href = "/browse" style = {link}>Browse</a></div>
     
      <div><a href = "/songupload" style = {link}>Upload</a></div>
     
      <div><a href = "/edit" style = {link}>Edit</a></div>


      {/*sign in and register*/}
      {!signedIn &&(
      <a href  = "/signin" style = {{textDecoration:"none"}}>
        <div
        style ={signin} 
        onMouseEnter={()=>setSignInHover(true)}
        onMouseLeave={()=>setSignInHover(false)}
        >
          Sign in
        </div>
      </a>
      )}

      {!signedIn&&(
      <a href  = "/register" style = {{textDecoration:"none"}}>
        <div
        style ={register} 
        onMouseEnter={()=>setRegisterHover(true)}
        onMouseLeave={()=>setRegisterHover(false)}
        >
          Register
        </div>
      </a>
      )}

      {/*Signout*/}
      {signedIn &&(
      <a href  = "http://localhost:5000/signout" style = {{textDecoration:"none"}}>
        <div
        style ={signin} 
        onMouseEnter={()=>setSignInHover(true)}
        onMouseLeave={()=>setSignInHover(false)}
        >
          Sign Out
        </div>
      </a>
      )}

      
      {/* Dark Mode Toggle */}
      <button onClick={toggleDarkMode} style={{
        ...toggleButtonStyle,
        transform: isHoveringDarkMode ? "scale(1.1)" : "scale(1.0)"
      }}
      onMouseEnter={() => setIsHoveringDarkMode(true)}
      onMouseLeave={() => setIsHoveringDarkMode(false)}
      >
      <img
      src="/icons/bulb.png"
      alt="Toggle Dark Mode"
      style={{
        width: "4vh",
        height: "4vh",
        pointerEvents: "none"
      }}
    />
          
      </button>
    
    </header>

   
    


  
   </>  
 );

   
}

export default Header