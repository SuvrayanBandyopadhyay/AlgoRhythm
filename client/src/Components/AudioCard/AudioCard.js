import React, { useState } from 'react';

function AudioCard(props) {
    const [hover, setHover] = useState(false);  // Changed to boolean

    const card = {
        borderRadius: "2.5vh",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        width: "20%",
        height: "15%",
        maxHeight: "40vh",
        minWidth: "10vh",
        marginTop: "10vh",
        paddingBottom: "2.5%",
        marginRight: "2.5%",
        marginLeft: "2.5%",
        transform: hover ? "scale(1.05)" : "scale(1.0)",
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer"
    };

    const cardImage = {
        width: "100%",
        height: "30vh",
    };

    const cardName = {
        color: "Black",
        fontSize: "200%",
        textAlign: "center",
        fontFamily: "Arial"
    };

    const cardArtist = {
        color: "rgba(117, 117, 117, 1)",
        fontSize: "100%",
        textAlign: "center",
        fontFamily: "Arial",
        marginTop: "1vh"
    };

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