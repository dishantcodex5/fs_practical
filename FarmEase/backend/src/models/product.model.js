import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
    'name': {
        type: String,
        required: true,
    },
    'photo': {
        type: String,
        required: true
    },
    'price': {
        type: Number,
        required: true,
    },
    'quantityUnit': {
        type: String,
        enum: ['kg', 'g', 'piece', 'dozen', 'liter', 'ml'],
        required: true,
        default: 'kg'
    },
    'pricePerUnit': {
        type: Number,
        required: true
    },
    'availableQuantity': {
        type: Number,
        required: true,
        min: 0
    },
    'description': {
        type: String,
        default: "No description given here"
    },
    'owner': {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    'category':{
        type: String,
        enum: ['Fruits', 'Vegetables', 'Dairy Products', 'Farm Core', 'Dryfruits'],
        required: true
    },
    'region':{
        type: String,
        enum: ['Northern India', 'Southern India', 'Eastern India', 'Western India', 'Central India', 'Northeastern India'],
        required: true
    },
    'soldCount': {
        type: Number,
        default: 0,
        min: 0
    }
}, {timestamps : true})

productSchema.index({ owner: 1 });

const Product = mongoose.model("Product", productSchema)

export default Product