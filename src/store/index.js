
import { Crdux } from '@/tools';
const actions = {
  setCount( setState, data){
    setState( {count: data})
  },
  setKeys( setState , data){
    setState( state =>{
      state.keys ++;
      return state
    } )
  },
};

const store = {
  count: {
    index: 1,
    keys: {
      index: 1
    }
  },
  keys: 1
}


const r = Crdux(store, actions)

export default r