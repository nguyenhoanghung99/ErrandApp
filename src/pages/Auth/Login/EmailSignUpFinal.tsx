import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {AuthStackParam, ModalStackParam} from '../../../types/navigation';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import MyIcon from '../../../components/@shared/MyIcons';
import useSignUpFinal from '../../../hooks/auth/useSignUpFinal';
import FooterButton from '../../../components/@shared/Button/FooterButton';
import Loading from '../../../components/@shared/Loading';
import CheckBox from '../../../components/@shared/CheckBox';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import GoSetting from '../../../components/@shared/GoSetting/GoSetting';

const EmailSignUpFinal = ({
  route,
}: NativeStackScreenProps<AuthStackParam, 'EmailSignUpFinal'>) => {
  const {t} = useTranslation();
  const {
    nickname,
    // referralCode,
    onPressProfileImage,
    profileImageFile,
    handleSignUpSubmit,
    isLoading,
    isChecked,
    isVisibleGoSetting,
    setIsVisibleGoSetting,
  } = useSignUpFinal();
  const {email, id} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<ModalStackParam>>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.page}>
        <TouchableOpacity onPress={onPressProfileImage}>
          {profileImageFile.uri ? (
            <Image source={{uri: profileImageFile.uri}} style={styles.image} />
          ) : (
            <MyIcon name="defaultProfile" style={styles.image} />
          )}
          <MyIcon name="camera" style={styles.cameraIcon} />
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>{t('nickname')}</Text>
            <TextInput
              style={styles.formInput}
              placeholder={t('nicknamePlaceholder')}
              placeholderTextColor={'#999'}
              {...nickname}
            />
          </View>
          {/* <View style={styles.formRow}>
            <Text style={styles.formLabel}>추천인코드</Text>
            <TextInput
              style={styles.formInput}
              placeholder="추천인코드를 입력해주세요 (선택)"
              {...referralCode}
            />
          </View> */}
          <View style={[styles.formRow, {marginTop: 50}]}>
            <View style={styles.policyText}>
              <Text style={styles.policyDescription}>{t('termsOfUse')}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PolicyModal', {
                    policy: 'privacy',
                    title: 'Terms of Use',
                  });
                }}>
                <Text style={styles.policyDetail}>{t('readMore')}</Text>
              </TouchableOpacity>
            </View>
            <CheckBox {...isChecked} />
          </View>
        </View>

        <FooterButton
          disabled={
            !(isChecked.value && nickname.value && profileImageFile.uri)
          }
          title={t('signToUp')}
          onPress={() => handleSignUpSubmit({email, id})}
        />
        <Loading isLoading={isLoading} />
        {isVisibleGoSetting && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              // justifyContent: 'center',
              // alignItems: 'center',
            }}>
            <GoSetting
              onOpenSetting={() => setIsVisibleGoSetting(false)}
              onClose={() => setIsVisibleGoSetting(false)}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EmailSignUpFinal;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    marginTop: 60,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#C7C7CC',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formContainer: {
    marginTop: 60,
    width: '90%',
    gap: 70,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#757575',
    width: 90,
  },
  formInput: {
    fontSize: 14,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#757575',
    padding: 4,
    color: '#171717',
  },
  policyText: {},
  policyDetail: {
    fontSize: 10,
    color: '#C7C7CC',
  },
  policyDescription: {
    maxWidth: 210,
    fontSize: 12,
    color: '#757575',
  },
});
