import { color } from 'framer-motion';
import React,{useState} from 'react';


function SigninForm({ darkMode})
{

    const container = 
    {
        display: "flex",
        height:"100vh",
        backgroundColor: darkMode ? "#121212" : "white",
        color: darkMode ? "white" : "black"
    }
    //Left design

    const leftDesign = {
        background: " rgba(157, 135, 255, 1)",
        width: "40%",
        minWidth: "250px",
    };
    //Signin text
    const signInText=
    {
        fontFamily:"Arial",
        fontSize:"400%",
        display:"flex",
        marginTop:"45vh",
        justifyContent:"Center",
        fontWeight:"Bold",
        color: darkMode ? "black" : "black"

        //Font outline
        
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

    //Field formatting
    const field ={
        marginTop:"1%",
        width:"80%",
        height: "30px",
        
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
    <div style = {container}>
    <div style = {leftDesign}>
        <div style = {signInText}>
        SIGN IN
        </div>
    </div>
    <div style = {formContainer}>
    <div style={form}>
    
        <form action="http://localhost:5000/signincheck" method="POST">
            <div style={inputContainer} >
                <label style={label}>Username </label>
                <br/>
                <input type="text" name="uname" required style={field}/>
            </div>
            <div style={inputContainer}>
                <label style={label}>Password  </label>
                <br/>
                <input type="password" name="pass" required style={field}/>
            </div>
       
            <div className="button-container">
                <input type="submit"  style={submit}/>
            </div>
        </form>
        {/*Failed login check*/}
        {failed ? <div style={error}>Incorrect Username or Password</div>:<></>}
    </div>
    </div>
    
    </div>
    
    
    
    </>)

}

export default SigninForm