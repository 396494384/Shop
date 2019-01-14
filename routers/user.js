const express = require('express')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const User = require('../models/Users')

//根据Cookies判断登录状态
router.get('/state', (req, res) => {
  if (req.user.id) {
    res.json({
      code: 200,
      message: '已登录',
      data: req.user
    })
  } else {
    res.json({
      code: 0,
      message: '未登录'
    })
  }
})
// 用户登录
router.post('/login', (req, res) => {
  User.findOne({
    name: req.body.name
  }).then(user => {
    if (!user) {
      res.json({
        code: 0,
        message: "用户名不存在"
      })
    } else {
      let _state = bcrypt.compareSync(req.body.password, user.password);
      // 登录成功 保存用户信息到cookies
      if (_state) {
        req.cookies.set('user', JSON.stringify({
          id: user._id,
          name: user.name
        }));
        User.updateOne(
          { name: req.body.name },
          { lastTime: new Date() }
        )
      }
      res.json({
        code: _state ? 200 : 0,
        message: _state ? "登录成功" : "密码错误",
        data: user
      })
    }
  })
})
// 用户注册
router.post('/register', (req, res) => {
  User.findOne({
    name: req.body.name
  }).then(user => {
    if (user) {
      res.json({
        code: 0,
        message: "用户名已存在"
      })
    } else {
      new User({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, salt)
      }).save().then(() => {
        res.json({
          code: 200,
          message: "注册成功"
        })
      })
    }
  })
})
//获取全部用户
router.post('/all', (req, res) => {
  let _page = req.body.page || 1;
  let _pages = 0;
  let _limit = 3;
  User.countDocuments().then(count => {
    _pages = Math.ceil(count / _limit);
    _page = Math.min(_page, _pages);
    _page = Math.max(_page, 1);
    let _skip = (_page - 1) * _limit;
    User.find().limit(_limit).skip(_skip).sort({ date: -1 }).then(users => {
      res.json({
        code: 200,
        message: "获取成功",
        data: {
          users: users,
          total: count,
          limit: _limit
        }
      })
    })
  })
})
//退出
router.get('/logout', (req, res) => {
  req.cookies.set('user', null)
  res.json({
    code: 200,
    message: "退出成功",
    data: req.user
  })
})
module.exports = router;