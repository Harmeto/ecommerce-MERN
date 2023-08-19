const express = require('express')
const dbConnect = require('./config/dbConnect')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000
const authRouter = require('./routes/auth.routes')
const productRouter = require('./routes/product.routes')
const blogRouter = require('./routes/blog.routes')
const categoryRouter = require('./routes/productCategory.routes')
const { errorHandler, notFound } = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

dbConnect()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use('/api/user', authRouter)
app.use('/api/product', productRouter)
app.use('/api/blog', blogRouter)
app.use('/api/category', categoryRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, ()=>{console.log(`Server is running at PORT: ${PORT}`)})