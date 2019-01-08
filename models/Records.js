const mongoose = require('mongoose')
const RecordsSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  records: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('Records', RecordsSchema)