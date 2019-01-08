const mongoose = require('mongoose')
const CarsSchema = new mongoose.Schema({
  userid:{
    type: String,
    default: ""
  },
  goods:{
    type: Array,
    default: []
  }
})
module.exports = mongoose.model('Cars', CarsSchema);