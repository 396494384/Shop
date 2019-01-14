const mongoose = require('mongoose')
const RecordsSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  goods:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goods"
  }
})

module.exports = mongoose.model('Records', RecordsSchema)