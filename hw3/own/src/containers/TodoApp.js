import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import Main from "../components/Main"

class TodoApp extends Component {

    Onsubmit=(e)=>{
        if (e.key==="Enter"){

        }
    }

    

    render() {
        return (
            <>
                <Header text="todos" />
                <Main onsubmit={this.Onsubmit}/>
                <Footer all={()=>(console.log('pass'))} active={()=>(console.log('pass'))} completed={()=>(console.log('pass'))} clear_completed={()=>(console.log('pass'))}/>
            </>
        );
    }
}

export default TodoApp;
