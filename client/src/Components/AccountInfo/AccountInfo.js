import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { view } from "framer-motion";
import InfiniteSideScrollAccount from "../InfiniteSideScroll/InfiniteSideScrollAccount";

export default function AccountInfo({ darkMode})
{
    const {id}= useParams();//Get id from router parameter
    const [account,setAccount] = useState(null); //Loading song
    
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
            paddingTop:"2%",
            paddingBottom:"2%",
        }
        
        //Label formatting
        const label =
        {
            fontSize:"2vw",
            color:darkMode ? "rgba(173, 144, 255, 1)" : "rgba(96, 0, 230, 1)",
            fontWeight:"bold",
            fontFamily:"Arial"
        }

        const label2 =
        {
            fontSize:"2.5vw",
            textAlign:"center",
            color:darkMode ? "rgba(173, 144, 255, 1)" : "rgba(96, 0, 230, 1)",
            fontWeight:"bold",
            fontFamily:"Arial",
            leftPadding:"1vw"
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
      

        //Text for the trending section
        const trendingText=
        {
            fontFamily:"Arial",
            color:darkMode ? "white" : "black",
            
            marginLeft:"5vw",
            fontSize:"2vw",
            marginTop:"8vh",
            fontWeight:"100",
        }   
    //Use an effect to fetch 
    useEffect(() => {
        async function getAccountInfo()
        {
            const response = await fetch(`http://localhost:5000/account/${id}`);
            const data = await response.json()
            setAccount(data.data)  
        }
        
        getAccountInfo();
    },[id]);
    //If we havent loaded song yet
    if(!account)
    {
        return(<div>Loading</div>)
    }
    else
    {
        let username = account.username;
        let email = account.email;
        let date = account.create_timestamp.split('T')[0];
        let uploads = account.number;
        let id = account.id;
    return(  
     <>
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "8%",
        gap: "5%",
        flexWrap: "wrap" 
    }}>
   
    <div style = {Overlay}>
        
    {/*Form*/}
    <div style={desc}>
            <div style={container} >  
                <label style={label2}>Account Information</label>
            </div>
            

            {/*Name*/}
            <div style={container} >
                
                <label style={label}>Name </label>
                <div style={Text}>{username}</div>
            </div>
            
            {/*Email*/}
            <div style={container}>
                <label style={label}>Email</label>
                <div style={Text}>{email}</div>
            </div>

            {/*Joined on*/}
            <div style={container}>
                <label style={label}>Joined on</label>
                <div style={Text}>{date}</div>
            </div>

            {/*Uploads*/}
            <div style={container}>
                <label style={label}>Files uploaded</label>
                <div style={Text}>{uploads}</div>
            </div>
            
            
    </div>
    </div>
    
    
    </div>

    <div>
        <div style={trendingText}>Uploaded Audio</div>
        <InfiniteSideScrollAccount user_id={id}></InfiniteSideScrollAccount>
    </div>
    </>
    )
    }

}
