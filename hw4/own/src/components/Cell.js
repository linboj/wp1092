import React from 'react'

class Cell extends React.Component{
    constructor(props){
        super(props);
        this.state={
            c : props.c,
            r : props.r,
            value : this.props.value,
            readOnly : true
        }
    }

    handleClick=()=>{
        this.props.setFocusPosition(this.state.r,this.state.c)
    }

    handleDoubleClick=()=>{
        this.setState({readOnly: false})
    }

    handleSubmit=(e)=>{
        if (e.key==="Enter"){
            this.setState({readOnly: true})
            if (this.state.r< this.props.n_row){
                this.props.setFocusPosition(this.state.r+1,this.state.c)
                document.getElementsByClassName(this.state.c).getElementsByClassId(this.state.r+1).focus()
            }
            else {
                document.getElementsByClassName(this.state.c).getElementsByClassId(this.state.r).focus()
            }
        }
    }

    handleChange=(e)=>{
        if (e.target instanceof HTMLInputElement) {
            this.props.updateValue(this.state.r,this.state.c,e.target.value)
        }
    }

    handleBlur=()=>{
        this.setState({readOnly: true})
        //this.props.setFocusPosition(null,null)
        let rowHead=document.getElementById(`${this.state.r}_`)
        rowHead.classList.remove('highlight')
        let colHead=document.getElementById(`_${this.state.c}`)
        colHead.classList.remove('highlight')
    }

    handleFocus=()=>{
            this.props.setFocusPosition(this.state.r,this.state.c)
            let rowHead=document.getElementById(`${this.state.r}_`)
            rowHead.classList.add('highlight')
            let colHead=document.getElementById(`_${this.state.c}`)
            colHead.classList.add('highlight')
    }

    handleKeyDown=(e)=>{
        if (e.key==="Enter"){
            this.setState({readOnly: true})
            if (this.state.r< this.props.n_row-1){
                this.props.setFocusPosition(this.state.r+1,this.state.c)
                document.activeElement.blur()
                let nextFcous=document.getElementById(String(`${this.state.r+1}_${this.state.c}`)).children[0]
                nextFcous.focus()
            }
        }
        else if (this.state.readOnly===true){
            if (e.keyCode>=48 || e.keyCode===8 || e.keyCode===46){
                this.setState({readOnly: false})
                this.props.updateValue(this.state.r,this.state.c,'')
            }
        }
    }

    render(){
        return (
            <td className='cell' id={`${this.state.r}_${this.state.c}`}>
                <input type='text' 
                readOnly={this.state.readOnly} 
                value={this.props.value} 
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick} 
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onKeyDown={this.handleKeyDown}/>
            </td>
        )
    }
}
export default Cell