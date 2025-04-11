import Header from "../Components/Header/Header";
import { Outlet } from 'react-router-dom';
import React, { useState } from "react";

export default function Layout()
{
    const [darkMode, setDarkMode] = useState(false);
    return(
        <>
            <Header darkMode={darkMode} setDarkMode={setDarkMode}/> 
            <main style={{ paddingTop: "10vh" }}>
                <Outlet context={{ darkMode }}/>
            </main> 
        </>
    )
}
