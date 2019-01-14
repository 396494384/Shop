const mongoose = require('mongoose')
const CarsSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  goods:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goods"
  },
  count:{
    type: Number,
    default: 0
  }
})
module.exports = mongoose.model('Cars', CarsSchema);