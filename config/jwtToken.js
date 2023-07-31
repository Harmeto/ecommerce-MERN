const jwt = require('jsonwebtoken')

/**
 * Generate a jwt 
 * @param {String} id user id
 * @returns {String} return jwt, expires in 1 day
 */
const generateToken = (id) => {
  return jwt.sign({id}, process.env.SECRET_TOKEN, {expiresIn: '1d'})
}

module.exports = { generateToken }