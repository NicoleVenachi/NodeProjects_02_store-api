
require('dotenv').config()


const connectDB = require('./db/connect'); //db to connect to

const ProductModel = require('./models/product'); // data model (ProductModel)

const jsonProducts = require('./products.json'); //data


const start = async () => {
  try {
    
    await connectDB(process.env.MONGO_URI); // db connection

    await ProductModel.deleteMany(); // cleanning existing products
    await ProductModel.create(jsonProducts); // create a bunch of products <[{}'s] | {}>

    // throw new Error('just testing ')
    console.log('success!!!!');
    process.exit(0); // finishing the script excecution
  } catch (error) {
    console.log(error);
    process.exit(1); // finishing the script excecution
  }
}

start();

