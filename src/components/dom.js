import React, { useEffect, useState } from 'react';
import store from '@/store'

function Dom (){

  const [$state, $dispath] = store(['keys', 'count'])

  useEffect(() => {
    console.log(123)
  })

  return (
    <div >
      <p onClick={() => $dispath['setCount']({
    index: 1,
    keys: {
      index: 1
    }
  })}>dom</p>
      <p>{$state.count.index}</p>
      <p>{$state.keys}</p>
      <p onClick={() => $dispath['setKeys']()}>key</p>
    </div>
  );

}
export default Dom