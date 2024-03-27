import mongoose from "mongoose";

let isConnect = false;
export const dbconnect = async () => {
    mongoose.set('strictQuery', true);
    if(isConnect) {
        return
    }
    
    const MONGO_URI= process.env.MONGO_URI
    if(!MONGO_URI) {
        throw new Error('MONGO_URI is not defined')
    }

    try {
        await mongoose.connect(MONGO_URI, {bufferCommands:false})
        isConnect = true;
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log(err)
    }
}