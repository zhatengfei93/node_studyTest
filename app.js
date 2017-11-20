var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');

//生成一个express实例 app
var app = express();

// view engine setup
//设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录
app.set('views', path.join(__dirname, 'views'));
// 设置视图模板引擎为 ejs
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 加载日志中间件
app.use(logger('dev'));
// 加载解析json的中间件
app.use(bodyParser.json());
// 加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({ extended: true }));
// 加载解析cookie的中间件
app.use(cookieParser());
// 设置pubilc文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));
//加载数据库模块
//var mongoose = require('mongoose');

// 路由控制器
app.use('/', index);
app.use('/api', users);

// catch 404 and forward to error handler
// 捕获404错误，并转发到错误处理器
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // 渲染错误页面
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect('mongodb://localhost/login');

var db = mongoose.connection;

//连接成功
db.on('open',function(){
  console.log('MongDB 连接成功');
});

//连接失败
db.on('error',function(){
  console.log('MongDB 连接失败');
});

// 导出app实例供其他模块调用
module.exports = app;
