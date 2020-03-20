import { deepCopy } from "../tools";

let store;

function getInstance(param) { 
  if(!store) store = createStore();
  return store;
}

function createStore() {
  let currentState = {};

  let currentReducer = function (state, action) { 
    return state
  }

  let currentReducerSet = {}

  function addReducer(reducers) {  

    currentReducerSet = Object.assign(currentReducerSet, reducers);

    currentReducer = function (state, action) {  
      let cumulativeState = {};

      for ( key in currentReducerSet ) {
        cumulativeState[key] = currentReducerSet[key](state[key], action)
      }
      return cumulativeState;
    }
  }

  let subscribers = [];
  // add subscribers
  function subscribe(fn) {  
    subscribers.push(fn)
  }
  // remove subscribers
  function unsubscribe(fn) {  
    subscribers.splice(subscribers.indexOf(fn), 1);
  }

  function dispatch(action) {

    let prevState = currentState;

    currentState = currentReducer(deepCopy(currentState), action);
    // 触发对应的的变量函数
    subscribers.forEach(subscriber => {
      subscriber(currentState, prevState);
    })
  }

  return {
    dispatch: dispatch,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
  };
}

export default getInstance();