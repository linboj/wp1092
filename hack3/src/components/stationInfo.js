import React from 'react'

function StationInfo(props) {
  const labels = [
    { label: '車站名稱', value: 'station_name' },
    { label: '車站位址', value: 'address' },
    { label: '詢問處位置', value: 'service_counter' },
    { label: '自行車進出', value: 'enable_bicycle' }
  ]
  let rows=()=>{
    return (
      labels.map((k)=>{
        return <tr>
          <td id={`table-${k.value}-label`}>{k.label}</td>
          <td id={`table-${k.value}-value`}>{props.data?props.data[k.value]:''}</td>
        </tr>
      })
    )
  }

  return (
    <div className="station-info-container">
      <table className="station-info-table">
        <thead>
          <tr>
            <th colSpan="2">車站資訊</th>
          </tr>
        </thead>
        <tbody>
          {
            // generate multiple
            //   <tr>
            //     <td></td>
            //     <td></td>
            //   </tr>
            // coding here ...
            rows()
          }
        </tbody>
      </table>
    </div>
  )
}

export default StationInfo
