import { useState, useCallback } from 'react';

/**
 * 通过自定义Hooks封装和简化本地数据的存取
 * @param {string} key 本地数据key值
 * @param {object | function} defaultValue 设置默认值
 * @param {boolean} keepOnWindowClosed 是否在窗口关闭后保存数据
 * */ 
export default function useStorage(key, defaultValue, keepOnWindowClosed) {
  const storage = keepOnWindowClosed ? localStorage : sessionStorage;

  // 尝试从Storage获取值
  const getStorageValue = () => {
    try {
      const storageValue = storage.getItem(key);
      if(storageValue !== null) {
        return JSON.parse(storageValue);
      }else if(defaultValue) {
        const value = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
        storage.setItem(key, JSON.stringify(value))
        return value;
      }
    } catch (error) {
      console.warn(`useStorage 无法获取${key}: `, err)
    }
    return undefined;
  }

  const [value, setValue] = useState(getStorageValue);

  // 更新组件状态并保存到Storage
  const save = useCallback( value => {
    setValue( prev => {
      const finalValue = typeof value === 'function' ? value(prev) : value;
      storage.setItem(key, JSON.stringify(finalValue));
      return finalValue; 
    })
  }, [])


  const clear = useCallback(()=>{
    storage.removeItem(key)
    setValue(undefined)
  }, [])

  return [value, save, clear]

}