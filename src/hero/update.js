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

    let isGrounded = onGround();
    let wasGrounded = agent.grounded;
    state.grounded = isGrounded;

    let wasDown = state.down;
    state.down = ym < 0;

    if (isGrounded && !wasGrounded) {
      sm.trigger('hitground');
    }
    if (!isGrounded && wasGrounded) {
      sm.trigger('fall');
    }
    if (xm) {
      sm.trigger('move');
    }
    if (ym > 0 && state.jumpKeyAllowed) {
      sm.trigger('jump');
    }
    state.jumpKeyAllowed = isGrounded && ym < 1;

    if (ym < 0) {
      sm.trigger('down');
    } else if (!ym && wasDown) {
      sm.trigger('mid');
    }

    if (!xm) {
      sm.trigger('stop');
    }

    if (isGrounded) {
      //agent.shape.friction = 1;
    } else {
      //agent.shape.friction = 0;
    }

    sm.updateState();
  }

  return update;
};
