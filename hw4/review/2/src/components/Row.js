import React, { Component } from "react";
import Cell from "./Cell";

class IndexRow extends Component {
    constructor(props) {
        super(props);

    }

    mapCols() {
        var cols = this.props.cols;
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

    mapRows() {
        return [...Array(this.props.rows)].map((val, i) => String(i + 1))
    }

    renderColHeader() {
        return (
            <tr key="header_col">
                <th className="header_corner"></th>
                {
                    this.mapCols().map((col_name, index) => {
                        return <th key={col_name} scope="col" id={'c_'+index}>{col_name}</th>
                    })
                }
            </tr>)
    }

    renderTableData() {
        return this.mapRows().map((row, index) => {
            var keys = [...Array(this.props.cols)].map((val, i) => String(i));
            return (
                <tr key={String(index)}>
                    <th key={'h_'+String(index)} scope="row" id={'r_'+index}>{index+1}</th>
                    {
                        keys.map((k, index_k) => {
                            var ID = String(index + 1) + "_" + String(index_k + 1);
                            return (
                                <Cell 
                                    key={ID} 
                                    ID={ID} 
                                    rows={this.props.rows} 
                                    cols={this.props.cols} 
                                    val={this.props.data[index][index_k]} 
                                    clipboard={this.props.clipboard}
                                    setCellValue={this.props.setCellValue} 
                                    setClipBoard={this.props.setClipBoard} />
                            )
                        })
                    }
                </tr>
            )
        })
    }

    render() {
        return (
            <table className="sheet_table">
                <thead>
                    {this.renderColHeader()}
                </thead>
                <tbody>
                    {this.renderTableData()}
                </tbody>
            </table>
        );
    }
}

export default IndexRow;