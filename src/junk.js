game.load.tilemap('level1', 'assets/games/starstruck/level1.json', null, Phaser.Tilemap.TILED_JSON);
game.load.image('tiles-1', 'assets/phaser-assets/games/starstruck/tiles-1.png');

var map;
var tileset;
var layer;

map = game.add.tilemap('level1');
map.addTilesetImage('tiles-1');
map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);
layer = map.createLayer('Tile Layer 1');
layer.debug = true;
layer.resizeWorld();
game.physics.arcade.gravity.y = 4000;

//var platforms = generatePlatforms();
/// game.debug.body(platforms);
//game.physics.enable(platforms, Phaser.Physics.ARCADE);

var platforms;
function generatePlatforms() {
  platforms = game.add.group();
  platforms.enableBody = true;
  platforms.physicsBodyType = Phaser.Physics.ARCADE;

  // start off on the left 220px above the ground
  var x = 0, y = height - 520;

  // keep adding platforms until close to the top
  while(y > 200) {
    var platformWidth = game.rnd.integerInRange(200, 10000);
    var platform = platforms.create(x, y, 'tiles-1', 50, 50);
    platform.body.immovable = true;
    platform.body.allowGravity = false;

    // find center of game canvas
    var center = width / 2;

    if(x > center) {
      // if the last platform was to the right of the 
      // center, put the next one on the left
      x = Math.random() * center;
    }
    else {
      // if it was on the left, put the next one on the right
      x = center + Math.random() * (center - platformWidth);
    }
    // place the next platform at least 200px higher and at most 300px higher 
    y = y - 200 - 100 * Math.random();
  }
  return platforms;
}
