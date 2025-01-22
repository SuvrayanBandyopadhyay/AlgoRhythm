import React from 'react';

function Header()
{
    //The header style
    const headerStyle = 
    {
       
        position: "sticky",
      
        backgroundColor:" rgba(47, 0, 255, 0.47)",
        padding:"10px",
        top: "0px",
        width: "100%",
     
    };
    //The component to be returned
    return (
      <>
      <header style = {headerStyle}>
        <h1>This is a header</h1>
      </header>

      </>  
    );
}

export default Header