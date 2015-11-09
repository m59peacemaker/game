module.exports = function(game) {
  require('./characters/hero/preload')(game);
  require('./objects/platform/preload')(game);
  game.load.image('background', 'assets/starry-night-sky.jpg');
}
