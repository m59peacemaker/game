let state = require('./state');

module.exports = (game) => {
  game.physics.arcade.collide(state.p1.sprite, state.platform.sprite);
  state.p1.update();
};
