const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({
  name: String,
  password: String
})

module.exports = mongoose.model('Admin', AdminSchema)