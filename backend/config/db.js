import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://haole01202:minecraft541@cluster0.oaw4z.mongodb.net/food_del').then(() => console.log("DB connected"));
}