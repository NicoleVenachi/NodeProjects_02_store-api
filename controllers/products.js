
const Model = require('../models/product');

// controller setup 

const getAllProductsStatic = async (req,res) => { //async para usar mongo

  //static -> yo predefino las querying conditions, no me las mandan por request
  // en la static, muestro solo los que estan featured.
  const products = await Model.find({
    featured: true
  })

  // throw new Error('Testing async errors')

  //number of hits para saber how much i've sended
  res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req,res) => {

  // dynaminc -> envío los querying conditions en la peticion
  const products = await Model.find(req.query)

  res.status(200).json({products, nhHits: products.length})
}

module.exports = {
  getAllProductsStatic,
  getAllProducts
}