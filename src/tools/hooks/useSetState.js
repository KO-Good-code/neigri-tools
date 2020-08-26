import { useState, useCallback } from 'react';

/**
 * 二次封装useState
 * @param {object} initalState 初始值
 * */ 
function useSetState( initalState ) {

  const [_state, _setState] = useState(initalState);

  const setState = useCallback((state)=> {
    _setState( prev => {
      let nextState = state;
      if(typeof state === 'function') {
        nextState = state(prev);
      }

      return { ...prev, ...nextState}
    })
  }, [])

  return [_state, setState]
}

export default useSetState;