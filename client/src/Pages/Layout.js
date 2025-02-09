import Header from "../Components/Header/Header";
import { Outlet } from 'react-router-dom'

export default function Layout()
{
    return(
        <>
            <Header /> 
            <main style={{ paddingTop: "10vh" }}>
                <Outlet/>
            </main> 
        </>
    )
}

