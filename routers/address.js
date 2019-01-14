const express = require('express')
const router = express.Router()
const Address = require('../models/Address')

// 获取全部收货地址
router.get('/all', (req, res) => {
  Address.find({
    user: req.user.id
  }).then(address => {
    res.json({
      code: 200,
      message: "获取成功",
      data: address
    })
  })
})

// 获取单个收货地址
router.get('/get_address', (req, res) => {
  Address.findOne({
    _id: req.query.id
  }).then(address => {
    res.json({
      code: 200,
      message: "获取成功",
      data: address
    })
  })
})

// 保存收货地址
router.post('/confirm', (req, res) => {
  let _id = req.body.id;
  if (req.body.state && !_id) { //将之前的默认地址取消
    Address.updateMany(
      { user: req.user.id },
      { state: false }
    )
  }
  if (_id) {//修改地址
    Address.updateOne(
      { _id: _id },
      {
        name: req.body.name,
        phone: req.body.phone,
        site: req.body.site,
        state: req.body.state
      }
    ).then(() => {
      res.json({
        code: 200,
        message: "修改成功"
      })
    })
  } else {//保存地址
    new Address({
      user: req.user.id,
      name: req.body.name,
      phone: req.body.phone,
      site: req.body.site,
      state: req.body.state
    }).save().then(() => {
      res.json({
        code: 200,
        message: "保存成功"
      })
    })
  }
})

// 设置默认地址
router.get('/set_default', (req, res) => {
  let _id = req.query.id;
  Address.findOne({
    user: req.user.id,
    state: true
  }).then(address => {
    if (address) {
      Address.updateOne(
        { _id: address._id },
        { state: false }
      ).then(() => {
        return Address.updateOne(
          { _id: _id },
          { state: true }
        )
      }).then(() => {
        return Address.find({
          user: req.user.id
        })
      }).then(address => {
        res.json({
          code: 200,
          message: "设置成功",
          data: address
        })
      })
    } else {
      Address.updateOne(
        { _id: _id },
        { state: true }
      ).then(() => {
        Address.find({
          user: req.user.id
        }).then(address => {
          res.json({
            code: 200,
            message: "设置成功",
            data: address
          })
        })
      })
    }
  })
})

// 删除收货地址
router.get('/remove', (req, res) => {
  Address.remove({
    _id: req.query.id
  }).then(() => {
    res.json({
      code: 200,
      message: "删除成功"
    })
  })
})

module.exports = router;