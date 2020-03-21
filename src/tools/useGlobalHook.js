import {useState, useEffect, useRef} from 'react';
import { deepEqual, deepCopy } from '@/tools';

function setState(newState) {

  let _newState = {}
  // 拷贝全局状态
  const prevState = deepCopy(this.state);

  if ( typeof newState === 'function' ) {
    _newState = newState(prevState)
  } else {
    _newState = {...prevState , ...newState}
  }

  if(deepEqual(_newState, this.state)){
    return ;
  };

  const listeners = (this.listeners = this.nextListeners)

  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i]
    listener(_newState)
  }

}

/**
 * @param {mapState} Array 组件获取的对应全局状态变量数组
*/

function useCustom( mapState = []) {
  
  const newListener = useState(0)[1];

  const latestState = useRef();

  //  保存组件对应依赖的最新值
  latestState.current = this.state;

  //  对比传入的对象是否含有对应的依赖对象
  const selector = (newState) => {
    const r = mapState.filter( i =>  newState[i]) 
    return r;
  }

  //  更新前检查
  const checkForUpdates = (newState) => {

    // 对应的依赖对象数组
    let _newKeys = selector(newState);

    if( _newKeys.length < 1 ) {
      return;
    }

    let _r = [];

    //  循环对比组件依赖变量的是否改变
    for ( let i = 0; i < _newKeys.length; i++ ) {
      if ( newState[_newKeys[i]] && latestState.current && deepEqual(newState[_newKeys[i]], latestState.current[_newKeys[i]])) {
        _r.push(true)
      }else {
        _r.push(false)
      }
    }

    if (!_r.includes(false)) {
      return ;
    }
    
    this.state = newState;

    // 触发react hook 的页面刷新
    newListener(s => s + 1)
  }

  useEffect(() => {

    // 拷贝订阅之前的函数 主要防止订阅的函数中有取消订阅的行为
    const ensureCanMutateNextListeners = () => {
      console.log(this.listeners === this.nextListeners)
      if (this.listeners === this.nextListeners) {
        this.nextListeners = this.listeners.slice()
      }
    }

    ensureCanMutateNextListeners()

    //增加订阅函数
    this.nextListeners.push(checkForUpdates);

    return () => {

      ensureCanMutateNextListeners()
      // 组件被销毁后 需要停止订阅
      this.nextListeners = this.nextListeners.filter( listener => listener !== checkForUpdates)
    }

  },[])

  //  只输出组件依赖的全局状态
  let result = {};

  mapState.map(i => {
    result[i] = this.state[i]
  })
  
  return [result, this.actions]

}

function associateActions(store, actions) {

  const associateActions = {}

  Object.keys(actions).forEach( key => {
    if (typeof actions[key] === 'function') {
      associateActions[key] = actions[key].bind(null, store.setState)
    }
    if(typeof actions[key] === 'object') {
      associateActions[key] = associateActions(store, actions[key])
    }
  })

  return associateActions
}

const useGlobalHook = (initialState = {}, actions) => {

  const store = { state: initialState, listeners: [] };

  store.nextListeners = store.listeners;

  store.setState = setState.bind(store)

  store.actions = associateActions(store, actions)

  return useCustom.bind(store)

}

export default useGlobalHook
