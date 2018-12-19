const mongoose = require('mongoose')
const CategorysSchema = new mongoose.Schema({
  name:{ //分类名称
    type: String,
    default: ""
  },
  date:{
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Categorys', CategorysSchema)