//商品分类api
const express = require('express')
const router = express.Router()
const Categorys = require('../models/Categorys')

router.use((req, res, next) => {
  jsonData = {
    code: 0,
    message: "",
    data: []
  }
  next()
})

// 获取全部分类
router.get('/all', (req, res, next) => {
  Categorys.find().then(categorys => {
    jsonData.code = 200;
    jsonData.message = "保存成功";
    jsonData.data = categorys;
    res.json(jsonData)
  })
})
// 添加商品分类
router.get('/add', (req, res, next) => {
  Categorys.findOne({
    name: req.query.name
  }).then(category => {
    if (category) {
      jsonData.code = 0;
      jsonData.message = "已存在相同分类名";
      res.json(jsonData)
    } else {
      new Categorys({
        name: req.query.name
      }).save(() => {
        Categorys.find().then(categorys=>{
          jsonData.code = 200;
          jsonData.message = "保存成功";
          jsonData.data = categorys;
          res.json(jsonData)
        })
      })
    }
  })
})
// 删除商品分类
router.get('/del', (req, res, next) => {
  Categorys.deleteOne({
    _id: req.query.id
  }).then(()=>{
    jsonData.code = 200;
    jsonData.message = "删除成功";
    res.json(jsonData)
  }).catch(err=>{
    jsonData.code = 0;
    jsonData.message = "删除失败";
    res.json(jsonData)
  })
})

module.exports = router