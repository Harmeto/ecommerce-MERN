const jwt = require('jsonwebtoken')

/**
 * Generate a Refresh jwt 
 * @param {String} id user id
 * @returns {String} return jwt, expires in 3 days
 */
const generateRefreshToken = (id) => {
  return jwt.sign({id}, process.env.SECRET_TOKEN, {expiresIn: '3d'})
}

module.exports = { generateRefreshToken }