class Middleware {
  install(controller) {
    controller.hears(
      this.keywords,
      this.types,
      this.handler
    )
  }

  get keywords() {
    throw new Error('keywordsメソッドが実装されていません');
  }

  get types() {
    throw new Error('typesメソッドが実装されていません');
  }

  get handler() {
    throw new Error('handlerメソッドが実装されていません');
  }

  // ここから下は増えてきたら切り分けるべき
  chooseRondomeFromArray(texts) {
    return texts[Math.floor(Math.random() * texts.length)]
  }
}

module.exports = Middleware;
