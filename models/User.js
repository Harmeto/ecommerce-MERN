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
 * @property {import('mongoose').ObjectId} Address | Relacion uno a uno con modelo Address
 * @property {import('mongoose').ObjectId} WishList | Relacion uno a uno con modelo WishList
 * @property {Array} cart | Carro de compras del usuario
 * @property {Boolean} deleted | Boolean para softdelete de usuario default false
 * @property {Date} deletedAt | Fecha de eliminacion de usuario default null
 * @property {Date} timestamp | Fecha de creacion de usuario default now()
 * @property {Boolean} isBlocked | Determina si usuario esta blockeado o no default false
 * @property {String} refreshToken | Token de acceso 
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
    address:[{
      type: mongoose.Schema.ObjectId,
      ref: 'Address'
    }],
    wishlist:[{
      type: mongoose.Schema.ObjectId,
      ref: 'Product'
    }],
    cart:{
      type: Array,
      default: []
    },
    isBlocked:{
      type: Boolean,
      default: false
    },
    deleted:{
      type: Boolean, 
      default: false
    },
    deletedAt:{
      type: Date,
      default: null
    },
    refreshToken:{
      type:String
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
},
{
  timestamps: true
}
);

/**
 * Middleware que se ejecuta antes de guardar documento
 * Realiza hash de contraseña ingresada por el usuario
 * @function
 * @name preSave
 * @memberof UserSchema
 * @param {String} password | Toma la password ingresada por usuario y realiza un hash con 10 rounds  
 */
userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next()
  }
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

userSchema.methods.createPasswordResetToken = async function (){
  const resettoken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resettoken)
    .digest('hex')
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000
  return resettoken
}

//Export the model
module.exports = mongoose.model('User', userSchema);