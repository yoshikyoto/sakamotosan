let Middleware = require('../middleware.js');

/** 出勤後9時間たったら教えてくれる */
class Working extends Middleware {

  install(controller) {
    controller.on(
      'bot_message',
      this.handler
    );
  }

  /** ザヤラカンのあの画像を表示するだけ */
  get handler() {
    return function(bot, message) {
      if(message.username !== 'Garooon') {
        return;
      }
      if(message.attachments[0].title.indexOf('出勤打刻') >= 0) {
        bot.say({
          text: '出勤えらーい',
          channel: message.channel,
        });
        // 9時間たったらそろそろ帰れよアナウンス
        let workingDurationMillis = 9 * 60 * 60 * 1000;
        setTimeout(function() {
          bot.say({
            text: 'そろそろ9時間たったから帰れよ。',
            channel: message.channel,
          }, workingDurationMillis);
        })
      }
    };
  }

}

module.exports = Working;
