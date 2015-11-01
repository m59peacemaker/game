let StateMachine = require('javascript-state-machine');

module.exports = game => {

  let hero = {
    preload: preload,
    create: create,
    update: null,
    sprite: null,
    sm: null,
    cursors: null
  };

  function preload() {
    game.load.spritesheet('hero', 'assets/hero.png', 270, 270, 65);
  }

  function create() {

    let sprite = hero.sprite = game.add.sprite(0, game.height, 'hero', 64);
    game.physics.enable([sprite], Phaser.Physics.ARCADE);
    let body = sprite.body;
    sprite.body.collideWorldBounds = true;
    sprite.anchor.setTo(.5, 1);
    var sizes = {
      setDefault: () => body.setSize(80, 245),
      setCrouch: () => body.setSize(130, 155)
    };
    sizes.setDefault();
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
      ['jump', [42,43,44,45,46,47], 10, false],
      ['ascend-stairs', [48,49,50,51,52,53,54,55]],
      ['descend-stairs', [56,57,58,59,60,61,62,63]]
    ].forEach(item => sprite.animations.add.apply(sprite.animations, item));

    let sm = hero.sm = StateMachine.create({
      initial: 'standing',
      events: [
        //{name: 'hitground', from: ['falling'], to: ''},
        //{name: 'hitroof',   from: ['jumping'], to: ''},
        //{name: 'fall',      from: ['standing', 'running', 'jumping'], to: ''},
        {name: 'move',      from: ['standing', 'running'], to: 'running'},
        {name: 'jump',      from: ['standing', 'running'], to: 'jumping'},
        {name: 'stop',      from: ['standing', 'running'], to: 'standing'},
      ],
      callbacks: {
        onmove: (event, from, to, direction) => {
          if (direction === 'right') {
            runRight();
          } else if (direction === 'left') {
            runLeft();
          }
        },
        onstop: stand,
      }
    });

    function runRight() {
      sprite.scale.x = 1;
      sprite.animations.play('run');
      body.velocity.x = Math.max(body.velocity.x, 0);
      body.velocity.x = Math.min(body.velocity.x+30, 1000);
    }

    function runLeft() {
      sprite.scale.x = -1;
      sprite.animations.play('run');
      body.velocity.x = Math.min(body.velocity.x, 0);
      body.velocity.x = Math.max(body.velocity.x-30, -1000);
    }

    function stand() {
      body.velocity.x = decrease(body.velocity.x, 50);
      sprite.animations.stop();
      sprite.frame = 64;
    }

    function crouch() {
      sprite.animations.play('crouch');
      body.velocity.x = decrease(body.velocity.x, 30);
    }

    function jump() {
      sprite.animations.play('jump');
      body.velocity.y = -2500;
    }

    function onGround() {
      return body.touching.down || body.onFloor();
    }

    function decrease(val, amt) {
      return val < 0 ? Math.min(val + amt, 0) : Math.max(val - amt, 0);
    }

    let cursors = hero.cursors = game.input.keyboard.createCursorKeys();
    let jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    hero.update = () => {
      if (cursors.right.isDown || cursors.left.isDown) {
        sm.move(cursors.right.isDown ? 'right' : 'left');
      } else {
        sm.stop();
      }
    };

  }

  return hero;
};
