require('dotenv').config()
let TrelloClient = require('../external/trello/TrelloClient.js');

module.exports = function (bot, message) {
  var workingDurationHour = 0;

  // 1時間ごとにコメントする
  let timerComment = function() {
    let trello = new TrelloClient(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);

    // 9時間でループ終了
    if (workingDurationHour > 9) {
      bot.reply(message, [
        '出勤から9時間経ったぞ。退勤を押して按分を入力するんだ。',
        process.env.KINTAI_URL,
      ].join("\n"));
      return;
    }

    if (workingDurationHour === 0) {
      // 出勤時
      bot.reply(message, [
        '出勤打刻をしろ',
        process.env.KINTAI_URL,
      ].join("\n"));
    } else {
      // それ以外
      bot.say({
        text: randomWorkingText(),
        channel: message.channel,
      });
    }

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
          text: "*今抱えているタスクはこんな感じだ* \n" + text + "\n" + process.env.TRELLO_BOARD_URL,
          channel: message.channel,
        });
      });
    });
    workingDurationHour++;
    setTimeout(timerComment, 60 * 60 * 1000);
  }
  timerComment();
}

function randomWorkingText() {
  texts = require('../conf/RandomText.js');
  return texts[Math.floor(Math.random() * texts.length)];
}
