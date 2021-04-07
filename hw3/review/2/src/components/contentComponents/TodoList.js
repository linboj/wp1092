import React from "react";
import DetailText from "./DetailText"
import CheckBox from "./CheckBox"


class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul className="todo-app__list" id="todo-list">
                {this.props.todoList.filter(todo => todo[1] === true).map((todo, index) => 
                <li className="todo-app__item" key={index}>
                    <CheckBox index={index} checked={todo[2]} onClickCheckBox={this.props.onClickCheckBox}/>
                    <DetailText todoText={todo[0]} isChecked={todo[2]}/>
                    <img src="./img/x.png" className="todo-app__item-x" onClick={e => this.props.onHandleDelete(e, index)}/>
                </li>)}
            </ul>
        )
    }
}

export default TodoList; 