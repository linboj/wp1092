
import React, { Component } from "react";

class Todolist extends Component {

	constructor(props) {
		super(props);
		this.state={
			checked:props.checked,
			show:props.show
		};
	}

	rendercontext(check) {
		if(check==false){
			return <h1 class="todo-app__item-detail" >{this.props.text}</h1>

		}
		else {
			return <h1 class="todo-app__item-detail" style = {{textDecoration: "line-through", opacity: "0.5"}}> {this.props.text}</h1>
		}
	}

	onChangeClick = e => {
		const key = e.target.value;
		this.setState(state => ({
		    checked:!state.checked
		}));
		this.props.callback1();
	};

	onDelClick = e => {
		this.setState(state => ({
		    show:!state.show
		}));
		this.props.callback2();
	}

	render() {
		console.log(this.props);
		console.log(this.state);

		if(this.props.show==false) {
			return null;
		}
		else {
			return (<ul class="todo-app__list" id="todo-list">
				<li class="todo-app__item">
					<div class="todo-app__checkbox">
						<input type="checkbox" 
						id={this.props.num} 
						onChange={this.onChangeClick} 
						checked={this.state.checked}></input>
						<label for={this.props.num}></label>
					</div>
					{this.rendercontext(this.state.checked)}
					<img src="./img/x.png" 
					class="todo-app__item-x" 
					onClick={this.onDelClick}></img>
				</li>
			</ul>);
		}
	}
}

export default Todolist;
