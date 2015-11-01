let Hero = require('./Hero');

var width = 1920;
var height = 1080;

var game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaser-example', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

var hero = new Hero(game);

function preload() {
  hero.preload();
  game.load.image('background', 'assets/starry-night-sky.jpg');
}

var cursors;
var jumpButton;
var bg;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.stage.backgroundColor = '#000000';
  game.physics.arcade.gravity.y = 4000;

  bg = game.add.tileSprite(0, 0, width, height, 'background');
  bg.fixedToCamera = true;

  hero.create();
  game.camera.follow(hero.sprite);
}

function update() {
  hero.update();
}

function render () {
  game.debug.text(game.time.physicsElapsed, 32, 32);
  game.debug.body(hero.sprite);
  game.debug.bodyInfo(hero.sprite, 16, 24);
}
