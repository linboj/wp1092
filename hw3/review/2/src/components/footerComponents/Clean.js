import React from "react";
import Button from "./Button";

class Clean extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        let btnClassName = (this.props.numOfCompleted===0)? "all-completed" : "";
        //console.log(btnClassName);
        return (
            <div className="todo-app__clean">
                <span className={btnClassName}>
                    <Button onClick={this.props.handleClearCompleted} text="Clear completed"/>
                </span>
            </div>
        )
    }
}
export default Clean;