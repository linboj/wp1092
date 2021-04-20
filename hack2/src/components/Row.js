import Grid from '../components/Grid'
export default function Row (props) {
    let c_index=[0,1,2,3]
    return (
      c_index.map((c)=>(
          <Grid r={props.r_index} c={c} value={props.values[c]}/>
        )
      )
    );
};