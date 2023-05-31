import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {  Platform,  UIManager} from 'react-native';
import MainStackNavigation from './navigation/MainStackNavigation';
import ThemeContext from './theme/ThemeContext';
import defaultTheme from './theme/theme';
import { persistor, store } from './reduxstore/store';

const App = () => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  return(
    <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeContext.Provider value={defaultTheme}>
            <MainStackNavigation />
          </ThemeContext.Provider>
        </PersistGate>
    </ReduxProvider>
  )
};

export default App;
