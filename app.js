const express = require('express');
const http = require('http');
const app = express();
const router = express.Router();

router.all('*', function(req, res, next){
  //设置跨域
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  next();
});

//路由列表
app.use('/', require('./index'));

/** 酷狗音乐 */
//新歌榜
app.use('/new_songs', require('./routes/kugou/new_songs'));
//音乐排行榜
app.use('/music_list', require('./routes/kugou/music_list'));
//音乐详情页
// app.use('/music_detail', require('./routes/kugou/music_detail'));

app.use(router);
app.listen(2333);