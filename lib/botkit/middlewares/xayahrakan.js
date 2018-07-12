/** 「ザヤラカン」に対してザヤラカンの画像を返すだけのミドルウェア */
exports.middleware = (function() {

  var keywords = ['ザヤラカン'];

  /** ambient はメンション以外の何にでも反応する */
  var types = 'ambient';

  /** ザヤラカンのあの画像を表示するだけ */
  var handler = function(bot, message) {
    bot.reply(
      message,
      'https://pbs.twimg.com/media/DUFk6nVVMAEo2ZN.jpg'
    );
  };

  return {
    keywords: keywords,
    types: types,
    handler: handler,
  };

}());
