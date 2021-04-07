import React from "react";
import Input from "./contentComponents/Input"
import TodoList from "./contentComponents/TodoList"
import Footer from "./Footer";
import footer from "./Footer"

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todo: [], textValue:""};
    }

    handleEnter = (event) => {
        if (event.key === "Enter"){
            console.log("Enter");
            this.setState(state => ({
                todo: state.todo.concat([[document.getElementById("text-area").value, true, false]]),
                textValue:""
            }));
        }  
    };

    handleChange = (event) => {
        this.setState({textValue: event.target.value});
    }

    findId = (todo, index) => {
        let cntDisplay = index+1;
        let id;
        for(id = 0; cntDisplay > 0; id++){
            if(todo[id][1] === true) cntDisplay--;
        }
        return id-1;
    }

    handleClick = (event, index) => {
        //console.log(state[index]);
        this.setState(state => {
            //console.log(index, state.todo[index][2]);
            //let todoList = state.todo.filter(todo=>todo[1]===true)
            //todoList[index][2] = event.target.checked;
            let id = this.findId(state.todo, index);

            state.todo[id][2] = event.target.checked;
            //console.log(state.todo);
            return{ 
                todo: state.todo
            };
        });
    }

    handleDelete = (event, index) => {
        this.setState(state => {
            //console.log(state.todo);
            let id = this.findId(state.todo, index);
            state.todo.splice(id, 1);
            //console.log(state.todo);
            return {
                todo: state.todo
            }
        })
    }

    handleAll = () => {
        this.setState(state => {
            for(let i = 0; i < state.todo.length; i++){
                state.todo[i][1] = true;
            }
            return {
                todo: state.todo
            }
        })
    }

    handleActive = () => {
        this.setState(state => {
            for(let i = 0; i < state.todo.length; i++){
                state.todo[i][1] = (state.todo[i][2] === true)? false : true;
            }
            return {
                todo: state.todo
            }
        })
    }

    handleCompleted = () => {
        this.setState(state => {
            for(let i = 0; i < state.todo.length; i++){
                state.todo[i][1] = (state.todo[i][2] === false)? false : true;
            }
            return {
                todo: state.todo
            }
        })
    }

    handleClearCompleted = () => {
        this.setState(state=>({
            todo: state.todo.filter(todo=>todo[2]===false)
        }))
    }

    render() {
        return (
            <>
            <section className="todo-app__main">
                <Input onKeyDown={this.handleEnter} onChange={this.handleChange} value={this.state.textValue}/>
                <TodoList todoList={this.state.todo} onClickCheckBox={this.handleClick} onHandleDelete={this.handleDelete}/>
            </section>
            {this.state.todo.length > 0 && 
            <Footer numOfTodos={this.state.todo.filter(todo=>todo[2]===false).length}
            handleActive={this.handleActive} handleAll={this.handleAll} handleCompleted={this.handleCompleted}
            handleClearCompleted={this.handleClearCompleted}
            numOfCompleted={this.state.todo.filter(todo=>todo[2]===true).length}/>}
            </>
        )
    }
}

export default Content;