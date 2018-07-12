var pomodoro = require('../../pomodoro/pomodoro.js');

/** ポモドーロタイマーミドルウェア */
exports.middleware = (function() {

  /** 反応するキーワード */
  var keywords = ['.+'];

  /** direct_mention は先頭にメンションがつくと反応する */
  var types = 'direct_mention';

  /** 反応した時の処理 */
  var handler = function(bot, message) {
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
  };

  return {
    keywords: keywords,
    types: types,
    handler: handler,
  };

}());
