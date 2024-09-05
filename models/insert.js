const product = require('./product')
const mongoose= require('mongoose');
require('dotenv').config();
const data = require('./data.json')



async function insertData() {
    try {
        // const uri= process.env.MONGO_URI;
        // console.log(uri,"uri");
        
        // if (!uri) {
        //     throw new Error("MONGO_URI not found in environment variables");
        // }
        // const connectRes = await mongoose.connect(uri);
        const res = await product.insertMany(data)
        console.log("Data inserted succesfully")

    } catch (error) {
        console.log("some error",error)

    }
}

insertData()

// console.log('data:', data);
