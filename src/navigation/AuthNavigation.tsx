import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import Step1 from '../pages/Auth/Tutorial/Step1';
import Step2 from '../pages/Auth/Tutorial/Step2';
import Step3 from '../pages/Auth/Tutorial/Step3';
import Login from '../pages/Auth/Login/Login';
import EmailLogin from '../pages/Auth/Login/EmailLogin';
import EmailSignUp from '../pages/Auth/Login/EmailSignUp';
import {useTranslation} from 'react-i18next';
import EmailSignUpFinal from '../pages/Auth/Login/EmailSignUpFinal';
import PolicyModal from '../pages/Modal/PolicyModal';
import HeaderBack from '../components/@shared/Button/HeaderBack';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthStackParam} from '../types/navigation';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParam>>();

  useEffect(() => {
    AsyncStorage.getItem('tutorialComplete').then(value => {
      if (value !== 'Y') {
        navigation.navigate('Step1');
      }
    });
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#000',
        headerShadowVisible: false,
        headerTitleAlign: 'center',
      }}
      initialRouteName={'Login'}>
      <Stack.Group>
        {/* Tutorial */}
        <Stack.Screen
          name="Step1"
          component={Step1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Step2"
          component={Step2}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Step3"
          component={Step3}
          options={{
            headerTitle: '',
          }}
        />
        {/* Log in */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EmailLogin"
          component={EmailLogin}
          options={{headerTitle: t('login')}}
        />
        {/* Sign Up */}
        <Stack.Screen
          name="EmailSignUp"
          component={EmailSignUp}
          options={{headerTitle: t('signToUp')}}
        />
        <Stack.Screen
          name="EmailSignUpFinal"
          component={EmailSignUpFinal}
          options={{headerTitle: t('signUpFinal')}}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
        <Stack.Screen
          name="PolicyModal"
          component={PolicyModal}
          options={({route}) => ({
            headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
            headerTitle: route.params?.title || '',
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthNavigation;
