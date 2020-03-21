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

  let currentListeners = []
  let nextListeners = currentListeners

  // 拷贝之前的订阅函数 主要防止订阅的函数中有取消订阅的行为
  const ensureCanMutateNextListeners = () => {
    if (currentListeners === nextListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  /**
   *  @param {Object} reducers 修改的行为集合 可多个集合
   *    目前感觉此处可以优化没有比较如此复杂 待优化
   * */  
  function addReducer(reducers) {  
    currentReducerSet = Object.assign(currentReducerSet, reducers);
    /**
     * @param {Object} state 目前全局状态的数据
     * @param {Object} action 修改状态的某个行为 {type：a, payload: c}
    */
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

    // 修改行为之后的全局状态
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
    getState: store.getState()
  };
}

export default getInstance();