const express = require('express')
const dbConnect = require('./config/dbConnect')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000
const authRouter = require('./routes/auth.routes')
const productRouter = require('./routes/product.routes')
const { errorHandler, notFound } = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')

dbConnect()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/user', authRouter)
app.use('/api/product', productRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, ()=>{console.log(`Server is running at PORT: ${PORT}`)})