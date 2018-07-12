class Middleware {
  install(controller) {
    controller.hears(
      this.keywords,
      this.types,
      this.handler
    )
  }

  get keywords() {
    throw new Error('keywordsメソッドが実装されていません: ' + this);
  }

  get types() {
    throw new Error('keywordsメソッドが実装されていません: ' + this);
  }

  get handler() {
    throw new Error('keywordsメソッドが実装されていません: ' + this);
  }
}

module.exports = Middleware;
