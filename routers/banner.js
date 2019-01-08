const express = require('express')
const router = express.Router()
const Goods = require('../models/Goods')
const Banner = require('../models/Banners')
const multer = require('multer');
const fs = require('fs')

router.use((req, res, next) => {
  resData = {
    code: '',
    data: "",
    message: "OK"
  }
  next();
})

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
router.post('/upload', upload.single('file'), (req, res, next) => {
  let file = 'http://' + req.headers.host + '\\' + req.file.path;
  resData.code = 200;
  resData.message = "图片上传成功";
  resData.data = file;
  res.json(resData)
})
// 获取Banner
router.get('/all', (req, res)=>{
  Banner.find().populate(['goods']).then(banners=>{
    resData.code = 200;
    resData.message = "获取成功";
    resData.data = banners;
    res.json(resData)
  })
})
// 获取单条Banner
router.get('/banner', (req, res)=>{
  Banner.findOne({ _id: req.query.id }).populate(['goods']).then(banner=>{
    resData.code = 200;
    resData.message = "获取成功";
    resData.data = banner;
    res.json(resData)
  })
})
// 添加Banner
router.post('/append', (req, res)=>{
  let _obj = req.body
  if(!_obj.relation){
    delete _obj.goods
  }
  new Banner(_obj).save().then(()=>{
    resData.code = 200
    resData.message = "添加成功"
    res.json(resData)
  })
})
// 修改Banner
router.post('/update', (req, res)=>{
  let _obj = req.body
  if(!_obj.relation){
    delete _obj.goods
  }
  Banner.updateOne({
    _id: req.body.id
  },_obj).then(()=>{
    resData.code = 200
    resData.message = "修改成功"
    res.json(resData)
  })
})

// 获取分类下面的商品
router.post('/change', (req, res)=>{
  Goods.find({ category : req.body.category }).then(goods=>{
    resData.code = 200
    resData.data = goods
    resData.message = "OK"
    res.json(resData)
  })
})
// 删除Banner
router.post('/remove', (req, res)=>{
  Banner.deleteOne({ _id: req.body.id }).then(()=>{
    resData.code = 200
    resData.message = "删除成功"
    res.json(resData)
  })
})



module.exports = router