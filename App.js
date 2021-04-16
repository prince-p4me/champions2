import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/stack';
import { navigationRef, isReadyRef } from './src/navigation/navigation';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import Loader from './src/components/Loader';
import { LogBox, StatusBar } from 'react-native';
import Color from './src/utility/Color';
const App = () => {
  LogBox.ignoreAllLogs(true);
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              isReadyRef.current = true;
            }}>
            <StatusBar backgroundColor={Color.theme} barStyle="light-content"></StatusBar>
            <StackNavigator />
            <Loader />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
