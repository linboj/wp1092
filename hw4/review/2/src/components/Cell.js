import React, { Component } from "react";
import {parseCellIndex} from './utils.js'

class Cell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x: parseInt(this.props.ID.split("_")[0]),
            y: parseInt(this.props.ID.split("_")[1]),
            input_str: "",
            isEditing: false
        }

        this.handleKey = this.handleKey.bind(this);
    }

    onChange = (e) => {
        this.setState({
            input_str: e.target.value,
        });
    }

    inputOnFocus = (e) => {
        //console.log(e.target.parentNode.id);
    }

    onBlur = (e) => {
        var val = this.state.input_str;
        this.setState({
            isEditing: false,
            input_str: ""
        });
        this.props.setCellValue(this.state.x, this.state.y, val);
    }

    removeFocus = (e) => {
        //this.props.setFocus(-1,-1);
        document.getElementById('r_' + String(this.state.x - 1)).style.backgroundColor = 'whitesmoke';
        document.getElementById('c_' + String(this.state.y - 1)).style.backgroundColor = 'whitesmoke';
    }

    setFocus = (e) => {
        //this.props.setFocus(this.state.x, this.state.y);
        //console.log(document.activeElement.id);
        document.getElementById('r_' + String(this.state.x - 1)).style.backgroundColor = 'lightgray';
        document.getElementById('c_' + String(this.state.y - 1)).style.backgroundColor = 'lightgray';
    }

    onDoubleClick = (e) => {
        //make input focus
        this.setState({
            isEditing: true,
            input_str: this.props.val,
        });       
    }

    onKeyPress = (e) => {
        //console.log(e.key);
        var val = this.state.input_str;
        if (this.state.isEditing && e.key === 'Enter') {
            this.setState({
                isEditing: false,
                input_str: ""
            });

            if (this.state.x < this.props.rows) {
                //this.props.setFocus(this.state.x + 1, this.state.y);
                let cur_cell = document.activeElement.parentNode;
                cur_cell.parentNode.nextSibling.childNodes[this.state.y].focus();
                //document.getElementById(String(this.state.x+1)+"_"+String(this.state.y)).focus();
            }
            else {
                let cur_cell = document.activeElement.parentNode;
                cur_cell.focus();
                //document.getElementById(String(this.state.x)+"_"+String(this.state.y)).focus();
            }
        }
    }

    handleKey = (e) => {
        //console.log(e.key);
        var spec_keys = [40, 37, 39, 38]
        if (spec_keys.includes(e.keyCode) && !this.state.isEditing) {
            e.preventDefault();
            if (e.keyCode === 40) {
                if (this.state.x < this.props.rows) {
                    //this.props.setFocus(this.state.x + 1, this.state.y);
                    document.activeElement.parentNode.nextSibling.childNodes[this.state.y].focus();
                    //document.getElementById(String(this.state.x+1)+"_"+String(this.state.y)).focus();
                }
            }
            else if (e.keyCode === 37) {
                if (this.state.y > 1) {
                    //this.props.setFocus(this.state.x, this.state.y - 1);
                    document.activeElement.previousSibling.focus();
                    //document.getElementById(String(this.state.x)+"_"+String(this.state.y-1)).focus();
                }
            }
            else if (e.keyCode === 39) {
                if (this.state.y < this.props.cols) {
                    //this.props.setFocus(this.state.x, this.state.y + 1);
                    document.activeElement.nextSibling.focus();
                    //document.getElementById(String(this.state.x)+"_"+String(this.state.y+1)).focus();
                }
            }
            else if (e.keyCode === 38) {
                if (this.state.x > 1) {
                    //this.props.setFocus(this.state.x - 1, this.state.y);
                    document.activeElement.parentNode.previousSibling.childNodes[this.state.y].focus();
                    //document.getElementById(String(this.state.x-1)+"_"+String(this.state.y)).focus();
                }
            }
        }
        else if (!this.state.isEditing) {
            var prevent_keys_n = ['Shift', 'Alt', 'Control', 'Meta', 'CapsLock', 'Backspace'];
            var prevent_keys = [16, 17, 20, 18];
            let charCode = String.fromCharCode(e.which).toLowerCase();
            if(e.ctrlKey && charCode === 'c') {
                e.preventDefault();
                console.log("Ctrl + C pressed");
                //console.log(this.props.val);
                this.props.setClipBoard(this.props.val);
            } 
            else if(e.ctrlKey && charCode === 'v') {
                e.preventDefault();
                console.log("Ctrl + V pressed");
                //console.log(this.props.clipboard);
                this.props.setCellValue(this.state.x, this.state.y, this.props.clipboard);
            } 
            else if(e.ctrlKey && charCode === 's') {
                e.preventDefault();
                console.log("Ctrl + S pressed");
            }
            else if (e.key === 'Enter') {
                e.preventDefault();
                this.setState({
                    isEditing: true,
                    input_str: this.props.val,
                });   
            }
            else if (prevent_keys_n.includes(e.key) || prevent_keys.includes(e.keyCode)) {
                if(e.key==='Backspace') {
                    if(!this.props.val) {
                        e.preventDefault();
                    }
                    else {
                        this.setState({
                            isEditing: true
                        })
                    }
                }
                else {
                    e.preventDefault();
                }
            }
            // start typing in
            else {
                this.setState({
                    isEditing: true
                })
            }
        }
    }

    renderInput() {
        if (this.state.isEditing) {
            return (
                <>
                    <input type="text"
                        value={this.state.input_str}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        onKeyPress={this.onKeyPress}
                        onFocus={this.inputOnFocus}
                        autoFocus />
                </>
            )
        }
        else {
            return <div className="fakesheet__table-cell">{this.props.val}</div>
        }
    }

    render() {
        return (
            <td 
                key={this.props.ID} 
                id={this.props.ID} 
                tabIndex={0} 
                onFocus={this.setFocus} 
                onDoubleClick={this.onDoubleClick} 
                onKeyDown={this.handleKey} 
                onBlur={this.removeFocus}>
                {this.renderInput()}
            </td>
        )
    }
}

export default Cell