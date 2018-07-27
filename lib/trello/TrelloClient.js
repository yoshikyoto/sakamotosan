let axios = require('axios');

/**
 * https://trello.readme.io/docs/api-introduction
 */
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
      })
    });
  }

  getActiveLists(boardId) {
    return this.client.get(`/1/board/${boardId}/lists`, {
      params: {
        key: this.key,
        token: this.token,
      }
    }).then((response) => {
      return response.data;
    })
  }

  getList(boardId, listName) {
    return this.getActiveLists(boardId).then((lists) => {
      for (let list of lists) {
        if (list.name === listName) {
          return list;
        }
      }
      // 該当のリストが見つからなかった場合
      return null;
    });
  }

  /** closedになっていないカードを返す */
  getActiveCards(boardId) {
    return this.client.get(`/1/board/${boardId}/cards`, {
      params: {
        key: this.key,
        token: this.token,
      }
    }).then((response) => {
      return response.data.filter((card) => {
        return !card.closed;
      });
    })
  }

  /** boardId, listId に該当するカードを返す */
  getActiveCardsOnList(boardId, listId) {
    return this.getActiveCards(boardId).then((cards) => {
      return cards.filter((card) => {
        return card.idList === listId;
      });
    });
  }
}

module.exports = TrelloClient;
