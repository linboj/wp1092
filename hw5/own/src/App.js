import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          let server = await startGame()
          if (server===false){
            alert('Server is disable')
          }
          else{
            setHasStarted(true)
          }
        }}
      >
        start game
      </button>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          let server =await restart()
          if (server===false){
            alert('Server is disable')
          }
          else{
            setHasWon(false)
            setStatus('')
            setNumber('')
          } 
        }}
      >
        restart
      </button>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
      let res_status=await guess(number)
      if (res_status===false){
        alert('Server is disable')
      }
      else{
        setStatus(res_status)
        if (res_status==='Equal'){
          setHasWon(true)
        }
      }
  }

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button
        onClick={handleGuess}
        disabled={!number}
      >
        guess!
      </button>
      <p>{status}</p>
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return <><div className="App">{hasStarted ? game : startMenu}</div></>
}

export default App
