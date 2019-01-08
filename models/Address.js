const mongoose = require('mongoose')
const AddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  name:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
  site:{
    type: String,
    required: true
  },
  state:{
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Address', AddressSchema)