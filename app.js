const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const app = express();

// 设置body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置路由
app.use('/goods', require('./routers/goods')) //商品api
app.use('/categorys', require('./routers/categorys')) //商品分类api

mongoose.connect('mongodb://localhost:27021/shop', { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log("MongoDB OK")
  app.listen(port, () => {
    console.log(`Server running on the port ${port}`)
  })
})
