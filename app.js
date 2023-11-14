console.log('04 Store API')

// *** imports
require('dotenv').config()
// async errors

const express = require('express')


const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')


// *** inicializo express app y agrego JSON middleware ***
const app = express()

app.use(express.json())

// *** routing ***

app.get('/', (req,res) => {
  res.send('<h1> Store API </h1> <a href="/api/v1/products"> Products route</a>') //enviamos link para enviar al product page
})

// products route


// *** middlewares ***

app.use(notFound)
app.use(errorHandlerMiddleware)


// *** servr running (async start function to run after the db connection) ***

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    //db connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })

  } catch (err) {
  }
}

start()