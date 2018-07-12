let Botkit = require('botkit');
let Pomodoro = require('./lib/botkit/middlewares/pomodoro.js');
let XayahRakan = require('./lib/botkit/middlewares/xayahrakan.js');

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
  new Pomodoro(),
  new XayahRakan(),
];

// ミドルウェアを順番に設定
for (middleware of middlewares) {
  middleware.install(controller);
}
