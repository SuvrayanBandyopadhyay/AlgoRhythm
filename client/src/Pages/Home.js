
import AudioCard from "../Components/AudioCard/AudioCard";
import Aimage from "./A.png";
import InfiniteSideScroll from "../Components/InfiniteSideScroll/InfiniteSideScroll";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

function Home() {
    const { setShowPlayer, setCurrentSong } = useOutletContext();
    const [playerVisible, setPlayerVisible] = useState(false);
    const { darkMode } = useOutletContext();

    const handleAudioCardClick = (song) => {
        setCurrentSong(song);
        setShowPlayer(true);
        setPlayerVisible(true);
    };




//Definition for the home page

  
    const centralText = 
    {

        height: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkMode ? "#121212" : "rgba(245, 245, 245, 1)",
    };
  
  const boldContainer = {
        display: "flex",
        justifyContent: "center",
        fontFamily: "Arial",
        fontWeight: "550",
        fontSize: "6vw",
    };
    

       

    


   

    //Text definitions
    const boldText1 =
    {
        color:"rgba(96, 0, 230, 1)",
    }
    
    const boldText2 =
    {
        color:darkMode ? "white" : "rgba(0, 0, 0, 1)",
        marginLeft:"2vw",
    }




    

    const subtitle1 = {
        marginTop: "5vh",
        marginLeft: "22vw",
        marginRight: "22vw",
        wordWrap: "break-word",
        textAlign: "Center",
        fontSize: "3vw",
        color:darkMode ? "rgba(200, 200, 200, 1)" : "rgba(117, 117, 117, 1)",
    };

    

    const subtitle2 = 
    {
        color: darkMode ? "rgba(200, 200, 200, 1)" :"rgba(117, 117, 117, 1)",
        fontSize:"2vw",
        marginLeft:"5vw",
        marginTop:"1vh",
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


    const trendingContainer = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginLeft: "2.5%",
        marginRight: "2.5%",
    };

    const trending = [
        { image: Aimage, text: "A song", artist: "Random" },
        { image: Aimage, text: "Another song", artist: "Unknown" },
        { image: Aimage, text: "Some song", artist: "Unknown" },
        { image: Aimage, text: "This is a song", artist: "Person" },
        { image: Aimage, text: "Is this a song", artist: "Random" },
        { image: Aimage, text: "something ", artist: "Random" },
        { image: Aimage, text: "song", artist: "Random" },
        { image: Aimage, text: "song", artist: "Random" },
    ];

    return (
        <div
            style={{
                marginBottom: playerVisible ? "100px" : "0px",
                transition: "margin-bottom 0.3s ease-in-out",
            }}
        >
            <div style={centralText}>
                <div style={boldContainer}>
                    <div style={boldText1}>AUDIO</div>
                    <div style={boldText2}>ANYWHERE</div>
                </div>
                <br />
                <div style={subtitle1}>
                    Seamlessly download, edit and share open source audio
                </div>
            </div>

            <div style={trendingText}>Trending</div>
            <div style={subtitle2}>Hear what others are jamming to</div>
            <InfiniteSideScroll />

            <div style={trendingContainer}>
                {trending.map((item, index) => (
                    <AudioCard
                        key={index}
                        info={item}
                        onClick={() => handleAudioCardClick(item)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
