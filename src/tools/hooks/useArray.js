import { useState, useCallback } from 'react';

/**
 * 简化数组状态操作
 * @param {Array} inital 初始数组
 * @param {string} idKey 对比值
*/

export default function useArray(inital, idKey) {
  const [value, setValue] = useState( inital || []);

  return {
    value,
    setValue,
    push: useCallback( a => setValue(v => [...v, a]), []),
    clear: useCallback(() => setValue(() => []), []),
    removeIndex: useCallback( index => setValue(arr => arr.splice(index, 1)), [])
  }
}