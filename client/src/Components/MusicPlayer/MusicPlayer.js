import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ song, position = "footer", playlist = [] }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState(song);

    const audioRef = useRef(new Audio());

    useEffect(() => {
        if (song) {
            const index = playlist.findIndex((s) => s.text === song.text);
            if (index !== -1) setCurrentIndex(index);
            setCurrentSong(song);
            audioRef.current.src = song.audioSrc;
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [song]);

    useEffect(() => {
        audioRef.current.volume = 0.8;
        return () => {
            audioRef.current.pause();
        };
    }, []);

    const togglePlayPause = () => {
        if (!currentSong) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const playNext = () => {
        const nextIndex = (currentIndex + 1) % playlist.length;
        const nextSong = playlist[nextIndex];
        setCurrentIndex(nextIndex);
        setCurrentSong(nextSong);
        audioRef.current.src = nextSong.audioSrc;
        audioRef.current.play();
        setIsPlaying(true);
    };

    const playPrevious = () => {
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        const prevSong = playlist[prevIndex];
        setCurrentIndex(prevIndex);
        setCurrentSong(prevSong);
        audioRef.current.src = prevSong.audioSrc;
        audioRef.current.play();
        setIsPlaying(true);
    };

    const style = {
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "15vh",
        backgroundColor: "#1e1e1e",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 1000,
        padding: "0 2vw",
        fontSize: "1.2rem"
    };

    const buttonStyle = {
        padding: "10px 15px",
        margin: "0 10px",
        fontSize: "1.2rem",
        backgroundColor: "#333",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    };

    return (
        <div style={style}>
            {currentSong ? (
                <>
                    <div>
                        🎵 Now Playing: <strong>{currentSong.text}</strong> by {currentSong.artist}
                    </div>
                    <div>
                        <button onClick={playPrevious} style={buttonStyle}>⏮ Prev</button>
                        <button onClick={togglePlayPause} style={buttonStyle}>
                            {isPlaying ? "⏸ Pause" : "▶️ Play"}
                        </button>
                        <button onClick={playNext} style={buttonStyle}>⏭ Next</button>
                    </div>
                </>
            ) : (
                <div>No song selected</div>
            )}
        </div>
    );
}
