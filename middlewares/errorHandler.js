// not found 

const notFound = (_, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// error handler

const errorHandler = (error, _, res, next) => {
  const statuscode = res.statusCode == 200 ? 500 : res.statusCode
  res.status(statuscode)
  res.json({'message': error.message, 'stack': error.stack})
}

module.exports = {errorHandler, notFound}