let axios = require('axios');

class TrelloClient {
  
  constructor(key, token) {
    this.key = key;
    this.token = token;
    this.client = axios.create({
      baseURL: 'https://api.trello.com'
    });
  }

  getActiveBoards() {
    return this.client.get('/1/members/me/boards', {
      params: {
        key: this.key,
        token: this.token,
      }
    }).then((response) => {
      // closeされていないボードだけ返す
      return response.data.filter((board) => {
        return !board.closed;
      });
    });
  }
}

module.exports = TrelloClient;
