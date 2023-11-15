
const getAllProductsStatic = async (req,res) => { //async para usar mongo
  res.status(200).json({msg: 'products testing route'})
}

const getAllProducts = async (req,res) => {
  res.status(200).json({msg: 'products testing route'})
}

module.exports = {
  getAllProductsStatic,
  getAllProducts
}