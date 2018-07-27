require('dotenv').config()
let key = process.env.TRELLO_KEY;
let token = process.env.TRELLO_TOKEN;

let TrelloClient = require('./lib/trello/TrelloClient.js');
let trello = new TrelloClient(key, token);
trello.getActiveBoards().then((boards) => {
  for (let board of boards) {
    console.log(board.id + ' ' + board.name);
  }
});
