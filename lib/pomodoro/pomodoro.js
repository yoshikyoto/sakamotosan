exports.timer = (function() {

  var start = function (
    startCallback,
    endCallback,
    refreshEndCallback,
    title,
    durationSeconds = 25 * 60,
    refreshSeconds = 5 * 60
  ) {
    let durationMillis = durationSeconds * 1000;
    let finishMillis = refreshSeconds * 1000 + durationMillis;
    startCallback(title, durationSeconds);

    setTimeout(function () {
      endCallback(title, refreshSeconds)
    }, durationMillis);

    setTimeout(function () {
      refreshEndCallback(title)
    }, finishMillis);
  };

  return {
    start: start
  };
}());
