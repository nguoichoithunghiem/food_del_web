// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Role có thể là 'user' hoặc 'admin'
},);

const User = mongoose.model('User', userSchema);

export default User;
