import React from "react";

class DetailText extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const isChecked = this.props.isChecked;
        let textClassName;
        if (!isChecked) {
            textClassName = "todo-app__item-detail";
        }
        else{
            textClassName = "todo-app__item-detail todo-app__item-detail-delete";
        }
        return (
            <h1 className={textClassName}>
                {this.props.todoText}
            </h1>
        )
    }
}

export default DetailText; 