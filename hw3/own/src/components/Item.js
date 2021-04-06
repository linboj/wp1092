import React from "react";
export default ({text,idx,onclick_checkbox,onclick_x}) => (
    <li className="todo-app__item">
        <div className="todo-app_checkbox">
            <input id={String(idx)} onClick={onclick_checkbox}></input>
            <label htmlFor={String(idx)} onClick={onclick_checkbox}></label>
        </div>
        <h1 className="todo-app__item-detail">
            {text}
        </h1>
        <img src="./img/x.png" className='todo-app__item-x' onClick={onclick_x}></img>
    </li>
)