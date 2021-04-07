import React from "react";

class Input extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <input className="todo-app__input" id="text-area" onKeyDown={this.props.onKeyDown}
            value={this.props.value} onChange={this.props.onChange}/>
        )
    }
}

export default Input; 