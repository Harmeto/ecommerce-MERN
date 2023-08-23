// CONFIGS 
const express = require('express')
const dbConnect = require('./config/dbConnect')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000

// ROUTERS 
const authRouter = require('./routes/auth.routes')
const productRouter = require('./routes/product.routes')
const blogRouter = require('./routes/blog.routes')
const categoryRouter = require('./routes/productCategory.routes')
const blogCategoryRouter = require('./routes/blogCategory.routes')
const brandRouter = require('./routes/brand.routes')
const colorRouter = require('./routes/color.routes')
const couponRouter = require('./routes/coupon.routes')

// MIDDLEWARES
const { errorHandler, notFound } = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')


// start config

dbConnect()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// end config


// START ROUTES // 

// users
app.use('/api/user', authRouter)

//products 
app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter)
app.use('/api/brand', brandRouter)

//blogs
app.use('/api/blog', blogRouter)
app.use('/api/blog-category', blogCategoryRouter)

// colors
app.use('/api/color', colorRouter)

//coupons
app.use('/api/coupon', couponRouter)

// END ROUTES // 


// ERROR HANDLERS 

app.use(notFound)
app.use(errorHandler)

// END ERROR HANDLERS

app.listen(PORT, ()=>{console.log(`Server is running at PORT: ${PORT}`)})