const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
// Declare the Schema of the Mongo model
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
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
      type:String,
      default: "user"
    }
});

userSchema.pre('save', async function(next){
  this.password = bcrypt.hashSync(this.password, 10, (hash)=>{
    this.password = hash
  })
})

userSchema.methods.isPasswordMatched = async function(enteredPassword){
  return bcrypt.compareSync(enteredPassword, this.password)
}

//Export the model
module.exports = mongoose.model('User', userSchema);