//商品api
const express = require('express')
const router = express.Router()
const Goods = require('../models/Goods')
const Collections = require('../models/Collections')
const Records = require('../models/Records')
const multer = require('multer');
const fs = require('fs')

// 自定义文件名和文件路径
const storage = multer.diskStorage({
  destination(req, res, cb) { //修改保存路径
    fs.readdir('./upload/goods', err => { //读取目录
      if (err) { //目录不存在
        fs.mkdir('./upload/goods', err => { //创建目录
          if (err) throw err;
          cb(null, './upload/goods');
        })
      } else {
        cb(null, './upload/goods');
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
    data: 'http://' + req.headers.host + '\\' + req.file.path
  })
})

// 后台Api
// 获取商品
router.post('/all', (req, res) => {
  let _findObj = {};
  let _countType = req.body.countType;
  let _showCount = _countType == 2 ? { $gt: 0 } : _countType == 3 ? { $lte: 0 } : "";
  if(req.body.name){
    _findObj.name = req.body.name
  }
  if(req.body.category){
    _findObj.category = req.body.category
  }
  if(_showCount){
    _findObj.count = _showCount
  }
  let _page = req.body.page || 1;
  let _pages = 0;
  let _limit = 8;
  Goods.countDocuments(_findObj).then(count => {
    _pages = Math.ceil(count / _limit);
    _page = Math.min(_page, _pages);
    _page = Math.max(_page, 1);
    let _skip = (_page - 1) * _limit
    Goods.find(_findObj).limit(_limit).skip(_skip).populate(['category']).then(goods => {
      res.json({
        code: 200,
        message: "商品获取成功",
        data: {
          goods: goods,
          total: count,
          limit: _limit
        }
      })
    })
  })
})
// 获取单个商品信息
router.get('/goods_details', (req, res) => {
  Goods.findOne({
    _id: req.query.id
  }).populate(['category']).then(goods => {
    res.json({
      code: 200,
      message: "商品获取成功",
      data: goods
    })
  })
})
// 添加商品
router.post('/add', (req, res) => {
  let _saveData = req.body;
  _saveData.sortPrice = _saveData.saleState ? _saveData.salePrice : _saveData.price
  new Goods(_saveData).save().then(() => {
    res.json({
      code: 200,
      message: "商品保存成功"
    })
  })
})
//修改商品
router.post('/update', (req, res) => {
  let _id = req.body.id;
  Goods.findOne({
    _id: _id
  }).then(goods => {
    let _oldGoodsImage = goods.image.split('goods\\')[1];
    let _newGoodsImage = req.body.goodsData.image.split('goods\\')[1];
    if (_oldGoodsImage != _newGoodsImage && fs.existsSync(`./upload/goods/${_oldGoodsImage}`)) { //判断要删除的图片是否存在
      fs.unlinkSync(`./upload/goods/${_oldGoodsImage}`)
    }
    Goods.updateOne({
      _id: _id
    }, req.body.goodsData).then(() => {
      res.json({
        code: 200,
        message: "修改成功"
      })
    })
  })
})
// 删除商品
router.get('/del', (req, res) => {
  let _id = req.query.id;
  Goods.findOne({
    _id: _id
  }).then(goods => {
    let _removeImage = goods.image.split('goods\\')[1];
    if (fs.existsSync(`./upload/goods/${_removeImage}`)) {
      fs.unlinkSync(`./upload/goods/${_removeImage}`)
    }
    Goods.deleteOne({
      _id: _id
    }).then(() => {
      res.json({
        code: 200,
        message: "商品删除成功"
      })
    })
  })
})

// 前台Api
// 获取商品列表
router.post('/get_goods', (req, res) => {
  let _page = req.body.page || 1;
  let _limit = 8;
  let _findObj = {};
  let _sort = {};
  let _skip = (_page - 1) *_limit;
  if (req.body.name) {
    _findObj.name = req.body.name
  }
  if (req.body.sellType) {//售卖类型 1:普通商品 , 2:热门商品, 3:最新上架
    _findObj.sellType = req.body.sellType
  }
  if (req.body.category) {
    _findObj.category = req.body.category
  }
  if (req.body.sortSalesVolume != 0) {
    _sort.salesVolume = req.body.sortSalesVolume
  }
  if (req.body.sortPrice != 0) {
    _sort.sortPrice = req.body.sortPrice
  }
  Goods.find(_findObj).sort(_sort).limit(_limit).skip(_skip).populate(['category']).then(goods => {
    res.json({
      code: 200,
      message: "商品获取成功",
      data: goods
    })
  })
})
// 获取单个商品信息
router.get('/details', (req, res) => {
  let _id = req.query.id;
  Goods.findOne({
    _id: _id
  }).populate(['category']).then(goods => {
    // 判断有没有添加到浏览记录中
    Records.findOne({
      user: req.user.id,
      goods: _id
    }).then(record => {
      if (!record) { //已添加到浏览记录中
        return new Records({
          user: req.user.id,
          goods: _id
        }).save()
      }
      return
    }).then(() => {
      // 判断有没有被收藏
      Collections.findOne({
        user: req.user.id,
        goods: _id
      }).then(collection => {
        res.json({
          code: 200,
          message: "商品获取成功",
          data: {
            collection: collection ? true : false,
            details: goods
          }
        })
      })
    })
  })
})

module.exports = router;