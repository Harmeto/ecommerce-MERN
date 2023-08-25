const mongoose = require("mongoose"); // Erase if already required

/**
 * Esquema de Producto
 * @typedef {Object} ProductSchema
 * @property {String} title titulo del producto
 * @property {String} slug slug asociado al producto
 * @property {String} description descripcion corta del producto
 * @property {Number} price precio del producto
 * @property {String} category categoria del producto
 * @property {String} brand marca asociada 
 * @property {Number} quantity cantidad de stock
 * @property {Number} sold cantidad vendida
 * @property {String} totalRating cantidad de estrellas de un producto
 * @property {Array} rating rating del usuario hacia el producto
 * @property {Array<String>} images imagenes del producto
 * @property {String} color colores disponibles
 * @property {import('mongoose').ObjectId} rating calificacion dada por usuarios 
*/ 
// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    sold: {
      type: Number,
      default: 0,
      // select: false | in case u dont want to show any property
    },
    images: {
      type: Array,
    },
    color: {
      type: Array,
    },
    tags:{
      type: Array,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.ObjectId, ref: "User" },
      },
    ],
    totalRatings:{
      type: String,
      default: 0
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
