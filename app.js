//---
// node.js + expressでAPIサーバーを立ててみようぜい！
// ※express -> nodeのWeb開発用の王道フレームワーク
//---
var express = require('express');
var app = express();
var port = process.env.PORT || 1337;

var server = app.listen(port, function() {
  console.log('Node.js is listning on POPT:' + server.address().port);
});

// アプリケーション固有の定義
var users = [{
  id: '001',
  name: '山下',
  age: 21
}, {
  id: '002',
  name: '西原',
  age: 42
}, {
  id: '003',
  name: '藤田',
  age: 25
}];

// ユーザリストを提供するAPI
app.get('/api/user/list', function(req, res, next) {
  res.json(users);
});

// ユーザのサマリを提供するAPI
app.get('/api/user/summary', function(req, res, next) {
  console.log('api/user/summary');
  var sumAge = users.map(v => (v.age) ? v.age : 0).reduce((a, b) => a + b);
  console.log(sumAge);
  res.json([{
    numbers: users.length,
    totalAge: sumAge
  }]);
});

// ユーザ情報を提供するAPI
app.get('/api/user/:userId', function(req, res, next) {
  var user = users.filter(v => v.id == req.params.userId);
  res.json(user);
});


//---
// node.js + express + ejs でサイトを立ててみようぜい！
// ※ejs -> テンプレートエンジン
//---
app.set('view engine', 'ejs');
app.get('/', function(req, res, next) {
  res.render('index', {});
});
app.get('/:userId', function(req, res, next) {
  var user = users.filter(v => v.id == req.params.userId);

  var model = {
    title: '',
    user: {
      id: '',
      name: '',
      age: 0,
    }
  };

  if (user.length > 0) {
    model.title = user[0].name + 'さんの情報';
    model.user = user[0];
  }

  res.render('userinfo', model);
});
