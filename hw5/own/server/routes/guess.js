import express from 'express'
import getNumber from '../core/getNumber'

const router = express.Router()
const fs=require('fs')
if (!fs.existsSync('./server/log')){
  fs.mkdirSync('./server/log');
}
const startTime=new Date()
const logfile=`./server/log/${timeformat(startTime).substring(0,16)}.log`

function timeformat(time){
  const out=`${time.toJSON().substring(0,10).replaceAll('/','-')}-${time.toTimeString().substring(0,8).replaceAll(':','-')}`
  return out
}

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  const number=getNumber(true)
  res.json({ msg: 'The game has started.' })
  const time=new Date()
  fs.appendFile(logfile,`start number=${number} ${timeformat(time)}\n`,(err)=>{if (err) console.log(err);})
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  const time=new Date()
  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    fs.appendFile(logfile,`guess ${guessed} ${timeformat(time)}\n`,(err)=>{if (err) console.log(err);})
    if (guessed<number){
      res.json({msg:'Bigger'})
    }
    else if (guessed> number){
      res.json({msg:'Smaller'})
    }
    else {
      res.json({msg:'Equal'})
      fs.appendFile(logfile,'end-game\n',(err)=>{if (err) console.log(err);})
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart',(req,res)=>{
  const time=new Date()
  const number=getNumber(true)
  fs.appendFile(logfile,`restart number=${number} ${timeformat(time)}\n`,(err)=>{if (err) console.log(err);})

  res.json({ msg: 'The game has restarted.' })
})

export default router
