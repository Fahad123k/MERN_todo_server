const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    brand: { type: String, required: true },   // Required
    model: { type: String },                   // Optional
   price: { type: Number, required: true },   // Required
    dealer_amount: { type: Number, default: 0 },   // Required
    image: { type: String },                   // Optional
    features: {
        screenSize: { type: String },            // Optional
        camera: { type: String },                // Optional
        battery: { type: String },               // Optional
        processor: { type: String }              // Optional
    },
    launchDate: { type: Date }                 // Optional
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
