import {useState, useEffect} from 'react'
function setState(newState) {

  this.state = { ...this.state, ...newState }

  this.listeners.forEach( (listener) => {
    listener(this.state)
  })

}

function useCustom() {
  
  const newListener = useState()[1]

  useEffect(() => {
    //组件加载执行
    this.listeners.push(newListener)
    return () => {
      //组件卸载之前执行
      this.listeners = this.listeners.filter( listener => listener !== newListener)
    }

  },[])
  
  return [this.state, this.actions]

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
