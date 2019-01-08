const express = require('express')
const router = new express.Router()
const Car = require('../models/Cars')
const Goods = require('../models/Goods')

router.use((req, res, next) => {
  resData = {
    code: '',
    data: "",
    message: "OK"
  }
  next();
})

// 获取购物车商品
router.get('/cars', (req, res) => {
  if (!req.userInfo.id) { //判断用户是否登录
    resData.code = 0
    resData.message = '请先登录'
    res.json(resData)
  } else {
    Car.find({ userid: req.userInfo.id }).then(car => {
      resData.code = 200
      resData.message = '成功'
      resData.data = car.length > 0 ? car[0].goods : []
      res.json(resData)
    })
  }
})

// 添加商品到购物车
router.post('/append', (req, res) => {
  let goodsid = req.body.id
  if (!req.userInfo.id) { //判断用户是否登录
    resData.code = 0
    resData.message = '请先登录'
    res.json(resData)
  } else {
    let _goods = null;
    Goods.findById(goodsid).then(goods => {
      _goods = goods;
      Car.find({ userid: req.userInfo.id }).then(car => {
        if (car.length == 0) { //如果购物车为空
          let item = []
          item.push({
            goods: _goods,
            count: req.body.count
          })
          new Car({
            userid: req.userInfo.id,
            goods: item
          }).save().then(() => {
            resData.code = 200
            resData.message = '加入购物车成功'
            res.json(resData)
          })
        } else { //购物车不为空
          let state = false;
          car[0].goods.forEach(i => {
            if (i.goods._id == goodsid) {
              state = true
            }
          })
          if (state) { //如果购物车已有相同的商品
            let _car = car[0];
            _car.goods.forEach(i => {
              if (i.goods._id == goodsid) {
                i.count += req.body.count
              }
            })
            Car.updateOne({
              userid: req.userInfo.id
            }, _car).then(() => {
              resData.code = 200
              resData.message = '加入购物车成功'
              res.json(resData)
            })
          } else {
            car[0].goods.push({
              goods: _goods,
              count: req.body.count
            })
            car[0].save().then(newcar => {
              resData.code = 200
              res.data = newcar;
              resData.message = '加入购物车成功'
              res.json(resData)
            })
          }
        }
      })
    })
  }
})
//从购物车移除商品
router.post('/remove', (req, res)=>{
  let goodsid = req.body.goodsid
  let _cars = []
  Car.findOne({ userid: req.userInfo.id }).then(car=>{
    _cars = car.goods.filter(item=>{ return item.goods._id != goodsid })
    return Car.updateOne({ userid: req.userInfo.id }, {
      userid: req.userInfo.id,
      goods: _cars
    })
  }).then(()=>{
    resData.code = 200
    resData.message = '删除成功'
    res.json(resData)
  }).catch(()=>{
    resData.code = 0
    resData.message = '删除失败'
    res.json(resData)
  })
})
module.exports = router