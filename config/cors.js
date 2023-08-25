const allowedOrigins = process.env.ORIGINS;

const corsOptions = {
  origin: (origin, callback) => {
    if(allowedOrigins.includes(origin) || !origin){
      callback(null, true)
    }else{
      callback(new Error("Not Allowed by CORS"))
    }
  }
}

module.exports = corsOptions
