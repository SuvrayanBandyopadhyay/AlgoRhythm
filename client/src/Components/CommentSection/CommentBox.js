import { Form, useParams } from "react-router-dom";
import { useEffect,useState } from "react";


export default function CommentBox({darkMode})
{
    const {id}= useParams();//Get id from router parameter

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Get form data
        const formData = new FormData(e.target);
        try {
            // Send the data using fetch or axios
            const response = await fetch("http://localhost:5000/comment_in", {
                method: "POST",
                body: formData,
            });

            // Handle the response as needed
            const data = await response.json();
            console.log(data);

            // Clear the form or show success message
            e.target.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }
    const formStyle = {
    padding: "10px",
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: "15px", // Adds space between form elements
    }

const boxStyle = {
    width: "100%",
    minHeight: "100px", // Use minHeight instead of innerHeight
    fontSize: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "0", // Sharp edges
    boxSizing: "border-box",
    resize: "vertical", // Allows vertical resizing only
}

const buttonStyle = {
    backgroundColor: "#0066ff", // Blue color
    color: "white",
    border: "none",
    borderRadius: "0", // Sharp edges
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    alignSelf: "flex-end", // Aligns the button to the right
    marginTop: "10px",
}

    return (
        <div style={{ 
            display: "flex",
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center",
            }} >
        <div style={{ 
            display: "flex",
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center",
            width: "70%"
            }}>     
            <h2 style={{alignSelf: "flex-start",color:darkMode ? "rgba(173, 144, 255, 1)" : "rgba(96, 0, 230, 1)"}}>Comments</h2>
            <hr style={{width:"15%",alignSelf: "flex-start"}}></hr>
            <form style={formStyle} onSubmit={handleSubmit}>
                <input type="hidden" name="songId" value={id} />
                <textarea name="comment" style={boxStyle}/>
                <button type="submit" style={buttonStyle}>POST</button>
            </form>
        </div>
        </div>

    );
}



