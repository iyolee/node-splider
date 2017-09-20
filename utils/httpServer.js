const express = require('express');
const app = express();
const querystring = require('querystring');
const request = require('request');
let http = require('http');

function httpGet(host, data, path, status) {
  let options = {
    host: host,
    port: 80,
    path: path + querystring.stringify(data),
    method: 'GET',
    encoding: null,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/60.0.3112.113 Chrome/60.0.3112.113 Safari/537.36'
    }
  }

  if (status) {
    http = require('https');
    options.port = 443
  }

  return new Promise((resolve, reject) => {
    let body = '';
    let reqGet = http.request(options, response => {
      response.on('data', chunk => {
        body += chunk;
      });

      response.on('end', () => {
        resolve(body);
      });

      response.on('error', err => {
        reject(err);
      })
    });
    reqGet.end();
  });
}

function httpPost(post, data, path, status) {
  let data = querystring.stringify(data);
  let options = {
    host: host,
    port: port,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/60.0.3112.113 Chrome/60.0.3112.113 Safari/537.36',
      //返回字符串实际占用的字节长度
      'Content-Length': Buffer.byteLength(data)
    }
  }

  if (status) {
    http = require('https');
    options.port = 8080;
  }

  return new Promise((resolve, reject) => {
    let body = '';
    let reqPost = http.request(options, response => {
      response.on('data', chunk => {
        body += chunk;
      });

      response.on('error', err => {
        reject(err);
      });

      response.on('end', () => {
        resolve(body);
      });
    });
  });

  reqPost.write(body);
  reqPost.end();
}

module.exports = {
  httpGet,
  httpPost
}