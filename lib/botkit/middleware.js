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
}

module.exports = Middleware;
