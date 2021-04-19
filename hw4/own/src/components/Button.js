import React from "react";
export default ({text,handleClick}) => (
    < button className='button' onClick={handleClick}>
        {text}
    </ button>
)