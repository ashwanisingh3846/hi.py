    import mongoose from 'mongoose';
    export default async function connectDB(){
        await mongoose.connect("mongodb+srv://ashwanisingh:elVZUtternK9kiNa@cluster0.vk9uv.mongodb.net/food-delivery")
        console.log("Connected to MongoDB");
    }

