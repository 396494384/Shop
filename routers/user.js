const express = require('express')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const User = require('../models/Users')
const multer = require('multer');
const fs = require('fs')
// 自定义文件名和文件路径
const storage = multer.diskStorage({
  destination(req, res, cb) { //修改保存路径
    fs.readdir('./upload/user', err => { //读取目录
      if (err) { //目录不存在
        fs.mkdir('./upload/user', err => { //创建目录
          if (err) throw err;
          cb(null, './upload/user');
        })
      } else {
        cb(null, './upload/user');
      }
    })
  },
  filename(req, file, cb) { //修改文件名称
    cb(null, new Date().getTime() + file.originalname);
  }
});
const upload = multer({ storage });
//保存上传的图片
router.post('/upload', upload.single('file'), (req, res) => {
  res.json({
    code: 200,
    message: "图片上传成功",
    data: `http://${req.headers.host}\\${req.file.path}`
  })
})

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
          id: user._id
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
        photo: req.body.photo,
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
  let _limit = 8;
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
// 获取用户信息
router.get('/user_info', (req, res) => {
  User.findById(req.user.id).then(user => {
    res.json({
      code: 200,
      message: "获取成功",
      data: user
    })
  })
})
//修改用户名
router.post('/revise_name', (req, res) => {
  User.findOne({
    name: req.body.name
  }).then(user => {
    if (user) {
      res.json({
        code: 0,
        message: "用户名已存在"
      })
    } else {
      User.updateOne({
        _id: req.user.id
      }, {
        name: req.body.name
      }).then(()=>{
        res.json({
          code: 200,
          message: "修改成功"
        })
      })
    }
  })
})
//修改密码
router.post('/revise_password', (req, res) => {
  User.findById(req.user.id).then(user => {
    let _state = bcrypt.compareSync(req.body.password, user.password);
    if(_state){
      User.updateOne({
        _id: req.user.id
      },{
        password: bcrypt.hashSync(req.body.newPassword, salt)
      }).then(()=>{
        req.cookies.set('user', null)
        res.json({
          code: 200,
          message: "修改成功, 请重新登录！"
        })
      })
    }else{
      res.json({
        code: 0,
        message: "密码错误"
      })
    }
  })
})
//修改用户头像
router.post('/revise_photo', (req, res) => {
  User.findOne({
    _id: req.user.id
  }).then(user => {
    if (user) {
      let _oldPhoto = user.photo.split('user\\')[1];
      if (fs.existsSync(`./upload/user/${_oldPhoto}`)) { //判断要删除的图片是否存在
        fs.unlinkSync(`./upload/user/${_oldPhoto}`)
      }
      User.updateOne({
        _id: req.user.id
      }, {
        photo: req.body.photo
      }).then(()=>{
        res.json({
          code: 200,
          message: "修改成功",
          data: req.body.photo
        })
      })
    }
  })
})
module.exports = router;