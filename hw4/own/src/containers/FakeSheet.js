import React, { Component } from "react";
import Header from "../components/Header";
import Sidebar from '../components/Sidebar'
import Spreadsheet from "../components/Spreadsheet";

class FakeSheet extends Component {
    constructor(props){
        super(props)
        this.state={
            n_col:26,
            n_row:100,
            data:[...new Array(100)].map(elem => new Array(26).fill('')),
            row_focus:1,
            col_focus:1
        }
    }

    handleColAdd=(row,col)=>{
        var modifiedarray=this.state.data;
        modifiedarray.forEach((element)=>{element.splice(col-1, 0,'as')})
        this.setState(state=>({n_col:state.n_col+1,data:modifiedarray}))
        //console.log(this.state)
    }
    handleColRemove=(row,col)=>{
        let modifiedarray=this.state.data
        modifiedarray.forEach((element)=>{element.splice(col-1,1)})
        console.log(modifiedarray)
        this.setState(state=>({n_col:state.n_col-1,data:modifiedarray}))
        //console.log(this.state)
    }
    handleRowAdd=(row,col)=>{
        let modifiedarray=this.state.data
        let addrow=[...new Array(modifiedarray[0].length).fill('')];
        modifiedarray.splice(row-1, 0,addrow)
        this.setState(state=>({n_row:state.n_row+1,data:modifiedarray}))
        //console.log(this.state)
    }
    handleRowRemove=(row,col)=>{
        let modifiedarray=this.state.data
        modifiedarray.splice(row-1, 1)
        this.setState(state=>({n_row:state.n_row-1,data:modifiedarray}))
        //console.log(this.state)
    }

    render() {
        return (
            <>
                <Sidebar handleClickAdd={this.handleRowAdd} handleClickRemove={this.handleRowRemove} row_focus={this.state.row_focus} col_focus={this.state.col_focus}/>
                <div className='side_right'>
                    <Header handleClickAdd={this.handleColAdd} handleClickRemove={this.handleColRemove} row_focus={this.state.row_focus} col_focus={this.state.col_focus}/>
                    <Spreadsheet n_col={this.state.n_col} n_row={this.state.n_row}/>
                </div>
                
                
            </>
        );
    }
}

export default FakeSheet;

