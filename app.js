const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const connectionDB = require('./config/dbconfig.js')
const routes = require('./routes/index.js')

dotenv.config()
const app = express()
const PORT = process.env.PORT

//middlewares
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser())

// API routes
app.use('/api/v1', routes)

const startServer = async () => {
  try {
    await connectionDB()
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

startServer()
