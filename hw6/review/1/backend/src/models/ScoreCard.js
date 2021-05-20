// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number

let mongoose = require('mongoose')
let scoreCardSchema = new mongoose.Schema({
    name: String,
    subject: String,
    score: Number
})

export default mongoose.model('ScoreCard', scoreCardSchema);

