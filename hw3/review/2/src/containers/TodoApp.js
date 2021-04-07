import React, { Component } from "react";
import Header from "../components/Header";
import Content from "../components/Content";

class TodoApp extends Component {
    render() {
        return (
            <>
                <Header text="todos" />
                <Content />
            </>
        );
    }
}

export default TodoApp;
