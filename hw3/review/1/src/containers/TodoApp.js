import React, { Component } from "react";
import Header from "../components/Header";
import Todolist from "../components/Todolist";

class TodoApp extends Component {
	constructor(props) {
		super(props);
		this.state= {
			index:0,
			view_mode:0,
			todo:[],
			alive_count:0,
			active_count:0
		};
		this.input = React.createRef();
	}

	changeViewMode(mode) {
		return () => {
			console.log(this.state);
			this.setState(state=>{return {view_mode:mode}})
		}
	}

	countleft() {
		if(this.state.view_mode==0){return this.state.alive_count}
		else if(this.state.view_mode==1){return this.state.active_count}
		else if(this.state.view_mode==2){return this.state.alive_count-this.state.active_count}
	}

	hightlight(mode) {
		if(mode==this.state.view_mode){
			return {backgroundColor: 'gray'};
		}
		else {
			return null;
		}
	}

	delete_completed(arr, num) {

	}

	clear_completed() {
		this.setState((state)=>{
			let newstate=state;
			for (let i = newstate.todo.length - 1; i >= 0; i--) {
				if (newstate.todo[i][2]==false||newstate.todo[i][3]==true){continue;}
				else {
					newstate.todo[i][3]=true;
					newstate.alive_count = newstate.alive_count-1;
					newstate.active_count = newstate.active_count-(!newstate.todo[i][2]);
				}
			}
			return newstate;
		})

	}

	renderfooter() {
		const style = {
		      backgroundColor: 'red',
		      font: 'inherit',
		      border: '1px solid blue',
		      padding: '8px',
		      cursor: 'pointer'
		    };



		if(this.state.alive_count==0) {
			return null;
		}
		else {
			return (<footer class="todo-app__footer" id="todo-footer">
	                	<div class="todo-app__total">{this.countleft()} left</div>
	                	<ul class="todo-app__view-buttons">
	                		<button onClick={this.changeViewMode(0)} style={this.hightlight(0)}>All</button>
	                		<button onClick={this.changeViewMode(1)} style={this.hightlight(1)}>Active</button>
	                		<button onClick={this.changeViewMode(2)} style={this.hightlight(2)}>Completed</button>
	                	</ul>
	                	<div class="todo-app__clean">
	                		<button style={{display:this.state.active_count== this.state.alive_count? 'none' : 'block' }} onClick={this.clear_completed.bind(this)}>Clear completed</button>
	                	</div>
	                </footer>);
		}
	}

	callback1(num) {
		return ()=>{
			this.setState(state=>{
					let add=state.todo[num][2];
					add = 2*add-1;
					let ret=state.todo;
					ret[num][2] = !ret[num][2];
					console.log(ret);
				return {
				todo: ret,
				active_count: state.active_count+add
			}});
		}
	}

	callback2(num) {
		return ()=>{
			this.setState(state=>{
					let ret=state.todo;
					ret[num][3] = !ret[num][3];
					console.log(ret);
					// alert(ret);
				return {
				todo: ret,
				alive_count: state.alive_count-1,
				active_count: state.active_count-(!state.todo[num][2])
			}});
		}
	}

	renderlist() {
		if(this.state.view_mode==0) {
			return this.state.todo.map(e=> (
				<Todolist text={e[0]} 
				num={e[1]} 
				checked={e[2]}
				show={!e[3]}
				callback1={this.callback1(e[1])} 
				callback2={this.callback2(e[1])} />))
		}
		else if(this.state.view_mode==1){
			return this.state.todo.map(e=> (
				<Todolist text={e[0]} 
				num={e[1]} 
				checked={e[2]}
				show={(!e[3])&&(!e[2])}
				callback1={this.callback1(e[1])} 
				callback2={this.callback2(e[1])} />))
		}
		else {
			return this.state.todo.map(e=> (
				<Todolist text={e[0]} 
				num={e[1]} 
				checked={e[2]}
				show={(!e[3])&&(e[2])}
				callback1={this.callback1(e[1])} 
				callback2={this.callback2(e[1])} />))
		}
	}

	getvalue(event) {
		if(event.key == "Enter"){
			this.setState(state=>({
				index:state.index+1,
				todo:state.todo.concat([
					[this.input.current.value,
					state.index,
					false,
					false]
					]),
				alive_count:state.alive_count+1,
				active_count:state.active_count+1,
			}),()=>{this.input.current.value='';});
			
		}
	}



    render() {
        return (
            <div id="root" class="todo-app__root">
                <Header text="todos" />
                <section class="todo-app__main">
                	<input class="todo-app__input" placeholder="What needs to be done?" ref={this.input} onKeyDown={this.getvalue.bind(this)}></input>
                	{this.renderlist()}
                </section>
                {this.renderfooter()}
            </div>
        );
    }
}

export default TodoApp;
