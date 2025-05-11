import React from 'react';
import './SongList.css';

export default function SongList(props) {
    return (
        <div className="song-list">
            {props.list.map((song) => {
                var imagePath = "a"
                if(song.imagefile)
                {
                    imagePath = "http://localhost:5000/"+song.imagefile.replace(/\\/g, "/");
                }
                else
                {
                    imagePath= "/defaultImage.png"
                }
                var redirect = `/song/${song.id}`
                return (
                    <>
                    <a href={redirect} style={{textDecoration:'none'}}>
                    <div key={song.id} className="song-item">
                        <img 
                            src={imagePath} 
                            alt={song.title}
                            className="cover-image"
                        />
                        <div className="song-info">
                            <div className="song-text">
                                <span className="song-title">{song.title}</span>
                                <span className="song-username">Uploaded by {song.username}</span>
                            </div>
                        </div>
                    </div>
                    </a>
                    </>
                );
            })}
        </div>
    );
}
