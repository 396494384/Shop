const mongoose = require('mongoose')
const CollectionsSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  collections: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('Collections', CollectionsSchema)