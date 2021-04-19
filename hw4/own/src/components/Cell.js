import React from 'react'

class Cell extends React.Component{
    constructor(props){
        super(props);
        this.state={
            x : props.x,
            y : props.y,
            value : '',
            readOnly : true
        }
    }

    handleDoubleClick=()=>{
        this.setState({readOnly: false})
    }

    handleSubmit=(e)=>{
        if (e.key==="Enter"){
            this.setState({value:this.state.value,readOnly: true})
            if (this.state.y< this.props.n_row){
                document.getElementsByClassName(this.state.x).getElementsByClassId(this.state.y+1).focus()
            }
            else {
                document.getElementsByClassName(this.state.x).getElementsByClassId(this.state.y).focus()
            }
        }
    }

    handleChange=(e)=>{
        if (!this.state.readOnly){
            this.setState({readOnly: false})
        }
        if (e.target instanceof HTMLInputElement) {
            this.setState({value: e.target.value})
        }
    }

    handleBlur=()=>{

    }

    render(){
        return (
            <input type='text' 
            readOnly={this.state.readOnly} 
            value={this.state.value} 
            onDoubleClick={this.handleDoubleClick} 
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            onBlur={this.handleBlur}
            />
        )
    }
}
export default Cell