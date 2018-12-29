const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
  phone:{ //注册手机号
    type: String,
    required: true
  },
  username:{
    type: String,
    default:""
  },
  password:{
    type: String,
    required: true
  },
  photo:{
    type: String,
    default:""
  },
  date:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Users', usersSchema)