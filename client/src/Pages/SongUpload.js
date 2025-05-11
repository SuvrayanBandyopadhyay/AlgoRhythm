import { Outlet, Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useState,useEffect } from 'react';
import UploadForm from '../Components/UploadForm/UploadForm';

export default function SongUpload() {
    const { darkMode } = useOutletContext();
    const [fileName, setFileName] = useState("No file chosen");
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: '10px',
            backgroundColor: darkMode ? '#121212' : '#f4f4f4'
        },
        uploadBox: {
            background:darkMode ? '#1e1e1e' : 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            width: '300px'
        },
        heading: {
            fontSize: '1.5rem',
            color: darkMode ? 'white' : '#333',
            marginBottom: '15px'
        },
        fileInput: {
            width: '90%',
            padding: '10px',
            marginBottom: '15px',
            border: `1px solid ${darkMode ? '#666' : '#ccc'}`,
            borderRadius: '5px',
            backgroundColor: darkMode ? '#2c2c2c' : 'white',
            color: darkMode ? 'white' : 'black'
        },
        fileNameText: {
            marginBottom: '15px',
            color: darkMode ? '#fff' : '#555',
            fontSize: '0.9rem',
            wordBreak: 'break-word'
        },
        uploadButton: {
            width: '100%',
            background: '#007bff',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
        },
        uploadButtonHover: {
            background: '#0056b3'
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if(params.get("failed")==="true")
        {
          alert("Incorrect Parameters");  
        }
        },[]);
    return (
        <div style={styles.container}>
            <UploadForm darkMode={darkMode}/>
        </div> 
    );
}
