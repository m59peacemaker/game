let States = require('./states');

module.exports = function(agent) {

  let {body, sm} = agent;
  let state = agent.state = {};

  function onGround() {
    return body.touching.down || body.onFloor();
  }

  function update() {
    let {xm, ym} = agent.getMovement();
    let {xv, yv} = agent.getVelocity();

    let wasGrounded = state.grounded;
    state.grounded = onGround();

    let wasDown = state.down;
    state.down = ym < 0;

    let jumpPressed = ym > 0;

    if (!state.releasedJump && !jumpPressed) {
      state.releasedJump = true;
    }

    if (state.grounded && !wasGrounded) {
      sm.trigger('hitground');
    }
    if (!state.grounded && wasGrounded && !jumpPressed) {
      sm.trigger('fall');
    }
    if (xm) {
      sm.trigger('move');
    }
    if (ym > 0 && state.releasedJump) {
      state.releasedJump = false;
      sm.trigger('jump');
    }

    if (ym < 0) {
      sm.trigger('down');
    } else if (!ym && wasDown) {
      sm.trigger('mid');
    }

    if (!xm) {
      sm.trigger('stop');
    }

    if (state.grounded) {
      //agent.shape.friction = 1;
    } else {
      //agent.shape.friction = 0;
    }

    sm.updateState(Object.assign(agent.getMovement(), agent.getVelocity()));
  }

  return update;
};
