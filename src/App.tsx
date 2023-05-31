import React from 'react';
import {  Platform,  UIManager} from 'react-native';
import MainStackNavigation from './navigation/MainStackNavigation';
import ThemeContext from './theme/ThemeContext';
import defaultTheme from './theme/theme';

const App = () => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  return(
    <ThemeContext.Provider value={defaultTheme}>
      <MainStackNavigation />
    </ThemeContext.Provider>
  )
};

export default App;
