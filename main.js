import React, {useEffect, useState, useRef} from 'react';
import ReactDom from 'react-dom';
// import { share } from '@/tools';
// import store from '@/store';
// import Dom from '@/components/dom';
import { useSetState, useStorage, OverLoading } from '@/tools'

// share.config({
//   url: 'http://activities-test.mini.me/fe/avs4/',
//   pics: 'https://image.mini1.cn/b/20200316/68bb14da94dcc6f648713bcbe77c3d2e.png',
// })

const over = new OverLoading();
over.config({
  // backgroundColor: 'rgba(0,0,0 ,.5)',
  progressBoxCss: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    border: '1px solid #ccc'
  }
})


function App() { 

  const [state, setState] = useSetState({name:1, age: 12});

  const [r, setR] = useState(0)

  const [use, setUser, clearUser] = useStorage('user',state);

  const imgList = [
    'https://i1.hdslb.com/bfs/garb/item/4b893cb3fbb4a4d93a39a00d128434aeae36a51a.png',
    'https://image.mini1.cn/b/20200316/68bb14da94dcc6f648713bcbe77c3d2e.png',
    'https://i1.hdslb.com/bfs/garb/item/4b893cb3fbb4a4d93a39a00d128434aeae36a51a.png',
    'https://i1.hdslb.com/bfs/garb/item/4b893cb3fbb4a4d93a39a00d128434aeae36a51a.png',
    'https://i1.hdslb.com/bfs/garb/item/4b893cb3fbb4a4d93a39a00d128434aeae36a51a.png',
    'https://i1.hdslb.com/bfs/garb/item/4b893cb3fbb4a4d93a39a00d128434aeae36a51a.png',

  ]

  // const imgLoad = () => {
  //   console.log(r)
  //   imgList.map( i => {
  //     const img = new Image();
  //     img.src = i;
  //     const r = Math.round(100 / imgList.length);
  //     img.onload = () => {
  //       setR(a => a + r)
  //     }
  //   })
  // }

  const add = () => {
    over.actived(imgList);
    // imgLoad()
  }

  return (
    <div >
      <div>
        {use.name}:{use.age}
      </div>
      <button onClick={add}>add</button>
    </div>
  )
 }

ReactDom.render(<App />, document.getElementById('root'));