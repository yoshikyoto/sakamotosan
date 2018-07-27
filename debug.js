require('dotenv').config()
let key = process.env.TRELLO_KEY;
let token = process.env.TRELLO_TOKEN;
let boardId = '5642993355b420c29879bd78';

let TrelloClient = require('./lib/trello/TrelloClient.js');
let trello = new TrelloClient(key, token);

trello.getList(boardId, 'TODO').then((list) => {
  let listId = list.id;
  trello.getActiveCardsOnList(boardId, listId).then((cards) => {
    for (let card of cards) {
      console.log(card.name);
    }
  });
});
