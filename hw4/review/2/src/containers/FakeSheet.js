import React, { Component } from "react";
import Header from "../components/Header";
import IndexRow from "../components/Row";

class FakeSheet extends Component {
    constructor(props) {
        super(props);
        //init
        var column_items = [];
        for (var i = 0; i < 100; i++) {
            var item = [];
            for (var j = 0; j < 26; j++) {
                item.push("");
            }
            column_items.push(item);
        }
        this.state = {
            rows: 100,
            cols: 26,
            data: column_items,
            focus: "-1_-1",
            clipboard: ""
        }
    }
    
    setCellValue = (x, y, val) => {
        var new_data = this.state.data;
        new_data[x - 1][y - 1] = val;
        this.setState({
            data: new_data
        })
    }

    setFocus = (x, y) => {
        this.setState({
            focus: String(x) + "_" + String(y),
        })
    }

    getFocusedState = (e) => {
        if (document.activeElement.tagName === 'TD') {
            this.setState({
                focus: document.activeElement.id
            })
        }
        else if (document.activeElement.tagName === 'INPUT') {
            this.setState({
                focus: document.activeElement.parentNode.id
            })
        }
        else {
            this.setState({
                focus: "-1_-1"
            })
        }
    }

    setClipBoard = (text) => {
        this.setState({
            clipboard: text
        })
    }

    addCols = () => {
        var new_cols = this.state.cols;
        new_cols++;
        var new_data = this.state.data;
        var temp = this.state.focus.split("_");
        if (this.state.focus !== "-1_-1" && parseInt(temp[1]) < new_cols) {
            for (var i = 0; i < this.state.rows; i++) {
                new_data[i].splice(parseInt(temp[1])-1,0,"");
            }
            this.setState({
                cols: new_cols,
                data: new_data,
            });
            document.getElementById(this.state.focus).focus();
        }
        else {
            this.setState({
                cols: new_cols,
                data: new_data,
            });
        }
    }

    removeCols = () => {
        var new_cols = this.state.cols;
        // if cell highlighted
        if (this.state.focus !== "-1_-1") {
            if (new_cols > 1) {
                new_cols--;
                var new_data = this.state.data;
                var temp = this.state.focus.split("_");
                if (this.state.focus !== "-1_-1" && parseInt(temp[1]) >= 1) {
                    for (var i = 0; i < this.state.rows; i++) {
                        new_data[i].splice(parseInt(temp[1])-1,1);
                    }
                    this.setState({
                        cols: new_cols,
                        data: new_data,
                    });
                    if(this.state.cols !== parseInt(temp[1])){
                        document.getElementById(this.state.focus).focus();
                    }
                    else if(this.state.cols === parseInt(temp[1]) && new_cols !== 0){
                        document.getElementById(String(parseInt(temp[0]))+'_'+String(parseInt(temp[1])-1)).focus();
                    }
                }
            }
        }
        else {
            //do nothing
        }
    }

    addRows = () => {
        var new_row_data = [];
        for(var i = 0; i< this.state.cols; i++){
            new_row_data.push("");
        }
        // if cell highlighted
        var cur_rows = this.state.rows;
        cur_rows++;
        var new_data = this.state.data;
        if (this.state.focus !== "-1_-1") {
            var temp = this.state.focus.split("_");
            new_data.splice(parseInt(temp[0])-1,0,new_row_data);
            this.setState({
                rows: cur_rows,
                data: new_data,
            })
            document.getElementById(this.state.focus).focus();
        }
        else {
            new_data.push(new_row_data);
            this.setState({
                rows: cur_rows,
                data: new_data,
            })
        }
    }

    removeRows = () => {
        // if cell highlighted
        if (this.state.focus !== "-1_-1") {
            var temp = this.state.focus.split("_");
            var cur_rows = this.state.rows;
            if (cur_rows > 1) {
                cur_rows--;
                var new_data = this.state.data;
                new_data.splice(parseInt(temp[0])-1,1);
                this.setState({
                    rows: cur_rows,
                    data: new_data,
                })
                if(this.state.rows !== parseInt(temp[0])){
                    document.getElementById(this.state.focus).focus();
                }
                else if(this.state.rows === parseInt(temp[0]) && cur_rows !== 0){
                    document.getElementById(String(parseInt(temp[0])-1)+'_'+String(parseInt(temp[1]))).focus();
                }
            }
        }
        else {
            //do nothing
        }
    }

    mapCols(n) {
        var cols = n;
        var array = [...Array(cols)];
        for (var i = 0; i < cols; i++) {
            if (i < 26) {
                array[i] = String.fromCharCode(i + 65);
            }
            else {
                array[i] = array[Math.floor(i / 26) - 1] + String.fromCharCode((i % 26) + 65)
            }
        }
        return array;
    }
    mapRows(n) {
        return [...Array(n)].map((val, i) => String(i + 1))
    }

    render() {
        return (
            <>
                <Header text="Untitled spreadsheet" />
                <div className="fakesheet-wrapper">
                    <div className="fakesheet__table-addcol">
                        <button className="button btn_add_col" onClick={this.addCols} onMouseDown={this.getFocusedState}>+</button>
                        <button className="button btn_remove_col" onClick={this.removeCols} onMouseDown={this.getFocusedState}>-</button>
                    </div>
                    <div className="fakesheet__table-wrapper">
                        <div className="fakesheet__table-addrow">
                            <button className="button btn_add_row" onClick={this.addRows} onMouseDown={this.getFocusedState}>+</button>
                            <button className="button btn_remove_row" onClick={this.removeRows} onMouseDown={this.getFocusedState}>-</button>
                        </div>
                        <div id="scroll_sheet">
                            <IndexRow 
                                rows={this.state.rows} 
                                cols={this.state.cols} 
                                focus={this.state.focus} 
                                data={this.state.data} 
                                clipboard={this.state.clipboard}
                                setFocus={this.setFocus} 
                                setCellValue={this.setCellValue}
                                setClipBoard={this.setClipBoard} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default FakeSheet;

