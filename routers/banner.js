const express = require('express')
const router = express.Router()
const Goods = require('../models/Goods')
const Banner = require('../models/Banners')
const multer = require('multer');
const fs = require('fs')

// 自定义文件名和文件路径
const storage = multer.diskStorage({
  destination(req, res, cb) { //修改保存路径
    fs.readdir('./upload/banner', err => { //读取目录
      if (err) { //目录不存在
        fs.mkdir('./upload/banner', err => { //创建目录
          if (err) throw err;
          cb(null, './upload/banner');
        })
      } else {
        cb(null, './upload/banner');
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
// 获取Banner
router.get('/all', (req, res) => {
  Banner.find().populate(['goods']).then(banners => {
    let _banners = banners;
    _banners.forEach(i=>{
      if(i.goods == null){
        i.relation = false
      }
    })
    res.json({
      code: 200,
      message: "获取成功",
      data: _banners
    })
  })
})
// 获取单条Banner
router.get('/banner', (req, res) => {
  Banner.findOne({ _id: req.query.id }).populate(['goods']).then(banner => {
    res.json({
      code: 200,
      message: "获取成功",
      data: banner
    })
  })
})
// 添加Banner
router.post('/append', (req, res) => {
  let _obj = req.body;
  if (!_obj.relation) { delete _obj.goods }
  new Banner(_obj).save().then(() => {
    res.json({
      code: 200,
      message: "添加成功"
    })
  })
})
// 修改Banner
router.post('/update', (req, res) => {
  let _obj = req.body;
  if (!_obj.relation) { delete _obj.goods }
  Banner.findOne({
    _id: req.body.id
  }).then(banner => {
    let _oldImage = banner.image.split('banner\\')[1];
    let _newImage = req.body.image.split('banner\\')[1];
    if (_oldImage != _newImage && fs.existsSync(`./upload/banner/${_oldImage}`)) { //判断要删除的图片是否存在
      fs.unlinkSync(`./upload/banner/${_oldImage}`)
    }
    Banner.updateOne({
      _id: req.body.id
    }, _obj).then(() => {
      res.json({
        code: 200,
        message: "修改成功"
      })
    })
  })
})
// 获取分类下面的商品
router.post('/change', (req, res) => {
  Goods.find({ category: req.body.category }).then(goods => {
    res.json({
      code: 200,
      message: "获取成功",
      data: goods
    })
  })
})
// 删除Banner
router.post('/remove', (req, res) => {
  let _id = req.body.id;
  Banner.findOne({
    _id: _id
  }).then(banner => {
    let _removeImage = banner.image.split('banner\\')[1];
    if (fs.existsSync(`./upload/banner/${_removeImage}`)) {
      fs.unlinkSync(`./upload/banner/${_removeImage}`)
    }
    Banner.deleteOne({
      _id: _id
    }).then(() => {
      res.json({
        code: 200,
        message: "删除成功"
      })
    })
  })
})

module.exports = router;