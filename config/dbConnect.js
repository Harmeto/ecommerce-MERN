const { default: mongoose } = require("mongoose")

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