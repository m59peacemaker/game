module.exports = (sprite) => {
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
    ['jump', [42,43,44], 30, false],
    ['fall', [45,46,47], 10, false],
    ['ascend-stairs', [48,49,50,51,52,53,54,55], 10, true],
    ['descend-stairs', [56,57,58,59,60,61,62,63], 10, true]
  ].forEach(item => sprite.animations.add.apply(sprite.animations, item));
};
