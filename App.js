import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/stack';
import {navigationRef, isReadyRef} from './src/navigation/navigation';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

import Loader from './src/components/Loader';
import {LogBox, StatusBar, Platform} from 'react-native';
import Color from './src/utility/Color';
import {request, PERMISSIONS} from 'react-native-permissions';

const App = () => {
  LogBox.ignoreAllLogs(true);
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  useEffect(() => {
    // PermissionRequest()

    async function PermissionRequest() {
      const granted = await request(
        Platform.select({
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
      );
      if (granted) {
        console.log('Permission granted');
      } else {
        Alert.alert('Permission Not Granted.');
      }
    }
    PermissionRequest();
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
            <StatusBar
              backgroundColor={Color.theme}
              barStyle="light-content"></StatusBar>
            <StackNavigator />
            <Loader />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
