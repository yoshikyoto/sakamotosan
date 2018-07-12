let Botkit = require('botkit');
let middleware = require('./lib/botkit/middleware.js');

let pomodoro = require('./lib/botkit/middlewares/pomodoro.js');
let xayahrakan = require('./lib/botkit/middlewares/xayahrakan.js');

// .envを環境変数の値としてセット
require('dotenv').config()

let controller = Botkit.slackbot({
  debug: true,
});

// Real Time Messaging API 開始
let bot = controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

// 設定するミドルウェア（対話モジュール）
let middlewares = [
  pomodoro,
  xayahrakan,
];

// ミドルウェアを順番に設定
for (items of middlewares) {
  middleware.append(controller, items.middleware);
}
