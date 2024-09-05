const express= require('express');
const cors= require('cors');
const app= express();
const db= require('./config/db');
const Authrouter= require('./router/Authrouter')
// const product = require('./models/product')
// const data = require('./models/data.json')
require('dotenv').config()
// prevent malicius attack from server
app.use(cors());
// its middle were to understand json data
app.use(express.json())


const PORT= process.env.PORT || 6000;
app.use('/api',Authrouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

    // one time only
    // async function insertData() {
    //     try {
     
    //         const res = await product.insertMany(data)
    //         console.log("Data inserted succesfully")
    
    //     } catch (error) {
    //         console.log("some error",error)
    
    //     }
    // }
    // insertData()
    db().catch(console.error())
    
})