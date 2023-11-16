
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name must be provided']
  },
  price: {
    type: Number,
    required: [true, 'product name must be provided']
  },
  featured: { // is or is not hightlighted
    type: Boolean,
    default: false 
  },
  rating: {
    type: Number,
    default: 4.5
  },
  createdAt: {
    type: Date,
    default: Date.now // is setted as it is created
  },
  company: { // pre-selected companies, i.e., some kind of literal types like in Typescript
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'], // limit the possible options
      message: '{VALUE} is not a valid company' //custom error message
    }
  }

});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
