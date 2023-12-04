
const Model = require('../models/product');

// controller setup 

const getAllProductsStatic = async (req,res) => { //async para usar mongo
  
  // static approoach para testing de cositas anges de llevarlas al real
  //static -> yo predefino las querying conditions, no me las mandan por request
  // const search = 'ab'
  // const products = await Model.find({
  //   // featured: true // muestro solo los que estan featured.
  //   name: {$regex: search, $options: 'i'}
  // })

  // const products = await Model.
  //   find({}).
  //   sort({name: 1, price: 1}).
  //   select({name:1, price: 1}).
  //   limit(5).
  //   skip(1);


  
  const products = await Model.find({
    // featured: true // muestro solo los que estan featured.
    price: {$gt:30}
  })
  .sort('price')

  // throw new Error('Testing async errors')

  //number of hits para saber how much i've sended
  res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req,res) => {

  // console.log(req.query);
  const {featured, company, name, sort, fields, numericFilters} = req.query; //destructuro qué voy a buscar
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

  //pagination
  const page = Number(req.query.page) || 1; //Sino lo pasan, voy a la 1
  const limit = Number(req.query.limit) || 10; // Sino lo pasan, tomamos 10

  const skip = (page-1)*limit//pagination logic (al inicio no hace skip de nada, en la sgte los primeros 10, etc.)

  result = result.limit(limit).skip(skip);



  // numeri filters
  if(numericFilters){
    console.log(numericFilters)
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }

    const regEx = /\b(>|>=|=|<|<=)\b/g //regular expresion sacada de Stack overflo
    let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-`) // regEx and the call back for every match (devolemos el operador mapeado a mongo)

    console.log(filters);

  }


  const products = await result //finally 'executing' the query

  res.status(200).json({products, nhHits: products.length})
}

module.exports = {
  getAllProductsStatic,
  getAllProducts
}
'<=': '$lt',