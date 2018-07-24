let Middleware = require('../middleware.js');

/** 出勤後1時間ごとになにか言ってくれる */
class Working extends Middleware {

  install(controller) {
    controller.on(
      this.types,
      this.handler
    );
  }

  get types() {
    return 'bot_message';
  }

  get randomText() {
    let texts = [
      'オリンピックのチケットそろそろ発売してるかもな https://tokyo2020.org/jp/games/ticket/',
      'https://github.com/ に草は生やしたか？',
      'ちゃんとブログ更新してるか？',
    ];
    return texts[Math.floor(Math.random() * texts.length)]
  }

  get handler() {
    let self = this;
    return function(bot, message) {
      if(message.username !== 'Garooon') {
        return;
      }

      if(message.attachments[0].title.indexOf('出勤打刻') >= 0) {
        // 1時間ごとになにかしゃべる
        let durationMillis = 60 * 60 * 1000;
        var workingHour = 0;
        let timerComment = function() {
          // デフォルトのメッセージ
          var text = self.randomText;

          // 出勤直後
          if(workingHour === 0) {
            text = '出勤えらーい';
          }
          // 出勤9時間語
          if(workingHour === 9) {
            'そろそろ9時間たったから帰れよ。';
          }
          // 発言
          bot.say({
            text: text,
            channel: message.channel,
          });
          // 9時間目で終わり
          if(workingHour >= 9) {
            return;
          }
          workingHour++;
          setTimeout(timerComment, durationMillis);
        }
        setTimeout(timerComment, durationMillis);
      }
    };
  }
}

module.exports = Working;
