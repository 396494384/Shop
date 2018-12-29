//商品api
const express = require('express')
const router = express.Router()
const Goods = require('../models/Goods')
const multer = require('multer');
const fs = require('fs')

// 自定义文件名和文件路径
const storage = multer.diskStorage({
  destination(req, res, cb) { //修改保存路径
    fs.readdir('./upload', err => { //读取目录
      if (err) { //目录不存在
        fs.mkdir('./upload', err => { //创建目录
          if (err) throw err;
          cb(null, './upload');
        })
      } else {
        cb(null, './upload');
      }
    })
  },
  filename(req, file, cb) { //修改文件名称
    cb(null, new Date().getTime() + file.originalname);
  }
});
const upload = multer({ storage });

router.use((req, res, next) => {
  jsonData = {
    code: 0,
    message: "",
    data: ""
  }
  next()
})
//保存上传的图片
router.post('/upload', upload.single('file'), (req, res, next)=>{
  let file = 'http://' + req.headers.host + '\\' + req.file.path;
  jsonData.code = 200;
  jsonData.message = "图片上传成功";
  jsonData.data = file;
  res.json(jsonData)
})

// 后台Api
// 获取商品
router.get('/all', (req, res, next) => {
  Goods.find().populate(['category']).then(goods => {
    jsonData.code = 200;
    jsonData.message = "商品获取成功";
    jsonData.data = goods;
    res.json(jsonData)
  }).catch(err => {
    jsonData.code = 0;
    jsonData.message = "商品获取失败";
    res.json(jsonData)
  })
})
// 获取单个商品信息
router.get('/goods_details', (req, res, next) => {
  Goods.findOne({
    _id: req.query.id
  }).populate(['category']).then(goods => {
    jsonData.code = 200;
    jsonData.message = "商品获取成功";
    jsonData.data = goods;
    res.json(jsonData)
  }).catch(err => {
    jsonData.code = 0;
    jsonData.message = "商品获取失败";
    res.json(jsonData)
  })
})
// 添加商品
router.post('/add', (req, res, next) => {
  new Goods(req.body).save().then(() => {
    jsonData.code = 200;
    jsonData.message = "商品保存成功";
    res.json(jsonData)
  })
})
//修改商品
router.post('/update', (req, res, next) => {
  let id = req.body.goodsId;
  Goods.update({
    _id: id
  }, req.body.goodsData).then(() => {
    jsonData.code = 200;
    jsonData.message = "商品修改成功";
    res.json(jsonData)
  })
})
// 删除商品
router.get('/del', (req, res, next) => {
  Goods.deleteOne({
    _id: req.query.id
  }).then(() => {
    jsonData.code = 200;
    jsonData.message = "商品删除成功";
    res.json(jsonData)
  }).catch(err => {
    jsonData.code = 0;
    jsonData.message = "商品删除失败";
    res.json(jsonData)
  })
})
// 按需搜索商品
router.post('/search', (req, res, next) => {
  // countType 1 显示全部， 2 只显示有货， 3 只显示无货
  let countType = req.body.countType;
  let showCount = countType == 2 ? { $gt: 0 } : countType == 3 ? { $lte: 0 } : "";
  let findObj = {
    name: req.body.name,
    category: req.body.category,
    count: showCount
  }
  if (req.body.name == "") {
    delete (findObj['name'])
  }
  if (req.body.category == "") {
    delete (findObj['category'])
  }
  if (showCount == "") {
    delete (findObj['count'])
  }
  Goods.find(findObj).populate(['category']).then(goods => {
    jsonData.code = 200;
    jsonData.message = "商品搜索成功";
    jsonData.data = goods;
    res.json(jsonData)
  })
})

// 前台Api
// 获取商品列表
router.post('/get_goods', (req, res, next) => {
  let findObj = {};
  if(req.body.sellType){//售卖类型 1:普通商品 , 2:热门商品, 3:最新上架
    findObj.sellType = req.body.sellType
  }
  if(req.body.category){
    findObj.category = req.body.category
  }
  Goods.find(findObj).limit(req.body.count).populate(['category']).then(goods => {
    jsonData.code = 200;
    jsonData.message = "商品获取成功";
    jsonData.data = goods;
    res.json(jsonData)
  }).catch(err => {
    jsonData.code = 0;
    jsonData.message = "商品获取失败";
    res.json(jsonData)
  })
})
module.exports = router;