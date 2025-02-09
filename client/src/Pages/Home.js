import AudioCard from "../Components/AudioCard/AudioCard"
import Aimage from "./A.png"
import InfiniteSideScroll from "../Components/InfiniteSideScroll/InfiniteSideScroll"

//Definition for the home page
function Home()
{   
    const centralText = 
    {
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "rgba(245, 245, 245, 1)",
    }
    //For the bold text container
    const boldContainer =
    {
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
        marginTop:"5vh",
        marginLeft:"22vw",
        marginRight:"22vw",
        wordWrap:"break-word",
        textAlign:"Center",
        fontSize:"3vw",

        color:"rgba(117, 117, 117, 1)",
    }

    const subtitle2 = 
    {
        color:"rgba(117, 117, 117, 1)",
        fontSize:"2vw",
        marginLeft:"5vw",
        marginTop:"1vh",
    }


    //Text for the trending section
    const trendingText=
    {
        fontFamily:"Arial",
        color:"black",
        
        marginLeft:"5vw",
        fontSize:"2vw",
        marginTop:"8vh",
        fontWeight:"100",
    }

    //Container for trending songs
    const trendingContainer =
    {
        display: "flex",
        flexDirection: "row",
        flexWrap:"wrap",
        marginLeft:"2.5%",
        marginRight:"2.5%"
    }

    const MovieCard = {
        width: "200px",
        height: "100px",
        backgroundColor: "green",
        marginTop: "100px",
        marginLeft: "100px"
    } 


    {/*To be loaded from the database*/}
    const trending = [
        {image:Aimage,text:"A song",artist:"Random"},
        {image:Aimage,text:"Another song",artist:"Unknown"},
        {image:Aimage,text:"Some song",artist:"Unknown"},
        {image:Aimage,text:"This is a song",artist:"Person"},
        {image:Aimage,text:"Is this a song",artist:"Random"},
        {image:Aimage,text:"something ",artist:"Random"},
        {image:Aimage,text:"song",artist:"Random"},
        {image:Aimage,text:"song",artist:"Random"},
    ]

    return(
        <>
        {/*The central decorative text */}
        <div style = {centralText}>
            {/* The starting text in the middle */}
            <div style={boldContainer}>
                <div style = {boldText1}>
                    AUDIO
                </div>
                <div style = {boldText2}>
                    ANYWHERE
                </div>
            </div>
            <br/>

            <div style={subtitle1}>
                Seamlessly download, edit and share open source audio
            </div>
        </div>
            
        {/*The trending page*/}
        <div style = {trendingText}>
            Trending 
        </div>
        <div style = {subtitle2}>
            Hear what others are jamming to
        </div>
        <InfiniteSideScroll/>
        
        {/*Print trending*/}
        <div style ={trendingContainer}>
            {trending.map((item)=><AudioCard info = {item}/>)}
        </div>
        </>
    )
}

export default Home
