const { default: mongoose } = require("mongoose")

/**
 * Conecta a la base de datos con lb moongose
 * @async
 * @function
 * @returns {Promise<void>}
 */
const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log('Database conect!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = dbConnect