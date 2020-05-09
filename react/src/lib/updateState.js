/*
  Author: Vahid Eyorokon

  Utility function to recursively update the state -> for nested state values.
  If the selectors do not already exist, the nested state objects will be created instead.
*/

function _recUpdateState(state, selector, newval) {
  if (selector.length > 1) {
    let field = selector.shift();
    let subObject = {};
    try {
      //Select the subObject if it exists
      subObject = {..._recUpdateState(state[field], selector, newval)};
    } catch {
      //Create the subObject if it doesn't exist.
      subObject = {..._recUpdateState(state, selector, newval)};
    }
    return {...state, [field]: subObject};
  } else {
    let updatedState = {};
    updatedState[selector.shift()] = newval;
    return {...state, ...updatedState};
  }
}

export default function updateState(
  state,
  selector,
  newval,
  autoAssign = true
) {
  let newState = _recUpdateState(state, selector, newval);
  if (autoAssign) return Object.assign({}, state, newState);
  return newState;
}
