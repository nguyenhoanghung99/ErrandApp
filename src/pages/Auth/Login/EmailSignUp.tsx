import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import FooterButton from '../../../components/@shared/Button/FooterButton';
import useSignUp from '../../../hooks/auth/useSignUp';
import EmailSection from '../../../components/Auth/EmailSection';
import FullWidthInput from '../../../components/Auth/FullWidthInput';

const EmailSignUp = () => {
  const scrollRef = useRef<ScrollView>(null);
  const {t} = useTranslation();
  const {
    email,
    password,
    confirmCode,
    disabledSignUp,
    handleSignUp,
    handleSubmitConfirm,
    handleJoin,
    signUpComplete,
  } = useSignUp();

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        style={{backgroundColor: '#fff', height: '100%'}}>
        <ScrollView ref={scrollRef} style={{backgroundColor: '#fff'}}>
          <View style={styles.container}>
            {/* 이메일 */}
            <View style={styles.section}>
              <EmailSection {...email} disabled={signUpComplete} />
            </View>

            {/* 비밀번호 */}
            <View style={styles.section}>
              <Text style={{color: '#171717'}}>{t('password')}</Text>
              <FullWidthInput
                onFocus={() => {
                  scrollRef.current?.scrollTo({y: 100, animated: true});
                }}
                isVisibleHelperText
                helperText={t('passwordRule')}
                placeholder={t('password')}
                style={styles.fullWidthInput}
                value={password.value}
                onChangeText={password.handlePassword}
                textContentType="password"
                placeholderTextColor={'#999'}
                secureTextEntry={true}
                autoComplete="off"
                autoCorrect={false}
                editable={!signUpComplete}
              />

              <FullWidthInput
                onFocus={() => {
                  scrollRef.current?.scrollTo({y: 150, animated: true});
                }}
                isVisibleHelperText
                placeholder={t('confirmPassword')}
                style={styles.fullWidthInput}
                value={password.confirmValue}
                onChangeText={password.handleConfirmPassword}
                textContentType="password"
                secureTextEntry={true}
                autoComplete="off"
                autoCorrect={false}
                placeholderTextColor={'#999'}
                editable={!signUpComplete}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignUp}
              disabled={signUpComplete}>
              <Text style={{color: '#141414'}}>{t('requestEmail')}</Text>
            </TouchableOpacity>
            {/* 이메일 인증하기 */}
            <View style={styles.section}>
              <Text style={{color: '#171717'}}>{t('verificationNumber')}</Text>
              <FullWidthInput
                onFocus={() => {
                  setTimeout(() => {
                    scrollRef.current?.scrollToEnd({animated: true});
                  }, 250);
                }}
                placeholder={t('verificationNumber')}
                style={styles.fullWidthInput}
                value={confirmCode.value}
                onChangeText={confirmCode.handleConfirmCode}
                autoComplete="off"
                autoCorrect={false}
                placeholderTextColor={'#999'}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmitConfirm}
                disabled={!disabledSignUp}>
                <Text style={{color: '#141414'}}>{t('verify')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <FooterButton
        title={t('signToUp')}
        onPress={handleJoin}
        disabled={disabledSignUp}
      />
    </>
  );
};

export default EmailSignUp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    width: '100%',
    paddingBottom: 150,
  },
  section: {
    marginTop: 30,
  },
  button: {
    borderColor: '#FF677D',
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 16,
  },
  fullWidthInput: {
    marginTop: 10,
    color: '#171717',
  },
});
