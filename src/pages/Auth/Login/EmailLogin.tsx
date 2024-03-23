import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import FullWidthButton from '../../../components/@shared/Button/FullWidthButton';
// import SocialContinue from '../../../components/Auth/SocialContinue';
import EmailSection from '../../../components/Auth/EmailSection';
import FullWidthInput from '../../../components/Auth/FullWidthInput';
import useLogin from '../../../hooks/auth/useLogin';

const EmailLogin = () => {
  const {t} = useTranslation();
  const {emailLogin, handleEmailLogin} = useLogin();
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.page}>
          {/* 이메일 */}
          <View style={styles.section}>
            <EmailSection
              value={emailLogin.email}
              handleEmail={emailLogin.handleEmail}
              domain={emailLogin.domain}
              handleDomain={emailLogin.handleDomain}
              isDirectInput={emailLogin.isDirectInput}
              handleDirectInput={emailLogin.handleDirectInput}
            />
          </View>
          <View style={styles.section}>
            <Text style={{color: '#171717'}}>{t('password')}</Text>
            <FullWidthInput
              style={styles.fullWidthInput}
              value={emailLogin.password}
              onChangeText={emailLogin.handlePassword}
              textContentType="password"
              secureTextEntry={true}
              autoComplete="off"
              autoCorrect={false}
            />
            <FullWidthButton
              title={t('signin')}
              onPress={handleEmailLogin}
              style={styles.loginButton}
            />
          </View>
          <View style={styles.socialContainer}>
            {/* <SocialContinue type="facebook" />
            <SocialContinue type="google" />
            <SocialContinue type="apple" /> */}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default EmailLogin;

const styles = StyleSheet.create({
  page: {
    height: '100%',
  },
  section: {
    marginTop: 50,
    paddingHorizontal: 16,
  },
  fullWidthInput: {
    marginTop: 10,
    color: '#171717',
  },
  passwordHelper: {
    marginTop: 9,
    marginBottom: 16,
    fontSize: 14,
    color: '#757575',
  },
  loginButton: {
    marginTop: 23,
  },
  socialContainer: {alignItems: 'center', marginTop: 35},
});
