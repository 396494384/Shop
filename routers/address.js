const express = require('express')
const router = express.Router()
const Address = require('../models/Address')

router.use((req, res, next) => {
  resData = {
    code: 0,
    message: '',
    data: []
  }
  next()
})

// 获取全部收货地址
router.get('/all', (req, res) => {
  Address.find({ user: req.userInfo.id }).then(address => {
    resData.code = 200
    resData.message = '保存成功'
    resData.data = address
    res.json(resData)
  })
})

// 获取单个收货地址
router.get('/get_address', (req, res) => {
  let id = req.query.id
  Address.findOne({ _id: id }).then(address => {
    resData.code = 200
    resData.message = '保存成功'
    resData.data = address
    res.json(resData)
  })
})

// 保存收货地址
router.post('/confirm', (req, res) => {
  if(req.body.state && !req.body.id){ //将之前的默认地址取消
    Address.updateMany({ user: req.userInfo.id }, { state: false })
  }
  if(req.body.id){//修改地址
    console.log(req.body.id)
    Address.updateOne({ _id: req.body.id },{
      name: req.body.name,
      phone: req.body.phone,
      site: req.body.site,
      state: req.body.state
    }).then(()=>{
      resData.code = 200
      resData.message = '修改成功'
      res.json(resData)
    })
  }else{//保存地址
    new Address({
      user: req.userInfo.id,
      name: req.body.name,
      phone: req.body.phone,
      site: req.body.site,
      state: req.body.state
    }).save().then(() => {
      resData.code = 200
      resData.message = '保存成功'
      res.json(resData)
    })
  }
})

// 设置默认地址
router.get('/set_default', (req, res) => {
  Address.findOne({ user: req.userInfo.id, state: true }).then(address => {
    if(address){
      Address.updateOne({_id: address._id},{state : false}).then(()=>{
        Address.updateOne({_id: req.query.id}, { state: true }).then(()=>{
          Address.find({ user: req.userInfo.id }).then(address=>{
            resData.code = 200
            resData.message = '设置成功'
            resData.data = address
            res.json(resData)
          })
        })
      })
    }else{
      Address.updateOne({_id: req.query.id}, { state: true }).then(()=>{
        Address.find({ user: req.userInfo.id }).then(address=>{
          resData.code = 200
          resData.message = '设置成功'
          resData.data = address
          res.json(resData)
        })
      })
    }
  })
})

// 删除收货地址
router.get('/remove', (req, res) => {
  Address.remove({ _id: req.query.id }).then(() => {
    resData.code = 200
    resData.message = '删除成功'
    res.json(resData)
  })
})

module.exports = router