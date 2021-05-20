import React from 'react'
import Station from './station'

function RouteGraph(props) {
  const data = props.route_data
  //console.log(data[0])
  return (
    <div className="route-graph-container">
      {
        // generate many stations
        // use <Station /> with your own customized parameters
        // coding here ...
        data.map((k)=>{
          return <Station data={k} handleOnClick={props.handleOnClick}/>
        })
      }
    </div>
  )
}

export default RouteGraph
