//商品api
const express = require('express')
const router = express.Router()
const Goods = require('../models/Goods')

router.use((req, res, next) => {
  jsonData = {
    code: 0,
    message: "",
    data: ""
  }
  next()
})

// 获取商品
router.get('/all', (req, res, next) => {
  Goods.find().populate(['category']).then(goods => {
    jsonData.code = 200;
    jsonData.message = "商品获取成功";
    jsonData.data = goods;
    res.json(jsonData)
  }).catch(err => {
    jsonData.code = 0;
    jsonData.message = "商品获取失败";
    res.json(jsonData)
  })
})
// 获取单个商品信息
router.get('/get_goods', (req, res, next) => {
  Goods.findOne({
    _id: req.query.id
  }).populate(['category']).then(goods => {
    jsonData.code = 200;
    jsonData.message = "商品获取成功";
    jsonData.data = goods;
    res.json(jsonData)
  }).catch(err => {
    jsonData.code = 0;
    jsonData.message = "商品获取失败";
    res.json(jsonData)
  })
})

// 添加商品
router.post('/add', (req, res, next) => {
  new Goods(req.body).save().then(() => {
    jsonData.code = 200;
    jsonData.message = "商品保存成功";
    res.json(jsonData)
  })
})

//修改商品
router.post('/update', (req, res, next) => {
  let id = req.body.goodsId;
  Goods.update({
    _id: id
  },req.body.goodsData).then(()=>{
    jsonData.code = 200;
    jsonData.message = "商品修改成功";
    res.json(jsonData)
  })
})

// 删除商品
router.get('/del', (req, res, next) => {
  Goods.deleteOne({
    _id: req.query.id
  }).then(()=>{
    jsonData.code = 200;
    jsonData.message = "商品删除成功";
    res.json(jsonData)
  }).catch(err=>{
    jsonData.code = 0;
    jsonData.message = "商品删除失败";
    res.json(jsonData)
  })
})

module.exports = router;