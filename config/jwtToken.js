const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({id}, process.env.SECRET_TOKEN, {expiresIn: '3d'})
}

module.exports = { generateToken }