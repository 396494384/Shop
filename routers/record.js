const express = require('express')
const router = express.Router()
const Records = require('../models/Records')

router.use((req, res, next) => {
  resData = {
    code: 0,
    message: "",
    data: ""
  }
  next()
})

// 获取全部浏览记录
router.get('/all', (req, res)=>{
  Records.findOne({ userid : req.userInfo.id }).then(record =>{
    resData.code = 200
    resData.message = '获取成功'
    resData.data = record.records
    res.json(resData)
  })
})

module.exports = router