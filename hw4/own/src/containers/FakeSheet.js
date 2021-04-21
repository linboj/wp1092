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
            row_focus:null,
            col_focus:null
        }
    }

    handleColAdd=(row,col)=>{
        var modifiedarray=this.state.data;
        if (row===null || col===null){
            modifiedarray.forEach((element)=>{element.push('')})
        }
        else{
            modifiedarray.forEach((element)=>{element.splice(col, 0,'')})
        }
        this.setState(state=>({n_col:state.n_col+1,data:modifiedarray}))
    }
    handleColRemove=(row,col)=>{
        if (row!==null && col!==null){
            let modifiedarray=this.state.data
            modifiedarray.forEach((element)=>{element.splice(col,1)})
            this.setState(state=>({n_col:state.n_col-1,data:modifiedarray}))
        }
    }
    handleRowAdd=(row,col)=>{
        let modifiedarray=this.state.data
        let addrow=[...new Array(modifiedarray[0].length).fill('')];
        if (row!==null && col!==null){
            modifiedarray.splice(row, 0,addrow)    
        }
        else {
            modifiedarray.push(addrow)
        }
        this.setState(state=>({n_row:state.n_row+1,data:modifiedarray}))
    }
    handleRowRemove=(row,col)=>{
        if (row!==null && col!==null){
            let modifiedarray=this.state.data
            modifiedarray.splice(row, 1)
            this.setState(state=>({n_row:state.n_row-1,data:modifiedarray}))
        }
    }
    setFocusPosition=(row,col)=>{
        this.setState({row_focus:row,col_focus:col})
    }
    updateValue=(row,col,value)=>{
        let newdata=this.state.data
        newdata[row].splice(col,1,value)
        this.setState({data:newdata})
    }

    render() {
        return (
            <>
                <Sidebar handleClickAdd={this.handleRowAdd} handleClickRemove={this.handleRowRemove} row_focus={this.state.row_focus} col_focus={this.state.col_focus} setFocusPosition={this.setFocusPosition}/>
                <div className='side_right'>
                    <Header handleClickAdd={this.handleColAdd} handleClickRemove={this.handleColRemove} row_focus={this.state.row_focus} col_focus={this.state.col_focus} setFocusPosition={this.setFocusPosition}/>
                    <Spreadsheet 
                    n_col={this.state.n_col} 
                    n_row={this.state.n_row} 
                    data={this.state.data} 
                    setFocusPosition={this.setFocusPosition} 
                    updateValue={this.updateValue}/>
                </div>
                
                
            </>
        );
    }
}

export default FakeSheet;

