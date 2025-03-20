import React from 'react';
import './SongList.css';

export default function SongList(props) {
    return (
        <div className="song-list">
            {props.list.map((song) => (
                <div key={song.id} className="song-item">
                    <img 
                        src={`http://localhost:5000/covers/${song.id}.jpg`} 
                        alt={song.title}
                        className="cover-image"
                    />
                    <div className="song-info">
                        <div className="song-text">
                            <span className="song-title">{song.title}</span>
                            <span className="song-username">Uploaded by {song.username}</span>
                        </div>
                        <span className="song-duration">{song.duration.slice(3)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
