import React from "react";
export default ({text,handleClick}) => (
    < button className='button' onMouseDown={handleClick}>
        {text}
    </ button>
)