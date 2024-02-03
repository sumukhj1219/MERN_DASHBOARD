import mongoose from "mongoose";
const {Schema} = mongoose;
const TransactionSchema = new Schema({
	amount: Number,
	desc: String,
	date: {type: Date, default: new Date()},
	createdAt :{type: Date, default: Date.now}
  });

export default new mongoose.model('Transaction', TransactionSchema)