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

  get handler() {
    let self = this;
    return function(bot, message) {
      if(message.username !== 'Garooon') {
        return;
      }

      if(message.attachments[0].title.indexOf('出勤打刻') >= 0) {
        // 出勤
        bot.say({
          text: '出勤えらーい',
          channel: message.channel,
        });
        // 9時間たったらそろそろ帰れよアナウンス
        let durationMillis = 60 * 60 * 1000;
        var workingHour = 0;
        let timerComment = function() {
          bot.say({
            text: 'そろそろ' + workingHour + '時間たったから帰れよ。',
            channel: message.channel,
          });
          workingHour++;
          setTimeout(timerComment, workingDurationMillis);
        }
        setTimeout(timerComment, workingDurationMillis);
      }
    };
  }
}

module.exports = Working;
