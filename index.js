const express = require('express');
const ejs = require('ejs');

let app = express();

app.engine('html', ejs.__express);
app.set('view engine', 'html');
//设置模板路径
app.set('views', './views')

app.get('/', (req, res) => {
  res.header('Content-Type: text-html; charset=utf-8')
  res.render('index', {
    title: '基于node.js的网络爬虫服务平台'
  })
});

module.exports = app