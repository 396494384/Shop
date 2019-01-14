const express = require('express')
const router = new express.Router()
const Cars = require('../models/Cars')

// 获取购物车商品
router.get('/cars', (req, res) => {
  if (!req.user.id) { //判断用户是否登录
    res.json({
      code: 0,
      message: "请先登录"
    })
  } else {
    Cars.find({
      user: req.user.id
    }).populate(['goods']).then(cars => {
      res.json({
        code: 200,
        message: "获取成功",
        data: cars
      })
    })
  }
})

// 添加商品到购物车
router.post('/append', (req, res) => {
  let _id = req.body.id; //前台传过来的商品id
  if (!req.user.id) { //判断用户是否登录
    res.json({
      code: 0,
      message: "请先登录"
    })
  } else {
    Cars.findOne({
      user: req.user.id,
      goods: _id
    }).then(car => {
      if (car) { //已添加过该商品
        return Cars.updateOne(
          { goods: _id },
          { count: car.count + req.body.count }
        )
      } else { //还没有添加过该商品
        return new Cars({
          user: req.user.id,
          goods: _id,
          count: req.body.count
        }).save()
      }
    }).then(() => {
      res.json({
        code: 200,
        message: "加入购物车成功"
      })
    })
  }
})
//从购物车移除商品
router.post('/remove', (req, res) => {
  Cars.deleteOne({
    user: req.user.id,
    goods: req.body.id
  }).then(() => {
    res.json({
      code: 200,
      message: "删除成功"
    })
  })
})
module.exports = router;