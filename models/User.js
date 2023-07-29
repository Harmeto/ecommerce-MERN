const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
// Declare the Schema of the Mongo model
/**
 * Esquema de usuario
 * @typedef {Object} UserSchema
 * @property {String} first_name | Primer nombre de usuario
 * @property {String} last_name | Apellido de usuario
 * @property {String} email | Email de usuario
 * @property {String} mobile | Numero de telefono de usuario sin codigo local 
 * @property {String} password | Contraseña designada por usuario
 * @property {String} [role='user'] | Rol de usuario, por defecto "user"
 */
var userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
      type:String,
      required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
      type:String,
      default: "user"
    },
    deleted:{
      type: Boolean, 
      default: false
    },
    deletedAt:{
      type: Date,
      default: null
    }
});

/**
 * Middleware que se ejecuta antes de guardar documento
 * Realiza hash de contraseña ingresada por el usuario
 * @function
 * @name preSave
 * @memberof UserSchema
 * @param {String} password | Toma la password ingresada por usuario y realiza un hash con 10 rounds  
 */
userSchema.pre('save', async function(next){
  this.password = bcrypt.hashSync(this.password, 10, (hash)=>{
    this.password = hash
  })
})

/**
 * Validador de contraseña recive contraseña y equipara a el hash almacenado en DB 
 * @async
 * @function
 * @name isPasswordMatched
 * @memberof UserSchema
 * @param {String} enteredPassword Contraseña proporcionada por usuario al realizar Login
 * @returns {Boolean} Retorna true o false si contrañse hace match
 */
userSchema.methods.isPasswordMatched = async function(enteredPassword){
  return bcrypt.compareSync(enteredPassword, this.password)
}

//Export the model
module.exports = mongoose.model('User', userSchema);