require('dotenv').config()

let TrelloClient = require('./external/trello/TrelloClient.js');
let trello = new TrelloClient(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);
trello.getActiveBoards().then((boards) => {
  for (let board of boards) {
    console.log(board.id + ' ' + board.name);
  }
});
