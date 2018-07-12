var Botkit = require('botkit');
var os = require('os');
var pomodoro = require('./lib/pomodoro/pomodoro.js');

// .envを環境変数の値としてセット
require('dotenv').config()

var controller = Botkit.slackbot({
  debug: true,
});


var bot = controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

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

controller.hears(
  ['.+'],
  'direct_mention',
  function(bot, message) {
    let mention = '<@' + message.user + '>';
    // ポモドーロタイマーをセット
    pomodoro.timer.start(
      // 開始時の処理
      function (title, seconds) {
        let duration = (seconds / 60) + '分間'
        bot.reply(
          message,
          mention + ' ' + duration + '「' + title + '」しろよ。'
        );
      },
      // 終了時の処理
      function (title, seconds) {
        let duration = (seconds / 60) + '分間'
        bot.reply(
          message,
          mention + ' 「' + title + '」終わりだ。' + duration + '休憩。'
        );
      },
      // 休憩終了時の処理
      function (title) {
        bot.reply(
          message,
          mention + ' 休憩終わり。',
        );
      },
      // 何の作業をするか
      message.text
    );
  }
);
