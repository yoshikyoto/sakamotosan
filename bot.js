let Botkit = require('botkit');
let TrelloClient = require('./external/trello/TrelloClient.js');

// .envを環境変数の値としてセット
require('dotenv').config()

let controller = Botkit.slackbot({
  debug: process.env.DEBUG,
});

// Real Time Messaging API 開始
let bot = controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

controller.hears(
  ['タスク'],
  'ambient',
  function(bot, message) {
    console.log(message.channel);
    let trello = new TrelloClient(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);
    // 指定した名前のリストのIDを取得し、
    // そのIDからリストに含まれるチケットを全て取得する
    trello.getList(
      process.env.TRELLO_BOARD_ID,
      process.env.TRELLO_LIST_NAME
    ).then((list) => {
      trello.getActiveCardsOnList(
        process.env.TRELLO_BOARD_ID,
        list.id
      ).then((cards) => {
        let cardNames = cards.map(card => card.name);
        let text = cardNames.map(name => '- ' + name).join("\n");
        bot.reply(message, text);
      }).catch((error) => {
        bot.reply(message, 'なんかあかんかったわ。');
      });
    }).catch((error) => {
      bot.reply(message, 'なんかあかんかったわ。ボードIDかリスト名がおかしいんちゃう。');
    });
  }
);


let timerComment = function() {
  let trello = new TrelloClient(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);

  // 指定した名前のリストのIDを取得し、
  // そのIDからリストに含まれるチケットを全て取得する
  trello.getList(
    process.env.TRELLO_BOARD_ID,
    process.env.TRELLO_LIST_NAME
  ).then((list) => {
    trello.getActiveCardsOnList(
      process.env.TRELLO_BOARD_ID,
      list.id
    ).then((cards) => {
      let cardNames = cards.map(card => card.name);
      let text = cardNames.map(name => '- ' + name).join("\n");
      bot.say({
        text: text,
        channel: process.env.SLACK_CHANNEL_ID,
      });
    });
  });
}

setInterval(timerComment, 30 * 60 * 1000)
timerComment();
