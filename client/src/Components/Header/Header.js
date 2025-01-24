import React,{useState} from 'react';

function Header()
{

  //To check if we are hovering on sign-in button or not
  const [isSignInHover,setSignInHover] = useState("")
  //To check if we are hovering on register button or not
  const [isRegisterHover,setRegisterHover] = useState("")

 //The header style
 const headerStyle = 
 {
   //To set the position as sticky
   position: "sticky",
   
   //Setting background color
   backgroundColor:" rgba(47, 0, 255, 0.47)",

   //Padding and width
   paddingTop:"2.5%",
   paddingBottom:"2.5%",
   width: "100%",


   //Flex
   display: "flex",
   flexDirection: "row",
   justifyContent: "flex-end",
   alignItems: "center",

  
 };

 //The style of all the links
 const link=
 {
    textDecoration:'none',
    color:'black',
    marginRight:"2vw",
    marginLeft:"2vw",
    fontSize:"100%",
     
  
 };
 const signin =
 {
   backgroundColor:" rgba(148, 149, 255, 1)",
   marginRight:"0.5%",
   marginLeft:"2%",
   paddingLeft:"1%",
   paddingRight:"1%",
   paddingTop:"0.8%",
   paddingBottom:"0.8%",

   //Border
   borderStyle:"solid",
 
   borderColor:"rgba(118, 118, 118, 1)",
   borderWidth:"1px",
   boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 8px",
   //Scaling based on hover
   scale: isSignInHover? "1.1":"1.0"
 }
 
 const register =
 {
  //Background color
   backgroundColor:" rgba(96, 0, 230, 1)",

   //Positioning
   marginRight:"4%",
   marginLeft:"2%",
   paddingLeft:"1%",
   paddingRight:"1%",
   paddingTop:"0.8%",
   paddingBottom:"0.8%",

   //Font color
   color:"rgba(255,255,255,1)",

   //Border
   borderStyle:"solid",
 
   borderColor:"rgba(0, 0, 0, 1)",
   borderWidth:"1px",
   boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 8px",
   //Scaling based on hover
   scale: isRegisterHover? "1.1":"1.0"
 }
 

 //The component to be returned
 return (
   <>
   <header style = {headerStyle}>
     <div><a href = "/" style = {link}>Home</a></div>
     
     <div><a href = "/browse" style = {link}>Browse</a></div>
     
     <div><a href = "/upload" style = {link}>Upload</a></div>
     
     <div><a href = "/edit" style = {link}>Edit</a></div>
     
     <div style ={signin} 
     onMouseEnter={()=>setSignInHover(true)}
     onMouseLeave={()=>setSignInHover(false)}
     >
      Sign in
      
      </div>


      <div style ={register} 
     onMouseEnter={()=>setRegisterHover(true)}
     onMouseLeave={()=>setRegisterHover(false)}
     >
      Register
      
      </div>
   </header>

   </>  
 );

   
}

export default Header