import React, { useState, useEffect } from 'react'
import RouteGraph from '../components/routeGraph'
import StationInfo from '../components/stationInfo'
import axios from 'axios'
import '../styles/App.css'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})

function App() {
  // sample structure of data
  // data: {
  //   R: [],
  //   G: []
  // }
  const [data, setData] = useState({}) // all MRT station data
  const [current_station_id, setCurrentStationId] = useState('None') // station clicked by cursor
  const [start_station, setStartStation] = useState('') // station selected as the starting one
  const [end_station, setEndStation] = useState('') // station selected as the ending one
  const [distance, setDistance] = useState(-2) // distance shown on the screen

  const station_type = current_station_id[0] // R10, station_type = R
  const station_order = current_station_id.slice(1, current_station_id.length) // R10, station_order = 10
  const station_info = current_station_id[0] !== 'N' ? data[station_type][parseInt(station_order) - 1] : null // get certain station information
  
  const getStations = async () => {
    let data_all= await instance.get('/getStations');
    data_all=data_all.data.data
    setData(data_all)
    // fetch data from database via backend
    // coding here ...
  }

  const calculateDistance = async () => {
    let data_all= await instance.get('/calculateDistance',{ params: { start:start_station,end:end_station } });
    const answer=data_all.data.distance
    console.log(answer)
    setDistance(answer)
    // send start and end stations to backend and get distance
    // coding here ...
  }

  // fetch data here after 1st render
  // coding here ...
  useEffect(()=>{
    getStations()
  },[])

  const handleChangeStart=(e)=>{
    setStartStation(e.target.value)
  }

  const handleChangeEnd=(e)=>{
    setEndStation(e.target.value)
  }

  if (!Object.keys(data).length) {
    return (
      <div className="wrapper">
        <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
      <div className="calculator-container">
        <div className="mode-selector">
          
          <span id="start-station-span">起始站</span>
          <select id="start-select" className="start-station" onChange={handleChangeStart}> {/* you should add both onChange and value to attributes */}
            <option></option>
            {
              // generate options of all stations within option group
              // coding here ...
              Object.keys(data).map((k)=>{
                return <optgroup label={k}>
                  {data[k].map((l) => {
                    return <option id={`start-group-${l.station_id}`} value={l.station_id}>{l.station_name}</option>
                  })}
                </optgroup>
              })
            }
          </select>

          <span id="end-station-span">終點站</span>
          <select id="end-select" className="end-station" onChange={handleChangeEnd}> {/* you should add both onChange and value to attributes */}
            <option></option>
            {
              // generate options of all stations within option group
              // coding here ...
              Object.keys(data).map((k)=>{
                return <optgroup label={k}>
                  {data[k].map((l) => {
                    return <option id={`end-group-${l.station_id}`} value={l.station_id}>{l.station_name}</option>
                  })}
                </optgroup>
              })
            }
          </select>

          <button onClick={calculateDistance} id="search-btn">查詢距離</button>
          <span id="answer" className={distance===-1?'invalid':null}> {/* you should add className to attributes */}
            {distance>0?distance:(distance===-2?null:'INVALID')}
          </span>
          <span id="answer-postfix">KM</span>
        </div>

        <div className="route-graph-info-container">
          <RouteGraph route_data={data[Object.keys(data)[0]] } handleOnClick={setCurrentStationId}/> {/* you should pass data to child component with your own customized parameters */}
          <RouteGraph route_data={data[Object.keys(data)[1]]} handleOnClick={setCurrentStationId}/> {/* you should pass data to child component with your own customized parameters */}
          <StationInfo data={station_info} /> {/* you should pass data to child component with your own customized parameters */}
        </div>
        
      </div>
    </div>
  )
}

export default App
