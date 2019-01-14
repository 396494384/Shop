const express = require('express')
const router = express.Router()
const Records = require('../models/Records')

// 获取全部浏览记录
router.get('/all', (req, res) => {
  Records.find({
    user: req.user.id
  }).populate(['goods']).then(records => {
    let _records = [];
    records.forEach(i => {
      if(i.goods != null){
        _records.push(i.goods)
      }
    })
    res.json({
      code: 200,
      message: '获取成功',
      data: _records
    })
  })
})

module.exports = router;