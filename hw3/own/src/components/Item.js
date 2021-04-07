import React from "react";
export default ({text,idx,onclick_checkbox,onclick_x,complete}) => (
    <li className="todo-app__item">
        <div className="todo-app__checkbox">
            <input id={String(idx)} type='checkbox' checked={complete} onClick={()=>{onclick_checkbox(idx)}}></input>
            <label htmlFor={String(idx)}></label>
        </div>
        {complete && <h1 className="todo-app__item-detail" style={{textDecoration: 'line-through', opacity: 0.5}}>
            {text}
        </h1>}
        {!complete && <h1 className="todo-app__item-detail">
            {text}
        </h1>
        }
        <img src="./img/x.png" className='todo-app__item-x' onClick={()=>{onclick_x(idx)}}></img>
    </li>
)