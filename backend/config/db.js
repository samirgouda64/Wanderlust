import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_DEV);
        console.log("DB connected");
    } catch (error) {
        console.log("db error");
    }
}

export default connectDb;