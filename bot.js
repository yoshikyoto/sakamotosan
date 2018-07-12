var Botkit = require('botkit');
let middleware = require('./lib/botkit/middleware.js');

var pomodoro = require('./lib/botkit/middlewares/pomodoro.js');

// .envを環境変数の値としてセット
require('dotenv').config()

var controller = Botkit.slackbot({
  debug: true,
});

// Real Time Messaging API 開始
var bot = controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

// 設定するミドルウェア（対話モジュール）
let middlewares = [
  pomodoro
];

// ミドルウェアを順番に設定
for (items of middlewares) {
  middleware.append(controller, items.middleware);
}

controller.hears(
  ['ザヤラカン'],
  'direct_mention',
  function(bot, message) {
    bot.reply(
      message,
      'https://pbs.twimg.com/media/DUFk6nVVMAEo2ZN.jpg'
    );
  }
);
