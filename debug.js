let axios = require('axios');
require('dotenv').config()

let key = process.env.TRELLO_KEY;
let token = process.env.TRELLO_TOKEN;

let boardId = '5642993355b420c29879bd78';

let client = axios.create({
  baseURL: 'https://api.trello.com'
});

let path = `/1/boards/${boardId}/cards`;

client.get(path, {
  params: {
    key: key,
    token: token,
  }
}).then((response) => {
  for(let card of response.data) {
    console.log(card.name);
  }
}).catch((error) => {
  console.log("api error");
  console.log(error);
});
