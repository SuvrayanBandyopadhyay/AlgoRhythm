//Definition for the home page
function Home()
{
    //For the bold text container
    const boldContainer =
    {
    
        marginTop:"25vh",
        display:"flex",
        justifyContent:"center",
        fontFamily:"Arial",
        fontWeight:"550",
        fontSize:"6vw",
    }

    //Text definitions
    const boldText1 =
    {
        color:"rgba(96, 0, 230, 1)",
        
        
    }
   
    
    const boldText2 =
    {
        color:"rgba(0, 0, 0, 1)",
        marginLeft:"2vw",
        
    }

    const subtitle1 = 
    {
        wordWrap:"break-word",
        textAlign:"Center",
        color:"rgba(117, 117, 117, 1)",
        fontSize:"3vw",
        marginTop:"3vh",

        marginLeft:"22vw",
        
        marginRight:"22vw",
    }

    return(
        <>
        <div style={boldContainer}>
            <div style = {boldText1}>
                AUDIO
            </div>
            <div style = {boldText2}>
                ANYWHERE
            </div>
        </div>

        <div style={subtitle1}>
            Seamlessly download, edit and share open source audio
        </div>
        </>
    )
}

export default Home