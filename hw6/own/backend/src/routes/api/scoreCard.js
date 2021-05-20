import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/add',async (req,res)=>{
    const exsiting=await ScoreCard.findOne({name:req.body.name,subject:req.body.subject});
    if (exsiting){
        try {
            exsiting.score=req.body.score
            await exsiting.save()
		    res.json({message:`Updating (${req.body.name},${req.body.subject},${req.body.score})`,'card':req.body})
        } catch (e){
            throw new Error("ScoreCard update error"+e);
        }
    }
    else{
        try {
            const newScoreCard=new ScoreCard ({name:req.body.name,subject:req.body.subject,score:req.body.score})
            //console.log("Create scorecard",newScoreCard);
            await newScoreCard.save()
            res.json({message:`Adding (${req.body.name},${req.body.subject},${req.body.score})`,'card':req.body})
        } catch (e){
            throw new Error("ScoreCard creation error"+e);
        }
    }
})

// TODO: delete the collection of the DB
router.delete('/clear',async (req,res)=>{
    try{
        await ScoreCard.deleteMany({});
        console.log('Database deleted')
        res.json({message:'Database cleared'})
    } catch (e){
        throw new Error("Database deletion failed")
    }
})

// TODO: implement the DB query
router.get('/query/name',async (req,res)=>{
    const exsiting=await ScoreCard.find({name:req.query.name});
    if (exsiting.length>0){
        try {
            const queryResult= exsiting.map((idx)=>{return `${idx.name},${idx.subject},${idx.score}`})
            res.json({messages:queryResult})
        } catch (e){
            res.json({message:e});
        }
    }
    else{
        res.json({message:`Name (${req.query.name}) not found!`,messages:false})
    }
})

router.get('/query/subject',async (req,res)=>{
    const exsiting=await ScoreCard.find({subject:req.query.subject});
    if (exsiting.length>0){
        try {
            const queryResult= exsiting.map((idx)=>{return `${idx.name},${idx.subject},${idx.score}`})
            res.json({messages:queryResult})
            
        } catch (e){
            res.json({message:e});
        }
    }
    else{
        res.json({message:`Subject (${req.query.subject}) not found!`,messages:false})
    }
})


export default router;
