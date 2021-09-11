// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const Todo = require('./models/todo') // 載入 Todo model

const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/todo-list') // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"); res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); if (req.method === 'OPTIONS') { res.send(200) } else { next() }
});

// 設定首頁路由
app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.send({ todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})