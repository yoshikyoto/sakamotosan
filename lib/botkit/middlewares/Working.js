let Middleware = require('../middleware.js');

/** 出勤後1時間ごとになにか言ってくれる */
class Working extends Middleware {

  /** inherited */
  install(controller) {
    controller.on(
      this.types,
      this.handler
    );
  }

  /** inherited */
  get types() {
    return 'bot_message';
  }

  get texts() {
    return require('../../../conf/RandomText.js');
  }

  get randomText() {
    return this.chooseRondomeFromArray(this.texts)
  }

  /** inherited */
  get handler() {
    let self = this;
    return function(bot, message) {
      if(message.username !== 'Garooon') {
        return;
      }

      if(message.attachments[0].title.indexOf('出勤打刻') >= 0) {
        bot.say({
          text: '出勤えらーい',
          channel: message.channel,
        });
        // 1時間ごとになにかしゃべる
        let durationMillis = 60 * 60 * 1000;
        var workingHour = 1;
        let timerComment = function() {
          // デフォルトのメッセージ
          var text = self.randomText;

          // 出勤9時間語
          if(workingHour === 9) {
            text = 'そろそろ9時間たったから帰れよ。';
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
