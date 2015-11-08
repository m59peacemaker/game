let addAnimations = require('./add-animations');
let preload = require('./preload');
let Update = require('./update');
var States = require('./states');
var StateMachine = require('../state-machine');

module.exports = Hero;

Hero.preload = preload;

function Hero(game) {

  let cursors = game.input.keyboard.createCursorKeys();
  let jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  let sprite = game.add.sprite(0, game.height, 'hero', 64);
  game.physics.enable([sprite], Phaser.Physics.ARCADE);
  sprite.anchor.setTo(.5, 1);
  addAnimations(sprite);

  let body = sprite.body;
  body.collideWorldBounds = true;

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
    sprite: sprite,
    body: sprite.body,
    animations: sprite.animations,
    getVelocity: getVelocity,
    getMovement: getMovement
  };
  hero.sm = new StateMachine('standing');
  hero.sm.addStates(States(hero));
  hero.update = Update(hero);
  return hero;
}
