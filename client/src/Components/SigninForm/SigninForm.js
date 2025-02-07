import React,{useState} from 'react';


function SigninForm()
{
    const [user,setUser]= useState("")
    

    const container = 
    {
        display: "flex",
        height:"100vh"

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
        background: "rgb(245, 245, 245)",
        padding: "5%",
        width: "80%", // Relative width for better scaling
        maxWidth: "400px", // Prevents it from getting too big
        borderRadius: "5%",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        minWidth: "250px",


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
        color:"rgba(96, 0, 230, 1)",
        fontWeight:"bold",
        fontFamily:"Arial"
    }

    //Field formatting
    const field ={
        marginTop:"1%",
        width:"80%",
        height: "30px",
        
        border: "1px solid rgba(0, 0, 0, 0.2)"
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
    </div>
    </div>
    </div>
    
        
    
    </>)

}

export default SigninForm