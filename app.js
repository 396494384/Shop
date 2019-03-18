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
  req.user = {}; //保存前台用户登录信息
  req.admin = {}; //保存登台管理员登录信息
  if(req.cookies.get('user')){
    try{
      req.user = JSON.parse(req.cookies.get('user'))
    }catch(e){
      next();
    }
  }
  if(req.cookies.get('admin')){
    try{
      req.admin = JSON.parse(req.cookies.get('admin'))
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
  res.sendFile(__dirname + req.url);
})
 
/********* 上传到服务器的配制 ***  ******* */
// // 设置静态文件托管
// app.use('/views', express.static(__dirname + '/views'))
// // 页面访问
// app.get('/', (req, res)=>{
//   const html = fs.readFileSync(path.resolve(__dirname, './views/shop/dist/index.html'), 'utf-8')
//   res.setHeader('content-type', 'text/html');
//   res.send(html)
// })
// app.get('/admin', (req, res) =>{
//   const html = fs.readFileSync(path.resolve(__dirname, './views/admin/dist/index.html'), 'utf-8')
//   res.setHeader('content-type', 'text/html');
//   res.send(html)
// })
/**          end         */

// 设置路由
app.use('/admin', require('./routers/admin')) //管理员api
app.use('/user', require('./routers/user')) //用户
app.use('/goods', require('./routers/goods')) //商品api
app.use('/categorys', require('./routers/categorys')) //商品分类api
app.use('/banner', require('./routers/banner')) //banner Api
app.use('/car', require('./routers/car')) //购物车
app.use('/collection', require('./routers/collection')) //用户收藏
app.use('/record', require('./routers/record')) //用户浏览记录
app.use('/address', require('./routers/address')) //用户收货地址
// 启动
mongoose.connect('mongodb://ydias:qq942266@ds149875.mlab.com:49875/shop', { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log("MongoDB OK")
  app.listen(port, () => {
    console.log(`Server running on the port ${port}`)
  })
}).catch(err=>{
  console.log(err)
})
