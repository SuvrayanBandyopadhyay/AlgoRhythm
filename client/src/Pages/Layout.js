import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import MusicPlayer from "../Components/MusicPlayer/MusicPlayer";

export default function Layout() {
    const [showPlayer, setShowPlayer] = useState(false);
    const [currentSong, setCurrentSong] = useState(null); // store selected song

    return (
        <>
            <Header />
            <main style={{ paddingTop: "10vh", paddingBottom: "10vh" }}>
                <Outlet context={{ showPlayer, setShowPlayer, currentSong, setCurrentSong }} />
            </main>
            {showPlayer && <MusicPlayer song={currentSong} position="footer" />}
        </>
    );
}
