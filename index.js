/**
 * @format
 */
import React, { useEffect } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/Redux/Store';
import BuySell from './src/screen/BuySell/BuySell';
const RNApp = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
    </Provider>
);
AppRegistry.registerComponent(appName, () => RNApp);
