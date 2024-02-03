import {createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './user/userReducer'
import { combineReducers  } from 'redux';


const reducers = combineReducers({
  user:userReducer
})
const persistedReducer = persistReducer({
  key: 'root',
  storage,
}, reducers)
// const store = createStore(cakeReducer)
export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}
// export default store