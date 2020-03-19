import {useState, useEffect, useRef} from 'react';
import { deepEqual, deepCopy } from '@/tools'

function setState(newState) {

  // this.state = { ...this.state, ...newState }
  // this.state = Object.assign(this.state, newState)

  this.listeners.forEach( (listener) => {
    // listener(this.state)
    listener(newState)
  })

}

/**
 * @param {mapState} Array 组件获取的对应全局状态变量数组
*/

function useCustom( mapState = []) {
  
  const newListener = useState(0)[1];

  const latestState = useRef();

  latestState.current = this.state

  //  对比传入的对象是否导出的对象
  const selector = (newState) => {
    // let key = Object.keys(newState);
    const r = mapState.filter( i =>  newState[i]) 
    return r;
  }

  //  更新前检查
  const checkForUpdates = (newState) => {

    let _newKeys = {};

    let _newState = {}

    // 函数模式下 如果不是以赋值的形式改变原有的某属性 比如计算  state++ 会触发多次 暂时无法优化
    if ( typeof newState === 'function' ) {
      const stateCopy = deepCopy(this.state)
      _newState = newState(stateCopy)
      _newKeys = selector(_newState)
    } else {
      _newKeys = selector(newState)
      _newState = newState
    }

    let _new = {}

    if( _newKeys.length < 1 ) {
      return;
    }

    let _r = [];

    //  循环对比组件依赖变量的是否改变
    for ( let i = 0; i < _newKeys.length; i++ ) {
      if ( _newState[_newKeys[i]] && latestState.current && deepEqual(_newState[_newKeys[i]], latestState.current[_newKeys[i]])) {
        let deepFlag = deepEqual(_newState[_newKeys[i]], latestState.current[_newKeys[i]])
        _r.push(deepFlag)
      }else {
        _r.push(false)
        _new[_newKeys[i]] =  _newState[_newKeys[i]]
      }
    }

    if (!_r.includes(false)) {
      return ;
    }
    

    //  保存组件对应依赖的最新值
    latestState.current = _new;

    this.state = {...this.state ,..._newState};

    newListener(s => s + 1)
  }

  useEffect(() => {
    //组件加载执行
    this.listeners.push(checkForUpdates);


    return () => {
      // 组件被销毁后 需要停止订阅
      this.listeners = this.listeners.filter( listener => listener !== checkForUpdates)
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
      associateActions[key] = actions[key].bind(null, store)
    }
    if(typeof actions[key] === 'object') {
      associateActions[key] = associateActions(store, actions[key])
    }
  })

  return associateActions
}

const useGlobalHook = (initialState, actions) => {

  const store = { state: initialState, listeners: [] }

  store.setState = setState.bind(store)

  store.actions = associateActions(store, actions)

  return useCustom.bind(store)

}

export default useGlobalHook
