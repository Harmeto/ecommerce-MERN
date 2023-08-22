const multer = require("multer");
const sharp = require("sharp");
const path = require('path');
const fs = require('fs')

/**
 * Funcion para determinar ruta de imagenes 
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se envian los datos necesarios
 * @returns {Promise<void>}
 */
const multerStorage = multer.diskStorage({
  destination: function(_, file, cb){
    cb(null, path.join(__dirname, '../public/images'))
  },
  filename: function(_, file, cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9 )
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg' )
  },
})

/**
 * Funcion para determinar nombre de imagen a recibir en formData
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se envian los datos necesarios
 * @returns {Promise<void>}
 */
const multerFilter = (_, file, cb) => {
  if(file.mimetype.startsWith('image')){
    cb(null, true)
  }else{
    cb({
      message : 'Unsupported File format',
    },
    false
    )
  }
}

/**
 * Multer middleware 
 * @async
 * @function
 * @param {Function} storage Donde se guardan las imagenes 
 * @param {Function} multerFilter Como se deben llamar los datos en el formData
 * @param {Object} limits Limite de tamaño de archivos a recibir 
 * @returns {<void>}
 */
const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {fieldSize: 2000000}
})

/**
 * Middleware que ajusta tamaño y calidad  de imagenes 
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @param {Function} next Next Middleware
 * @throws {Error} Arroja error si no se envian los datos necesarios
 * @returns {Promise<void>}
 */
const productImgResize = async (_, res, next) => {
  if(!_.files) return next()

  await Promise.all( _.files.map( async (file) => { 
    await sharp(file.path).resize(300, 300).toFormat('jpeg').jpeg({quantity:90}).toFile(`public/images/products/${file.filename}`) 
    //codigo para eliminar imagen de almacenamiento local 
    fs.unlinkSync(`public/images/products/${file.filename}`)
  }))

  next()
}

/**
 * Middleware que ajusta tamaño y calidad  de imagenes de blogs
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @param {Function} next Next Middleware
 * @throws {Error} Arroja error si no se envian los datos necesarios
 * @returns {Promise<void>}
 */
const blogImgResize = async (_, res, next) => {
  if(!_.files) return next()

  await Promise.all( _.files.map( async (file) => { 
    await sharp(file.path).resize(300, 300).toFormat('jpeg').jpeg({quantity:90}).toFile(`public/images/blogs/${file.filename}`) 
    //codigo para eliminar imagen de almacenamiento local 
    fs.unlinkSync(`public/images/blogs/${file.filename}`)
  }))

  next()
}

module.exports = {uploadPhoto, productImgResize, blogImgResize}