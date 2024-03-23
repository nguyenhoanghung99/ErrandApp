import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MyIcon from '../../../components/@shared/MyIcons';
import {useTranslation} from 'react-i18next';
import useLogin from '../../../hooks/auth/useLogin';

const Login = () => {
  const {t} = useTranslation();
  const {goToEmailLogin, goToEmailSignUp} = useLogin();

  return (
    <View style={styles.container}>
      <MyIcon name="introLogo" style={styles.logo} />
      <Text style={styles.title}>{t('loginTitle')}</Text>
      <View style={{height: 100}} />
      {/* <SocialContinue type="facebook" />
      <SocialContinue type="google" />
      <SocialContinue type="apple" onPress={() => {}} /> */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={goToEmailLogin}>
          <Text style={styles.footerText}>{t('emailLogin')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToEmailSignUp}>
          <Text style={styles.footerText}>{t('emailSignup')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginTop: 120,
    marginBottom: 65,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 79,
    color: '#171717',
  },
  footer: {
    marginTop: 50,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 14,
    color: '#171717',
  },
  lookAround: {
    alignItems: 'flex-end',
    width: '80%',
    marginTop: 20,
  },
});
