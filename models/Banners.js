const mongoose = require('mongoose')
const BannersSchema = new mongoose.Schema({
  image:{
    type: String,
    required: true
  },
  relation:{
    type: Boolean,
    default: false
  },
  goods:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goods",
    required: false
  }
})

module.exports = mongoose.model('Banners', BannersSchema)