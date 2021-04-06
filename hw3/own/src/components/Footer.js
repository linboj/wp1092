import React from "react";
export default ({uncomplete,all,active,completed,clear_completed}) => (
    <footer className="todo-app__footer" id='todo-footer'>
        <div className='todo-app__total'>{uncomplete} left</div>
        <ul className='todo-app__view-buttons'>
            <button id='all' onClick={all}>All</button>
            <button id='active' onClick={active}>Active</button>
            <button id='completed' onClick={completed}>Completed</button>
        </ul>
        <div className='todo-app__clean'>
            <button id='clear_completed' onClick={clear_completed}>Clear Completed</button>
        </div>
    </footer>
)