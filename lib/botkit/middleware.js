/** Botkitのcontrollerにhearsを追加していく処理 */
exports.append = function(controller, middleware) {
  controller.hears(
    middleware.keywords,
    middleware.types,
    middleware.handler
  );
};
