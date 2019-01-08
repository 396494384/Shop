const express = require('express')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const User = require('../models/Users')

router.use((req, res, next) => {
  resData = {
    code: '',
    data: "",
    message: "OK"
  }
  next();
})
// 用户登录
router.post('/login', (req, res) => {
  User.findOne({
    username: req.body.username
  }).then(user => {
    if (!user) {
      resData.code = 0;
      resData.message = "用户名不存在";
      res.json(resData)
    } else {
      let state = bcrypt.compareSync(req.body.password, user.password);
      resData.code = state ? "200" : "0";
      resData.message = state ? "登录成功" : "密码错误";
      resData.data = user;
      // 登录成功 保存用户信息到cookies
      if(state){
        req.cookies.set('userInfo', JSON.stringify({
          id: user._id,
          username: user.username
        }));
        User.updateOne({
          username: req.body.username
        }, {
          lastTime: new Date()
        }).then(()=>{
          res.json(resData)
        })
      }
      res.json(resData)
    }
  })
})
// 用户注册
router.post('/register', (req, res) => {
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      resData.code = 0;
      resData.message = "用户名已存在";
      res.json(resData)
    } else {
      new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt)
      }).save().then(() => {
        resData.code = 200;
        resData.message = "注册成功";
        res.json(resData)
      })
    }
  })
})
//获取全部用户
router.get('/all', (req, res)=>{
  User.find().sort({ date: -1 }).then(users=>{
    resData.code = 200;
    resData.message = "获取成功";
    resData.data = users
    res.json(resData)
  })
})

module.exports = router