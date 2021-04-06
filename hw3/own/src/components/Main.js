import React from 'react'
export default ({onsubmit}) => (
    <section className='todo-app__main'>
        <input className='todo-app__input' onKeyPress={onsubmit}></input>
        <ul className='todo-app__list' id='todo-list'>
        </ul>
    </section>
)