import React, {useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import { share } from '@/tools';
import store from '@/store';
import Dom from '@/components/dom';
import { deepCopy } from '@/tools'

share.config({
  url: 'http://activities-test.mini.me/fe/avs4/',
  pics: 'https://image.mini1.cn/b/20200316/68bb14da94dcc6f648713bcbe77c3d2e.png',
})


function App() { 

  const [$state, $dispath] = store(['keys'])

  useEffect(() => {
    console.log('main')
  })

  return (
    <div >
      <div>
        <Dom />
      </div>
      {/* <div>{$state.keys}</div> */}
    </div>
  )
 }

ReactDom.render(<App />, document.getElementById('root'));