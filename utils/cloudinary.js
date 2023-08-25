const cloudinary = require('cloudinary')
          
/**
 * @param {String} cloud_name nombre de nube a guardar datos
 * @param {String} api_key api_key de nube cloudinary
 * @param {String} api_secret llave secreta de nube cloudinary
 */
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_KEY 
});

/**
 * @param {File} fileToUpload archivo imagen a guardar
 * @returns {Array} Retorna array con imagenes y sus url de cloudinary
 */
const cloudinaryUploadImg = async(fileToUpload) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUpload, (result) => {
      resolve(
        {
        url: result.secure_url, 
        asset_id:result.asset_id,
        public_id: result.public_id
        },
        {
          resource_type: "auto"
        }
      )
    })
  })
}

/**
 * @param {File} fileToDelete archivo imagen a eliminar
 * @returns {Array} Retorna array con imagenes y sus url de cloudinary
 */
const cloudinaryDeleteImg = async(fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
        url: result.secure_url, 
        asset_id:result.asset_id,
        public_id: result.public_id
        },
        {
          resource_type: "auto"
        }
      )
    })
  })
}


module.exports = {cloudinaryUploadImg, cloudinaryDeleteImg}