module.exports = Platform;

function Platform(game) {
  let sprite = game.add.sprite(800, game.height-300, 'platform');
  //sprite.anchor.setTo(0, 1);
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  let body = sprite.body;
  body.immovable = true;
  body.allowGravity = false;
  ['left', 'right', 'down'].forEach(direction => {
    body.checkCollision[direction] = false;
  });
  body.setSize(sprite.body.width, sprite.body.height-10, 0, 10);
  return {
    sprite,
    body
  };
}
