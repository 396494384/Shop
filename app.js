const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookies = require('cookies');
const port = process.env.PORT || 5000;
const app = express();

// 设置body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//设置cookies
app.use((req, res, next)=>{
  req.cookies = new cookies(req, res);
  req.userInfo = {};
  if(req.cookies.get('userInfo')){
    try{
      req.userInfo = JSON.parse(req.cookies.get('userInfo'))
    }catch(e){
      next();
    }
  }
  next()
})
// 允许跨域访问
app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();  
});
// 处理文件访问
app.get('/upload/*', (req, res) => {
  res.sendFile(__dirname + "\\" + req.url);
})
//判断用户状态
app.post('/state', (req, res, next)=>{ //判断用户状态
  if(req.userInfo.id){
    res.json({
      code: 200,
      message: '已登录',
      data:req.userInfo
    })
  }else{
    res.json({
      code: 0,
      message: '未登录'
    })
  }
})
// 设置路由
app.use('/goods', require('./routers/goods')) //商品api
app.use('/categorys', require('./routers/categorys')) //商品分类api
app.use('/admin', require('./routers/admin')) //管理员api
app.use('/banner', require('./routers/banner')) //banner Api
app.use('/user', require('./routers/user')) //用户
app.use('/car', require('./routers/car')) //购物车
app.use('/collection', require('./routers/collection')) //用户收藏
app.use('/record', require('./routers/record')) //用户浏览记录
app.use('/address', require('./routers/address')) //用户收货地址

mongoose.connect('mongodb://localhost:27021/shop', { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log("MongoDB OK")
  app.listen(port, () => {
    console.log(`Server running on the port ${port}`)
  })
})
