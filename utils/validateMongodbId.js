const moongose = require('mongoose')

/**
 * Retorna error si id solicitado no existe o es invalido
 * @function
 * @name validateMongoDbId
 * @param {String} id Id del usuario
 * @returns {Error} Si id no es valido o no se encuentra retorna error 
 */
const validateMongoDbId = (id) => {
  const isValid = moongose.isValidObjectId(id)
  if(!isValid) throw new Error('This id is not valid or not found')
}

module.exports = validateMongoDbId