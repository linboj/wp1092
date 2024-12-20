import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import Item from "../components/Item"

class TodoApp extends Component {
    constructor(props){
        super(props);
        this.state={items: [],inputValue:'What needs to be done?',uncomplete:0,show:false}
    }

    handleSubmit=(e)=>{
        if (e.key==="Enter"){
            const aItem={text:e.target.value,isComplete:false}
            const newItems=[...this.state.items,aItem]
            this.setState({items:newItems,inputValue:'',uncomplete:this.state.uncomplete+1,show:true,currentFilter:null})
        }
    }

    handleFocus=()=>{
        this.setState({inputValue:''})
    }

    handleChange = (e) => {
        if (e.target instanceof HTMLInputElement) {
          this.setState({inputValue: e.target.value})
      }
    }

    handleCheckbox= (index) => {
        const newItems = [...this.state.items]
        const oldstate = newItems[index].isComplete
        newItems[index].isComplete = !newItems[index].isComplete
        if (oldstate===false){
            this.setState({
                items: newItems,uncomplete:this.state.uncomplete-1 
         })
        }
        else {
            this.setState({
                items: newItems,uncomplete:this.state.uncomplete+1
              })
        }
      }

    handleX = (index) => {
        const oldItems = this.state.items
        if (oldItems.length==1 ){
            this.setState({show:false})
        }
        if (oldItems[index].isComplete===false){
            this.setState({uncomplete:this.state.uncomplete-1})
        }
        const newItems = oldItems.slice(0, index).concat(oldItems.slice(index + 1))
        this.setState({items: newItems})
    }

    render() {
        return (
            <>
                <Header text="todos" />
                <section className='todo-app__main'>
                    <input className='todo-app__input' onKeyPress={this.handleSubmit} onChange={this.handleChange} value={this.state.inputValue} onFocus={this.handleFocus} onBlur={()=>this.setState({inputValue:'What needs to be done?'})}></input>
                    {this.state.show && <ul className='todo-app__list' id='todo-list'>
                        {
                            this.state.items.map((item,index)=>{
                                if (this.state.currentFilter===null){
                                return <Item text={item.text} idx={index} onclick_checkbox={this.handleCheckbox} onclick_x={this.handleX} complete={item.isComplete}/>
                                }
                                else{
                                    if (item.isComplete===this.state.currentFilter){
                                        return <Item text={item.text} idx={index} onclick_checkbox={this.handleCheckbox} onclick_x={this.handleX} complete={item.isComplete}/>
                                    }
                                    else{
                                        return false
                                    }
                                }
                        })
                        }
                    </ul>}
                </section>
                {this.state.show && 
                <Footer uncomplete={this.state.uncomplete} 
                all={()=>this.setState({currentFilter:null})} 
                active={()=>this.setState({currentFilter:false})} 
                completed={()=>this.setState({currentFilter:true})} 
                clear_completed={()=>(console.log(this.state.currentFilter))}/>}
            </>
        );
    }
}

export default TodoApp;
