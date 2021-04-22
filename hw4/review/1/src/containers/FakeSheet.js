import React, { Component } from "react";
// import Header from "../components/Header";
import Table from "../components/Table";

class FakeSheet extends Component {
    render() {
        return (
            <div style={{ width: 'max-content' }}>
                {/* <Header /> */}
                <Table x={30} y={100} />
            </div>
        );
    }
}

export default FakeSheet;

