import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connected to db ${error}`);
        process.exit();
    }
}

export default connectDB;