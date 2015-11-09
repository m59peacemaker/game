new Phaser.Game(1920, 1080, Phaser.CANVAS, 'my-game', {
  preload: require('./preload'),
  create:  require('./create'),
  update:  require('./game-loop'),
  render:  require('./render')
});
