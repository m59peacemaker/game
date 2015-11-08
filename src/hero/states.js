module.exports = function(agent) {

  let {sprite, body, animations, sm, getVelocity, getMovement} = agent;

  function decrease(val, amt) {
    return val < 0 ? Math.min(val + amt, 0) : Math.max(val - amt, 0);
  }

  let size = {
    setDefault: () => body.setSize(80, 245),
    setCrouch: () => body.setSize(130, 155)
  };
  size.setDefault();

  return {
    standing: {
      enter: () => {
        animations.stop();
        sprite.frame = 64;
      },
      events: {
        fall: 'falling',
        jump: 'jumping',
        move: 'running',
        down: 'crouching'
      }
    },
    crouching: {
      enter: (params) => {
        size.setCrouch();
        if (!params.wasSliding) {
          animations.play('crouch');
        }
      },
      exit: size.setDefault,
      events: {
        mid: 'standing'
      }
    },
    running: {
      enter: () => {
        animations.play('run');
      },
      update: () => {
        let {xv} = getVelocity();
        let {xm} = getMovement();
        // flip character
        sprite.scale.x = xm;
        //body.velocity.x = 1000 * xm;
        // gain speed up to max
        let max = 1000;
        let gain = 30;
        let newXv = xv;
        if (xm > 0) {
          newXv = Math.max(xv, 0);
          newXv = Math.min(newXv+gain, max);
        } else {
          newXv = Math.min(xv, 0);
          newXv = Math.max(newXv-gain, -max);
        }
        body.velocity.x = newXv;
      },
      events: {
        fall: 'falling',
        jump: 'jumping',
        stop: 'sliding'
      }
    },
    sliding: {
      enter: () => {
        animations.play('descend-stairs'); // in lieu of sliding
      },
      events: {
        move: 'running',
        down: 'slidingCrouched',
        jump: 'jumping',
        mid: 'standing'
      },
      update: () => {
        if (body.velocity.x) {
          body.velocity.x = decrease(body.velocity.x, 40);
        } else {
          sm.setState('standing');
        }
      }
    },
    slidingCrouched: {
      enter: () => {
        animations.play('crouch'); //todo: slidingCrouched animation
        size.setCrouch();
      },
      exit: () => {
        size.setDefault();
      },
      events: {
        mid: 'sliding',
        jump: 'jumping'
      },
      update: () => {
        body.velocity.x = decrease(body.velocity.x, 40);
        if (!body.velocity.x) {
          sm.setState('crouching', {wasSliding: true});
        }
      }
    },
    falling: {
      update: () => {
        let {xv, yv} = getVelocity()
        let {xm, ym} = getMovement()
        //agent.setVelocity(xv + 150*xm*dt, yv)
      },
      events: {
        hitground: () => {
          let {xm, ym} = getMovement()
          xm ? sm.setState('running') : sm.setState('standing');
        }
      }
    },
    jumping: {
      enter: () => {
        animations.play('jump');
        let {xv, yv} = getVelocity();
        body.velocity.y = -1600;
      },
      update: () => {
        let {xv, yv} = getVelocity();
        let {xm, ym} = getMovement();
        // make jump a minimum amount, more if held
        if (!ym && (yv > -1000 && yv < 0)) {
          body.velocity.y = 0;
        }
      },
      events: {
        move: () => {
          let {xv, yv} = getVelocity();
          let {xm} = getMovement();
          sprite.scale.x = xm;
          if (xm > 0) {
            body.velocity.x = Math.min(xv + 30, 1000);
          } else if (xm < 0) {
            body.velocity.x = Math.max(xv -30, -1000);
          }
        },
        hitground: () => {
          let {xm, ym} = getMovement();
          xm ? sm.setState('running') : sm.setState('sliding');
        }
      }
    },
  };
};
