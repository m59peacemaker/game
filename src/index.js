var width = 1920;
var height = 1080;

var game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaser-example', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

function preload() {
  game.load.spritesheet('hero', 'assets/hero.png', 270, 270, 65);
  game.load.image('background', 'assets/starry-night-sky.jpg');
}

var hero;
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

  hero = game.add.sprite(0, height, 'hero', 64);
  game.physics.enable([hero], Phaser.Physics.ARCADE);
  hero.body.collideWorldBounds = true;

  [
    ['stance', [0,1,2,3]],
    ['run', [4,5,6,7,8,9,10,11], 10, true],
    ['swing', [12,13,14,15]],
    ['block', [16,17]],
    ['hit and die', [18,19,20,21,22,23]],
    ['spell', [24,25,26,27]],
    ['shoot-bow', [28,29,30,31]],
    ['walk', [32,33,34,35,36,37,38,39]],
    ['crouch', [40,41], 20, false],
    ['jump', [42,43,44,45,46,47], 1, false],
    ['ascend-stairs', [48,49,50,51,52,53,54,55]],
    ['descend-stairs', [56,57,58,59,60,61,62,63]]
  ].forEach(item => hero.animations.add.apply(hero.animations, item));

  hero.body.setSize(80, 245);
  hero.anchor.setTo(.5, 1);

  game.camera.follow(hero);

  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

var jumping = false;
var crouching = false;

function update() {
  checkCrouch();
  if (!crouching) {
    hero.body.velocity.x = 0;
  }

  checkJump();

  if (cursors.right.isDown) {
    if (!jumping && !crouching) {
      hero.animations.play('run');
    }
    hero.scale.x = 1;
    if (crouching) {
     hero.body.velocity.x = Math.max(hero.body.velocity.x-30, 0);
    } else {
      hero.body.velocity.x = 1000;
    }
  } else if (cursors.left.isDown) {
    if (!jumping && !crouching) {
      hero.animations.play('run');
    }
    hero.scale.x = -1;
    if (crouching) {
     hero.body.velocity.x = Math.min(hero.body.velocity.x+30, 0);
    } else {
      hero.body.velocity.x = -1000;
    }
  } else if (!jumping && !crouching) {
    hero.animations.stop();
    hero.frame = 64;
  }
}

function checkCrouch() {
  if (cursors.down.isDown && !crouching) {
    crouching = true;
    hero.animations.play('crouch');
  } else if (!cursors.down.isDown && crouching) {
    crouching = false;
  }
}

var hasEndedJump = true;
var holdingKey = false;

function onGround() {
  return hero.body.touching.down || hero.body.onFloor();
}

function checkJump() {
  if (hasEndedJump && jumpButton.isDown && onGround()) {
    hasEndedJump = false;
    hero.body.velocity.y = -2500;
    holdingKey = true;
    hero.animations.play('jump');
    jumping = true;
    return;
  }
  if (holdingKey && jumpButton.isUp) {
    holdingKey = false;
  }
  if (jumping && onGround()) {
    jumping = false;
  }
  if (!hasEndedJump && !jumping && !holdingKey) {
    hasEndedJump = true;
  }
  if (jumping) {
    hero.body.velocity.y+= 50;
  }
}

function render () {
  game.debug.text(game.time.physicsElapsed, 32, 32);
  game.debug.body(hero);
  game.debug.bodyInfo(hero, 16, 24);

}
