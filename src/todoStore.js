import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import AsyncStorage from '@react-native-community/async-storage';
//import storage from 'redux-persist/lib/storage'
import todoReducer from './reducers/todoReducer';

const rootReducer = combineReducers({
  todoReducer: todoReducer
});
const persistConfig = {
  key: 'root',
  storage:AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

//const configureStore = () => createStore(rootReducer);
const configureStore = ()=>{
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore;