var Botkit = require('botkit');
var os = require('os');
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
        'https://pbs.twimg.com/media/DUFk6nVVMAEo2ZN.jpg');
    }
);
