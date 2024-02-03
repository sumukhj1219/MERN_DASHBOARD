import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import TransactionRoutes from './routes/transactionRoutes.js'
import authRoutes from './routes/authRoutes.js'
import passport from 'passport';
import passportConfig from "./config/passport.js";
const PORT = 4000;
const app = express();

app.use(cors()); 
app.use(bodyParser.json());
app.use('/transaction', TransactionRoutes)
app.use('/auth', authRoutes)
app.use(passport.initialize())
passportConfig(passport)


mongoose.connect('mongodb://localhost:27017/Dashboard')
.then(()=>{
	console.log("connected to mongo db :)");
}).catch(()=>{
	console.log("failed :(");
})

app.get('/',(req, res)=>{
	res.send('hello world')
})

app.listen(PORT, ()=>{
   console.log('connected at port 4000')
})
