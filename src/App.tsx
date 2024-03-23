import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Navigation from './navigation';
import {Authenticator} from '@aws-amplify/ui-react-native';
import {LogBox, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import CategoryProvider from './contexts/CategoryContext';
import {enableLatestRenderer} from 'react-native-maps';
import CodePush from 'react-native-code-push';

enableLatestRenderer();

LogBox.ignoreLogs(['Require cycle:']);

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <GestureHandlerRootView style={{flex: 1}}>
        <CategoryProvider>
          <BottomSheetModalProvider>
            <Authenticator.Provider>
              <Navigation />
            </Authenticator.Provider>
          </BottomSheetModalProvider>
        </CategoryProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default CodePush(App);
