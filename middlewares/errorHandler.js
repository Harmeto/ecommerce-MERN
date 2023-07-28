// not found 
/**
 * Verifica si ruta ingresa existe
 * @param {Object} _ - Request  
 * @param {Object} res - Response 
 * @param {MethodDecorator} next - Next Middleware
 */
const notFound = (_, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// error handler
/**
 * Manejo de errores regresa error y stack
 * @param {Error} error - Recibe el error para inprimir
 * @param {Object} _ - Request  
 * @param {Object} res - Response 
 * @param {MethodDecorator} next - Next Middleware
 */
const errorHandler = (error, _, res, next) => {
  const statuscode = res.statusCode == 200 ? 500 : res.statusCode
  res.status(statuscode)
  res.json({'message': error.message, 'stack': error.stack})
}

module.exports = {errorHandler, notFound}