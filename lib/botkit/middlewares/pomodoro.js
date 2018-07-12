let Middleware = require('../middleware.js');
let pomodoro = require('../../pomodoro/pomodoro.js');

/** ポモドーロタイマーミドルウェア */
class Pomodoro extends Middleware {

  /** 反応するキーワード */
  get keywords() {
    return ['.+'];
  }

  /** direct_mention は先頭にメンションがつくと反応する */
  get types() {
    return 'direct_mention';
  }

  /** 反応した時の処理 */
  get handler() {
    return function(bot, message) {
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
  }
}

module.exports = Pomodoro;
