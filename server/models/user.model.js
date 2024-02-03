import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
	firstName: {type:String, required: ['First Name is required']},
	lastName: {type:String, required: ['Last Name is required']},
	email: {type:String, required: [' email is required']},
	password: {type:String, required: ['password is required']},
},
{
	timestamps: true
})

export default new mongoose.model('User',UserSchema)