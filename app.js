console.log('04 Store API')

// *** imports
require('dotenv').config()
require('express-async-errors')// async errors

const express = require('express')

const productsRouter = require('./routes/products')


const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')



// *** inicializo express app y agrego JSON middleware ***
const app = express()

app.use(express.json())

// *** routing ***

// una para manual testing
app.get('/', (req,res) => {
  res.send('<h1> Store API </h1> <a href="/api/v1/products"> Products route</a>') //enviamos link para enviar al product page
})

// products route (le paso el router)
app.use('/api/v1/products', productsRouter)

// *** middlewares ***

app.use(notFound)
app.use(errorHandlerMiddleware)


// *** servr running (async start function to run after the db connection) ***

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    //db connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })

  } catch (err) {
  }
}

start()