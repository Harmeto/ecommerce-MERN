const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numViews:{
        type:Number,
        default:0,
    },
    isLiked: {
      type: Boolean,
      default: false
    },
    isDislike:{
      type: Boolean,
      default: false
    },
    likes:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    disLikes:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    images:{
      type: Array,
      default: ['https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
    },
    author: {
      type: String,
      default: 'admin'
    }
},{
  toJSON:{ virtuals: true },
  toObject:{ virtuals: true },
  timestamps: true
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);