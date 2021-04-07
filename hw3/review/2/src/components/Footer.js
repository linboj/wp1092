import React from "react";
import Total from "./footerComponents/Total"
import Clean from "./footerComponents/Clean"
import Buttons from "./footerComponents/Buttons"

class Footer extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <footer className="todo-app__footer">
                <Total text={this.props.numOfTodos +" left"}/>
                <Buttons handleActive={this.props.handleActive}
                handleCompleted={this.props.handleCompleted}
                handleAll={this.props.handleAll}/>
                <Clean handleClearCompleted={this.props.handleClearCompleted}
                numOfCompleted={this.props.numOfCompleted}/>        
            </footer>
        )
    }
}

export default Footer;