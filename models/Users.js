const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
  name:{ //用户名
    type: String,
    default:""
  },
  password:{ //密码
    type: String,
    required: true
  },
  photo:{ //用户头像
    type: String,
    default:""
  },
  date:{ //注册时间
    type: Date,
    default: Date.now
  },
  lastTime:{ //上次登录时间
    type: String,
    default: ""
  },
  orderTotal:{ //订单成交量
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Users', usersSchema)