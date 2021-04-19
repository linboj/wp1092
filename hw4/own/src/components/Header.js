import React from "react";
import Button from './Button'
export default ({handleClickAdd,handleClickRemove,row_focus,col_focus}) => (
    <div className='header'>
        <span />
        <Button text='+' handleClick={(row_focus,col_focus)=>handleClickAdd(row_focus,col_focus)} />
        <Button text='-' handleClick={(row_focus,col_focus)=>handleClickRemove(row_focus,col_focus)} />
    </div>
)
