import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation/AppNavigation';
import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {View, Text, StyleSheet} from 'react-native';
import MyIcon from '../components/@shared/MyIcons';
import {UserProvider} from '../contexts/UserContext';

const linking = {
  prefixes: ['handsfreeapp://'],
  config: {
    screens: {
      Root: {
        screens: {
          ChatTab: 'chat',
        },
      },
    },
  },
};

const Navigation = () => {
  const {authStatus} = useAuthenticator();
  const isLogin = authStatus === 'authenticated';
  const isLoading = authStatus === 'configuring';

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <MyIcon name="introLogo" />
        <Text style={styles.logoText}>
          <Text style={styles.bold}>Rảnh</Text>tay{'\n'}
          <Text style={styles.bold}>Hands</Text>
          Free
        </Text>
      </View>
    );
  }

  return (
    <UserProvider>
      <NavigationContainer linking={linking}>
        {!isLogin && <AuthNavigation />}
        {isLogin && <AppNavigation />}
      </NavigationContainer>
    </UserProvider>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    textAlign: 'center',
    color: '#FB3048',
    fontSize: 32,
    marginTop: 10,
  },
  bold: {
    fontWeight: '700',
  },
});
