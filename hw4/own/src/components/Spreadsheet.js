import React from 'react'
import Cell from './Cell'

class Spreadsheet extends React.Component{
    constructor(props){
        super(props);
    }

    convertToNumberingScheme = (number) => {
        var baseChar = ("A").charCodeAt(0),
            letters  = "";
        do {
          number -= 1;
          letters = String.fromCharCode(baseChar + (number % 26)) + letters;
          number = (number / 26) >> 0;
        } while(number > 0);
      
        return letters.toString();
      }
    
    render(){
        var name_col=[]
        for (let c=1;c<=this.props.n_col;c++){
            name_col.push(this.convertToNumberingScheme(c))
        }
        var header=[]
        
        return(
            <table>
                <thead onClick={()=>this.props.setFocusPosition(null,null)}>
                    <tr>
                        <th className='topleft'></th>
                    {
                        name_col.map((e,idx)=><th id={`_${idx}`}>{e}</th>)
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.data.map((e,r_idx)=>(
                        <tr>
                            <th id={`${r_idx}_`} onClick={()=>this.props.setFocusPosition(null,null)}>{r_idx+1}</th>
                            {e.map((g,c_idx)=>
                                <Cell r={r_idx} c={c_idx} setFocusPosition={this.props.setFocusPosition} n_row={this.props.n_row} updateValue={this.props.updateValue} value={g}/>
                                )}
                        </tr>))
                    }
                </tbody>
            </table>
        )
    }
}
export default Spreadsheet