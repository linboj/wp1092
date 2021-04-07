import React from "react";


class CheckBox extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        //console.log(this.props.checked);
        let element = document.getElementById(this.props.index.toString());
        if (this.props.checked){
            element.checked = true;
            //console.log(this.props.index);
        }
        else
            element.checked = false;
    }
    componentDidMount() {
        //console.log(this.props.checked);
        let element = document.getElementById(this.props.index.toString());
        if (this.props.checked){
            element.checked = true;
            console.log(this.props.index);
        }
        else
            element.checked = false;
    }
    render() {
        return (
            <div className="todo-app__checkbox">
                <input id={this.props.index.toString()} type="checkbox" onClick={e => this.props.onClickCheckBox(e, this.props.index)}/>
                <label htmlFor={this.props.index.toString()}/>
            </div>
        )
    }
}

export default CheckBox; 