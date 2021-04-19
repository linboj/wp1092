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
                <thead>
                    <tr>
                        <th className='row_header'></th>
                    {
                        name_col.map(e=><th className={e}>{e}</th>)
                    }
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        )
    }
}
export default Spreadsheet