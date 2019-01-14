const express = require('express')
const router = express.Router();
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

//根据Cookies判断登录状态
router.get('/state', (req, res) => {
  if (req.admin.isLogin) {
    res.json({
      code: 200,
      message: '已登录',
      data: req.admin
    })
  } else {
    res.json({
      code: 0,
      message: '未登录'
    })
  }
})
// 登录
router.post('/login', (req, res) => {
  Admin.findOne({
    name: req.body.name
  }).then(admin => {
    if (!admin) {
      res.json({
        code: 0,
        message: "用户名不存在"
      })
    } else {
      let _state = bcrypt.compareSync(req.body.password, admin.password);
      // 登录成功 保存用户信息到cookies
      if (_state) {
        req.cookies.set('admin', JSON.stringify({
          isLogin: _state,
          name: admin.name
        }))
      }
      res.json({
        code: _state ? 200 : 0,
        message: _state ? "登录成功" : "密码错误"
      })
    }
  })
})
// 注册
router.post('/register', (req, res) => {
  Admin.findOne({
    name: req.body.name
  }).then(admin => {
    if (admin) {
      res.json({
        code: 0,
        message: "用户名已存在"
      })
    } else {
      new Admin({
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
// 退出
router.get('/logout', (req, res) => {
  req.cookies.set('admin', null);
  res.json({
    code: 200,
    message: "退出成功",
    data: req.admin
  })
})
//修改密码
router.post('/modify', (req, res) => {
  Admin.findOne({
    name: req.admin.name
  }).then(admin => {
    let _state = bcrypt.compareSync(req.body.password, admin.password);
    if (_state) {
      Admin.updateOne(
        { name: req.admin.name },
        { password: bcrypt.hashSync(req.body.newPassword, salt) }
      ).then(() => {
        req.cookies.set('admin', null);
        res.json({
          code: 200,
          message: "密码修改成功，请重新登录！"
        })
      })
    } else {
      res.json({
        code: 0,
        message: "密码错误"
      })
    }
  })
})
module.exports = router;