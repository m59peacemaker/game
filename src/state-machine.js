module.exports = function(initialState) {

  let states = {};
  let currentState = initialState;

  function setState(state, ...args) {
    let newState = states[state];
    if (!newState) { throw new Error(`Invalid state: ${state}`); }
    if (states[currentState].exit) {
      states[currentState].exit();
    }
    currentState = state
    if (states[currentState].enter) {
      args[0] = args[0] || {};
      states[currentState].enter(...args);
    }
  }

  function updateState() {
    states[currentState].update && states[currentState].update();
  }

  function trigger(event, ...args) {
    let state = states[currentState];
    if (state && state.events && state.events[event]) {
      let cb = state.events[event];
      if (typeof cb === 'string') {
        setState(cb);
      } else {
        cb(...args);
      }
    }
  }

  function getCurrentState() {
    return currentState;
  }

  function addStates(newStates) {
    Object.assign(states, newStates);
  }

  return {
    addStates: addStates,
    getCurrentState: getCurrentState,
    setState: setState,
    updateState: updateState,
    trigger: trigger
  };
}
