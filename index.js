const express = require('express')
const dbConnect = require('./config/dbConnect')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000
const authRouter = require('./routes/auth.routes')
const { errorHandler, notFound } = require('./middlewares/errorHandler')

dbConnect()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/user', authRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, ()=>{console.log(`Server is running at PORT: ${PORT}`)})