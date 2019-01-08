const express = require('express')
const router = express.Router()
const Collections = require('../models/Collections')
const Goods = require('../models/Goods')

router.use((req, res, next) => {
  resData = {
    code: 0,
    message: "",
    data: ""
  }
  next()
})
function isLogin(req, res, next) {
  if (!req.userInfo.id) { //判断用户是否登录
    resData.code = 0
    resData.message = '请先登录'
    res.json(resData)
  } else {
    return next()
  }
}
// 获取用户收藏
router.get('/all', (req, res) => {
  Collections.findOne({ userid: req.userInfo.id }).then(collection => {
    let _data = []
    if (collection) {
      _data = collection.collections
    }
    resData.code = 200
    resData.message = '收藏成功'
    resData.data = _data
    res.json(resData)
  })
})
// 添加收藏
router.post('/append', isLogin, (req, res) => {
  let goodsid = req.body.goodsid;
  Collections.findOne({ userid: req.userInfo.id }).then(collection => {
    if (collection) {
      let _collection = collection.collections.filter(item => item._id == goodsid);
      if (_collection.length > 0) {
        resData.code = 200
        resData.message = '收藏成功'
        res.json(resData)
      } else {
        let _collections = collection.collections;
        Goods.findOne({ _id: goodsid }).then(goods => {
          _collections.push(goods)
          Collections.remove({ userid: req.userInfo.id }).then(() => {
            new Collections({
              userid: req.userInfo.id,
              collections: _collections
            }).save().then(() => {
              resData.code = 200
              resData.message = '收藏成功'
              res.json(resData)
            })
          })
        })
      }
    } else {
      Goods.findOne({ _id: goodsid }).then(goods => {
        new Collections({
          userid: req.userInfo.id,
          collections: [goods]
        }).save().then(() => {
          resData.code = 200
          resData.message = '收藏成功'
          res.json(resData)
        })
      })
    }
  })
})
// 取消收藏
router.post('/cancel', (req, res) => {
  let goodsid = req.body.goodsid;
  Collections.findOne({ userid: req.userInfo.id }).then(collection => {
    let _collections = collection.collections.filter(item => item._id != goodsid);
    Collections.remove({ userid: req.userInfo.id }).then(() => {
      new Collections({
        userid: req.userInfo.id,
        collections: _collections
      }).save().then(() => {
        resData.code = 200
        resData.message = '取消成功'
        res.json(resData)
      })
    })
  })
})

module.exports = router