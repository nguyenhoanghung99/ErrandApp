import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {Amplify} from 'aws-amplify';
import {initI18n} from './src/i18n';
// import awsConfig from './src/awsExports';
import awsConfig from './src/aws-exports';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

initI18n();

Amplify.configure(awsConfig);

AppRegistry.registerComponent(appName, () => App);
