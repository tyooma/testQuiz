import React, { FC, useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import appsFlyer from 'react-native-appsflyer';

import MainScreen from './src/screens/MainScreen';
import { appsFlyerConfig } from './src/configs/appsFlyer';
import { OneSignal } from 'react-native-onesignal';

const App: FC = () => {
  useEffect(() => {
    appsFlyer.initSdk(
      appsFlyerConfig,
      result => {
        console.log('RESULT', result);
      },
      error => {
        console.error('APPSFLYER ERROR', error);
      },
    );
    OneSignal.initialize('FAKE_ONESIGNAL_APP_ID');
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <MainScreen />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
