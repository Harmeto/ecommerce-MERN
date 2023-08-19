const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
/**
 * Esquema de Marca de Productos
 * @typedef {Object} brandSchema
*/ 
var brandSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
},{timestamps: true});

//Export the model
module.exports = mongoose.model('Brand', brandSchema);