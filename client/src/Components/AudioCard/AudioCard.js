import React, { useState } from 'react';

function AudioCard(props) {
    const { info, onClick, darkMode } = props;
    const [hover, setHover] = useState(false);  // Changed to boolean

    const card = {
        borderRadius: "2.5vh",
        boxShadow: darkMode ? "rgba(255, 255, 255, 0.1) 0px 7px 29px 0px" : "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        width: "20%",
        height: "15%",
        maxHeight: "40vh",
        minWidth: "10vh",
        marginTop: "10vh",
        paddingBottom: "2.5%",
        marginRight: "2.5%",
        marginLeft: "2.5%",
        backgroundColor: darkMode ? "#1c1c1c" : "#fff",
        transform: hover ? "scale(1.05)" : "scale(1.0)",
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer",
        position: "relative"
    };

    const cardImage = {
        width: "100%",
        height: "30vh",
        objectFit: "cover",
        borderTopLeftRadius: "2.5vh",
        borderTopRightRadius: "2.5vh"
    };

    const cardName = {
        color: darkMode ? "white" : "black",
        fontSize: "200%",
        textAlign: "center",
        fontFamily: "Arial"
    };

    const cardArtist = {
        color: darkMode ? "rgba(200,200,200,1)" : "rgba(117, 117, 117, 1)",
        fontSize: "100%",
        textAlign: "center",
        fontFamily: "Arial",
        marginTop: "1vh"
    };

    const lightStyle = (color) => ({
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: color,
        position: "absolute",
        top: "8px",
        right: color === "red" ? "30px" : "10px",
        boxShadow: `0 0 8px ${color}`,
    });

    return (
        <div
            style={card}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={props.onClick} // Accept onClick as prop
        >
            <img
                src={props.info.image}
                alt="IMAGE NOT FOUND"
                style={cardImage}
            />

            <div style={cardName}>
                {props.info.text}
            </div>

            <div style={cardArtist}>
                {props.info.artist}
            </div>
        </div>
    );
}

export default AudioCard;