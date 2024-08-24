const mongoose= require('mongoose');
require('dotenv').config();

async function connectDb(){
    try {
        const uri= process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI not found in environment variables");
        }
        await mongoose.connect(uri)
        console.log('Connected to mongoDb');
        
    } catch (error) {
        console.log("some error occured while connecting to database",error);
        process.exit(1);
        
        
    }
    
}

module.exports= connectDb;