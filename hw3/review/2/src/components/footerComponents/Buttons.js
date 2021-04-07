import React from "react";
import Button from "./Button";

class Buttons extends React.Component {
    render() {
        return (
            <ul className="todo-app__view-buttons">
                <Button text="All" onClick={this.props.handleAll}/>
                <Button text="Active" onClick={this.props.handleActive}/>
                <Button text="Completed" onClick={this.props.handleCompleted}/>
            </ul>
        )
    }
}

export default Buttons;