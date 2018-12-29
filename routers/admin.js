const express = require('express')
const router = express.Router();
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

router.use(function (req, res, next) {
  resData = {
    code: '',
    data:"",
    message: "OK"
  }
  next();
})

// 登录
router.post('/login', (req, res, next)=>{
  Admin.findOne({
    name: req.body.name
  }).then(user=>{
    if(!user){
      resData.code = "0";
      resData.message = "用户名不存在";
      res.json(resData)
    }else{
      let state = bcrypt.compareSync(req.body.password, user.password);
      resData.code = state ? "200" : "0";
      resData.message =  state ? "登录成功" : "密码错误";
      resData.data = user;
      res.json(resData)
    }
  })
})
// 注册
router.post('/register', (req, res, next)=>{
  Admin.findOne({
    name: req.body.name
  }).then(user=>{
    console.log(user)
    if(user){
      resData.code = "0";
      resData.message = "用户名已存在";
      res.json(resData)
    }else{
      new Admin({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, salt),
      }).save().then(()=>{
        resData.code = "200";
        resData.message = "注册成功";
        res.json(resData)
      })
    }
  })
})

module.exports = router;