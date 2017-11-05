const express = require('express');

// http 方面的库，可以发起 get 或 post 请求
const superagent = require('superagent');

// 用来从网页中以 css selector 取数据
const cheerio = require('cheerio');

const app = express();

app.get('/', (req, res, next) => {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://cnodejs.org')
    .end((err, sres) => {
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      const $ = cheerio.load(sres.text);
      const items = [];
      $('#topic_list .topic_title').each((index, element) =>{
        const $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href')
        });
      });

      res.send(items);
    });
});

app.listen(3000);
