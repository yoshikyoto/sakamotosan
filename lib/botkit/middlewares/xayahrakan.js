let Middleware = require('../middleware.js');

/** 「ザヤラカン」に対してザヤラカンの画像を返すだけのミドルウェア */
class XayahRakan extends Middleware {

  get keywords() {
    return ['ザヤラカン'];
  }

  /** ambient はメンション以外の何にでも反応する */
  get types() {
    return 'ambient';
  }

  /** ザヤラカンのあの画像を表示するだけ */
  get handler() {
    return function(bot, message) {
      bot.reply(
        message,
        'https://pbs.twimg.com/media/DUFk6nVVMAEo2ZN.jpg'
      );
    };
  }

}

module.exports = XayahRakan;
