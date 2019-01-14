const express = require('express')
const router = express.Router()
const Collections = require('../models/Collections')

// 获取用户收藏
router.get('/all', (req, res) => {
  Collections.find({
    user: req.user.id
  }).populate(['goods']).then(collections => {
    let _collections = [];
    collections.forEach(i => {
      if (i.goods != null) {
        _collections.push(i.goods)
      }
    })
    res.json({
      code: 200,
      message: "收藏成功",
      data: _collections
    })
  })
})
// 收藏切换
router.post('/switch', (req, res) => {
  let _id = req.body.id;
  Collections.findOne({
    user: req.user.id,
    goods: _id
  }).then(collection => {
    if (collection) { //已收藏， 取消收藏
      Collections.deleteOne({
        user: req.user.id,
        goods: _id
      }).then(() => {
        res.json({
          code: 200,
          message: "取消收藏成功"
        })
      })
    } else { //还没有收藏， 添加到收藏列表
      new Collections({
        user: req.user.id,
        goods: _id
      }).save().then(() => {
        res.json({
          code: 200,
          message: "收藏成功"
        })
      })
    }
  })
})


module.exports = router;