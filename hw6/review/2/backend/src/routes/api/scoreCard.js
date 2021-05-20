import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.get('/create-card', async function (req, res) {
  console.log("In router create-card");
  console.log(req.query);
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    const the_name = req.query.name;
    const the_subject = req.query.subject;
    const the_score = req.query.score;
    console.log(the_name,the_subject,the_score);
    const exist_or_not = await ScoreCard.findOne({ name:the_name, subject:the_subject});
    console.log(exist_or_not);
    if (exist_or_not)
    {
      const result = await ScoreCard.updateOne({ name: the_name, subject: the_subject }, { score: the_score});
      console.log("Need_Update_Count",result.n);
      console.log("Updated_Count",result.nModified);
      res.send({message:"Updating"+"("+the_name + "," + the_subject + "," + the_score + ")", card:result});
    }
    else
    {
      const new_card = new ScoreCard({name:the_name, subject:the_subject, score:the_score})
      console.log("Created Card", new_card);
      new_card.save();
      res.send({message:"Adding"+"("+the_name + "," + the_subject + "," + the_score + ")", card:new_card});
    }
  } catch (e) {
    console.log(e)
    res.json({ message: 'Something went wrong with create card...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/clear', async function (req, res) {
  console.log("In router delete clear");
  try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
    res.send({message:"Database cleared"});
    
  } catch (e) {
    res.json({ message: 'Something went wrong with clear...' });
  }
});

// TODO: implement the DB query
// route.xx(xxxx)
router.get('/query', async function (req, res) {
  console.log("In router query");
  console.log(req.query);
  if (req.query.type === 'name')
  {
    console.log("in query name")
    const the_query_name = req.query.string
    const query_content = await ScoreCard.find({ name:the_query_name},'name subject score');
    console.log(query_content)
    console.log(query_content.length)

    if (query_content.length === 0)
    {
      res.send({messages:query_content, message:"Name ("+the_query_name+") "+"not found!"});
    }
    else if (query_content.length > 0)
    {
      res.send({messages:query_content, message:"Name ("+the_query_name+") "+"found!"});
    }
  }
  else if (req.query.type === 'subject')
  {
    console.log("in query subject")
    const the_query_subject = req.query.string
    const query_content = await ScoreCard.find({ subject:the_query_subject},'name subject score');
    if (query_content.length === 0)
    {
      res.send({messages:query_content, message:"Subject ("+the_query_subject+") "+"not found!"});
    }
    else if (query_content.length > 0)
    {
      res.send({messages:query_content, message:"Subject ("+the_query_subject+") "+"found!"});
    }
  }

    
  //return messages and message(error時)“QueryType (QueryString) not found!” // 例如："Name (Ric) not found!”
});

export default router;
