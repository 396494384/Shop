//商品分类api
const express = require('express')
const router = express.Router()
const Categorys = require('../models/Categorys')

// 获取全部分类
router.get('/all', (req, res) => {
  Categorys.find().then(categorys => {
    res.json({
      code: 200,
      message: "获取成功",
      data: categorys
    })
  })
})
// 添加商品分类
router.get('/add', (req, res) => {
  Categorys.findOne({
    name: req.query.name
  }).then(category => {
    if (category) {
      res.json({
        code: 0,
        message: "已存在相同分类名"
      })
    } else {
      new Categorys({
        name: req.query.name
      }).save(() => {
        Categorys.find().then(categorys => {
          res.json({
            code: 200,
            message: "保存成功",
            data: categorys
          })
        })
      })
    }
  })
})
// 删除商品分类
router.get('/del', (req, res) => {
  Categorys.deleteOne({
    _id: req.query.id
  }).then(() => {
    res.json({
      code: 200,
      message: "删除成功"
    })
  })
})

module.exports = router;