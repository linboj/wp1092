import React from "react";
import Button from './Button'
export default ({handleClickAdd,handleClickRemove,row_focus,col_focus,setFocusPosition}) => (
    <div className='header' onClick={()=>setFocusPosition(null,null)}>
        <span />
        <Button text='+' handleClick={()=>handleClickAdd(row_focus,col_focus)} />
        <Button text='-' handleClick={()=>handleClickRemove(row_focus,col_focus)} />
    </div>
)
