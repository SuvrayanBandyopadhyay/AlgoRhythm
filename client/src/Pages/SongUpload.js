import { Outlet, Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

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

    return (
        <div style={styles.container}>
            <div style={styles.uploadBox}>
                <h2 style={styles.heading}>Upload Your Song</h2>
                <form 
                    action="http://localhost:5000/songupload" 
                    method="POST" 
                    encType="multipart/form-data"
                >
                    <input 
                        type="file" 
                        name="file" 
                        style={styles.fileInput}
                    />
                    <button 
                        type="submit" 
                        style={styles.uploadButton}
                        onMouseOver={(e) => e.target.style.background = styles.uploadButtonHover.background}
                        onMouseOut={(e) => e.target.style.background = styles.uploadButton.background}
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
}
