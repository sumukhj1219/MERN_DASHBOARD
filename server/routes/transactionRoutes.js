import { Router } from "express";
import Transaction from '../models/transaction.model.js';
import passport from "passport";

const router = Router();

router.get('/', async (req, res)=>{
    const transaction = await Transaction.find({}).sort({createdAt: -1}) 
	res.json({data: transaction})
})

router.post('/',async (req, res)=>{
  const {amount, desc, date} = req.body;
  const transaction = new Transaction(
	{
		amount:amount, 
		desc:desc, 
		date:date
	}
  )
  await transaction.save()
  res.send({message:'success'})
})

router.delete('/:_id', async (req, res)=>{
	await Transaction.findOneAndDelete({_id: req.params._id})
	res.send({message:'success'})
})

router.patch('/:_id', async (req, res)=>{
	await Transaction.findByIdAndUpdate({_id: req.params._id}, {$set: req.body})
	res.send({message:'success'})
})

export default router;