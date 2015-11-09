let addAnimations = require('./add-animations');
let Update = require('./update');
var States = require('./states');
var StateMachine = require('../../state-machine');

module.exports = Hero;

function Hero(game) {

  let sprite = game.add.sprite(0, 600, 'hero', 64);
  sprite.anchor.setTo(.5, 1);
  addAnimations(sprite);
  game.physics.enable(sprite, Phaser.Physics.ARCADE);

  let body = sprite.body;
  body.collideWorldBounds = true;

  let cursors = game.input.keyboard.createCursorKeys();
  let jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  function getMovement() {
    let xm = 0
    if (cursors.right.isDown) {
      xm = 1;
    } else if (cursors.left.isDown) {
      xm = -1;
    }

    let ym = 0;
    if (jumpButton.isDown) {
      ym = 1;
    } else if (cursors.down.isDown) {
      ym = -1;
    }
    return {
      xm: xm,
      ym: ym
    };
  }

  function getVelocity() {
    return {
      xv: body.velocity.x,
      yv: body.velocity.y
    };
  }


  var hero = {
    sprite,
    body: sprite.body,
    animations: sprite.animations,
    getVelocity,
    getMovement
  };
  hero.sm = new StateMachine('standing');
  hero.sm.addStates(States(hero));
  hero.update = Update(hero);
  return hero;
}
