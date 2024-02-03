import { Router } from "express";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const router = Router();

router.post('/register', async (req, res) => {
	try {
	  const { email, password, firstName, lastName } = req.body;
  
	  // Check if the user already exists
	  const checkUser = await User.findOne({ email });
  
	  if (checkUser) {
		return res.status(409).send({ message: 'User already exists' });
	  }
  
	  // Hash the password
	  const saltRounds = 10;
	  const salt = bcrypt.genSaltSync(saltRounds);
	  const hashedPassword = bcrypt.hashSync(password, salt);
  
	  // Create and save the new user
	  const newUser = new User({
		email:email,
		password: hashedPassword,
		firstName,
		lastName
	  });
  
	  const savedUser = await newUser.save();
	  console.log(savedUser);
  
	  res.status(201).send({ message: 'User registered successfully' });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: 'Internal server error' });
	}
  });
  

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
	const checkUser = await User.findOne({email});
	console.log(checkUser.password)
	if(!checkUser)
	{
		res.status(404).send({message:'no email found'});
	    return;
	}

	const checkPass = bcrypt.compare(password, checkUser.password);
	if(!checkPass)
	{
		res.status(404).send({message:'invalid credentials'});
		return;
	}
	const payload={
		username:email,
		_id:checkUser._id
	}
	const token = jwt.sign(payload, "rox");
	res.status(200).send({message:'all ok', token})
})
  

export default router;