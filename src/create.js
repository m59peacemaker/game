let state    = require('./state');
let Hero     = require('./characters/hero');
let Platform = require('./objects/platform');

module.exports = (game) => {
  game.stage.backgroundColor = '#000000';
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 4000;

  let bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
  bg.fixedToCamera = true;

  state.platform = new Platform(game);
  state.p1 = new Hero(game);
  game.camera.follow(state.p1.sprite);
};
