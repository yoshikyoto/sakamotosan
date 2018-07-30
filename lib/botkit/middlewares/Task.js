let Middleware = require('../middleware.js');
let TrelloClient = require('../../trello/TrelloClient.js');

/** タスク管理ミドルウェア */
class Task extends Middleware {

  /** タスクが文字列に含まれている場合のみ反応 */
  get keywords() {
    return ['タスク'];
  }

  /** メンションの場合のみ反応 */
  get types() {
    return 'direct_mention';
  }

  get key() {
    return process.env.TRELLO_KEY;
  }

  get token() {
    return process.env.TRELLO_TOKEN;
  }

  get boardId() {
    return '5642993355b420c29879bd78';
  }

  get handler() {
    let trello = new TrelloClient(this.key, this.token);
    let boardId = this.boardId
    return function(bot, message) {
      trello.getList(boardId, 'TODO').then((list) => {
        let listId = list.id;
        trello.getActiveCardsOnList(boardId, listId).then((cards) => {
          let cardNames = cards.map(card => card.name);
          let text = cardNames.map(name => '* ' + name).join("\n");
          bot.reply(message, text);
        });
      });
    }
  }
}

module.exports = Task
