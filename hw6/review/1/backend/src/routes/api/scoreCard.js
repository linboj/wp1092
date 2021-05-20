import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';
import bodyParser from 'body-parser';
//import getParam from '../../core'

const router = Router();
//var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
router.post('/create-card',  jsonParser, async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    // console.log(req.data)
    var name = req.body.name;
    //console.log(req.body.name)
    var subject = req.body.subject
    var score = req.body.score
    const filter = { name: name, subject: subject };
    const update = { score : score}
    //console.log(ScoreCard.findOne(filter).score)
    ScoreCard.findOne(filter, function (err, card){     
      if(!err){
        if(card !== null){            
          card.score = score
          card.save()
          var msg = "Updating ("+name+","+subject+","+score+")"
          res.send({msg: msg, card: card})
        }
        else{
          var newScoreCard = new ScoreCard({name:name, subject: subject, score: score})
          newScoreCard.save()
          var msg = "Adding ("+name+","+subject+","+score+")"
          res.send({msg: msg, card: newScoreCard})
        }
      }
    })
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/delete-card', (req, res) => {
  ScoreCard.collection.drop()
  var msg = "Database cleared"
  res.send({msg: msg})
})
// TODO: implement the DB query
// route.xx(xxxx)
router.get('/makeQuery', async function (req, res){
  
  var queryType = req.query.queryType
  var queryString = req.query.queryString

  console.log(queryString)
  if(queryType === "name"){
    ScoreCard.collection.find({name:queryString}).toArray(function(err, cards) {
        if (err) throw err;
        else{
          if(cards.length > 0){
            res.send({ cards:JSON.parse(JSON.stringify(cards)), message:"success" })
          }
          else{
            res.send({ message:queryType+ " ("+queryString+") not found!" })
          }
        }
    });
  }
  else if(queryType === "subject"){
    ScoreCard.collection.find({subject:queryString}).toArray(function(err, cards) {
        if (err) throw err;
        else{
          if(cards.length > 0){
            res.send({ cards:JSON.parse(JSON.stringify(cards)), message:"success" })
          }
          else{
            res.send({ message:queryType+ " ("+queryString+") not found!" })
          }
        }
    });
  }
  else{
    var number = parseInt(queryString, 10)
    ScoreCard.collection.find({score:number}).toArray(function(err, cards) {
        if (err) throw err;
        else{
          if(cards.length > 0){
            res.send({ cards:JSON.parse(JSON.stringify(cards)), message:"success" })
          }
          else{
            res.send({ message:queryType+ " ("+queryString+") not found!" })
          }
        }
    });
  }
})

router.get('/makeMultiQuery', async function (req, res){
  
  var multiQueryType = req.query.multiQueryType
  var nameQueryString = req.query.nameQueryString
  var subjectQueryString = req.query.subjectQueryString
  var scoreQueryString = req.query.scoreQueryString
  var operator = req.query.operator
  var filter = {}
 
  if(multiQueryType === "and"){
    if (nameQueryString !== "") filter.name = nameQueryString;
    if (subjectQueryString !== "") filter.subject = subjectQueryString;
    if (scoreQueryString !== ""){
      if(operator === "="){
        filter.score = parseInt(scoreQueryString);
      }
      else if(operator === ">"){
        filter.score = {$gt: parseInt(scoreQueryString)};
      }
      else if(operator === "<"){
        filter.score = {$lt: parseInt(scoreQueryString)};
      }
      else if(operator === ">="){
        filter.score = {$gte: parseInt(scoreQueryString)};
      }
      else{
        filter.score = {$lte: parseInt(scoreQueryString)};
      }
    }
    ScoreCard.collection.find(filter).toArray(function(err, cards) {
        if (err) throw err;
        else{
          if(cards.length > 0){
            res.send({ cards:JSON.parse(JSON.stringify(cards)), message:"success" })
          }
          else{
            var msg = ""
            var keys = Object.keys(filter);
            for(var i = 0; i < keys.length; i ++){
              if(keys[i] === "score"){
                msg += keys[i] + " ("+operator+scoreQueryString+") "
              }
              else
                msg += keys[i] + " ("+filter[keys[i]]+") "
            }
            msg += "not found!"
            res.send({ message:msg})
          }
        }
    });
  }
  else{
    var filter = []
    var filterObj = {}
    if (nameQueryString !== ""){
      var filterObj = {}
      filterObj.name = nameQueryString
      filter.push(filterObj)
    }
    if (subjectQueryString !== ""){
      var filterObj = {}
      filterObj.subject = subjectQueryString
      filter.push(filterObj)
    }
    if (scoreQueryString !== ""){
      var filterObj = {}
      if(operator === "="){
        filterObj.score = parseInt(scoreQueryString)
      }
      else if(operator === ">"){
        filterObj.score = {$gt: parseInt(scoreQueryString)}
      }
      else if(operator === "<"){
        filterObj.score = {$lt: parseInt(scoreQueryString)}
      }
      else if(operator === ">="){
        filterObj.score = {$gte: parseInt(scoreQueryString)}
      }
      else{
        filterObj.score = {$lte: parseInt(scoreQueryString)}
      }
      filter.push(filterObj)
    }
    ScoreCard.collection.find( {$or: filter} ).toArray(function(err, cards) {
      if (err) throw err;
      else{
        if(cards.length > 0){
          res.send({ cards:JSON.parse(JSON.stringify(cards)), message:"success" })
        }
        else{
          var msg = ""
          for(var i = 0; i < filter.length; i ++){
            var key = Object.keys(filter[i]);
            if(key == 'score'){
              msg += "score" + " ("+operator+scoreQueryString+") "
            }
            else
              msg += key + " ("+filter[i][key]+") "
          }
          msg += "not found!"
          res.send({ message:msg})
        }
      }
    })
  }
    
})

router.get('/makeDataQuery', async function (req, res){
  var dataId = req.query.dataId
  var msg = req.query.msg
  res.send({  result: msg[dataId - 1], message:"success" })
})
export default router;
