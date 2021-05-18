import React from 'react'

function Station(props) {
  let color=''
  let top=''
  if (props.data.station_type=='R'){
    color='red'
  }
  else if (props.data.station_type=='G'){
    color='green'
  }
  else if (props.data.station_type=='O'){
    color='orange'
  }
  else if (props.data.station_type=='B'){
    color='blue'
  }
  if (props.data.station_order==1 || props.data.station_order==-1){
    top = 'end'
  }
  return (
    <div className="station-line-container">
      <div className="station-and-name" id={`s-${props.data.station_id}`} onClick={()=>{props.handleOnClick(props.data.station_id)}}> {/* you should add both id and onClick to attributes */}
        <div className={`station-rectangle ${color} ${top}`}>{props.data.station_id}</div>
        <div className="station-name">{props.data.station_name}</div>
      </div>
      <div className={`line ${color} ${top}`} id={`l-${props.data.station_name}`}></div> {/* you should add both id to attributes */}
    </div>
  )
}

export default Station
