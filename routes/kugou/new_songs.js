//新歌榜

const express = require('express');
const app = express();
const server = require('../../utils/httpServer.js');

app.get('/', (req, res) => {
  const host = 'm.kugou.com';
  const path = '/?json=true';
  const data = req.params;
  
  server.httpGet(host, data, path, false).then(body => {
    res.send(body);
  }).catch(err => {
    res.send({
      msg: '网络好像出了问题',
      code: 0
    });
    console.log(err);
  });
});

module.exports = app;