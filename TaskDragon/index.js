/**
 * @format
 */

import {AppRegistry,Text,View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import React from 'react';
//import configureStore from './src/store';
import configureStore from './src/todoStore';
import Splash from './src/SplashScreen';
import { PersistGate } from 'redux-persist/integration/react';

//const store = configureStore();
const persistStore = configureStore();

const ReduxApp = ()=>
    <Provider store={persistStore.store}>
        <PersistGate loading={<Splash/>} persistor={persistStore.persistor}>
            <App/>
        </PersistGate>
    </Provider>

AppRegistry.registerComponent(appName, () => ReduxApp);
