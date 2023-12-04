
const Model = require('../models/product');

// controller setup 

const getAllProductsStatic = async (req,res) => { //async para usar mongo
  
  // static approoach para testint de cositas anges de llevarlas al real
  //static -> yo predefino las querying conditions, no me las mandan por request
  // const search = 'ab'
  // const products = await Model.find({
  //   // featured: true // muestro solo los que estan featured.
  //   name: {$regex: search, $options: 'i'}
  // })

  const products = await Model.
    find({}).
    sort({name: 1, price: 1}).
    select({name:1, price: 1});

  // throw new Error('Testing async errors')

  //number of hits para saber how much i've sended
  res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req,res) => {

  // console.log(req.query);
  const {featured, company, name, sort, fields} = req.query; //destructuro qué voy a buscar
  const queryObject = {} //estructuro un objeto de busquedaapropiadamente

  if (featured) { //if exists
    //casteo además al tipo de dato del model
    queryObject.featured = featured === 'true' ? true : false
  }
  if (company) { 
    queryObject.company = company 
  }
  if (name) { //con query operators
    queryObject.name = {$regex: name, $options: 'i'} //regex, match a regular expresion
  }



  // dynaminc -> envío los querying conditions en la peticion
  let result = Model.find(queryObject)

  // query sorting
  if (sort) {
    const sortList = sort.split(',').join(' ') //separo en coma, y uno con espacios
    // console.log(sortList);
    result = result.sort(sortList)
  }
  else { //default sorting
    result  = result.sort('createdAt')
  }

  //query selecting fields to call up
  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  const products = await result //finally 'executing' the query

  res.status(200).json({products, nhHits: products.length})
}

module.exports = {
  getAllProductsStatic,
  getAllProducts
}