import {
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useRef} from 'react';
import CheckBox from '@react-native-community/checkbox';
import MyIcon from '../../components/@shared/MyIcons';
import FooterButton from '../../components/@shared/Button/FooterButton';
import useHelperForm from '../../hooks/helper/useHelperForm';
import Loading from '../../components/@shared/Loading';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ModalStackParam} from '../../types/navigation';
import {useTranslation} from 'react-i18next';
import GoSetting from '../../components/@shared/GoSetting/GoSetting';

const HelperForm = () => {
  const scrollRef = useRef<ScrollView>(null);
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<ModalStackParam>>();
  const {
    profileImage,
    realName,
    birthDate,
    identityFaceImage,
    identityImage,
    identityBackImage,
    phone,
    facebookProfile,
    isLoading,
  } = useHelperForm();
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView ref={scrollRef} style={{backgroundColor: '#fff'}}>
        <View style={styles.page}>
          <View style={styles.profileImage}>
            <TouchableOpacity onPress={profileImage.onPress}>
              {profileImage?.file?.uri ? (
                <Image
                  source={{uri: profileImage.file.uri}}
                  style={styles.image}
                />
              ) : (
                <MyIcon name="defaultProfile" style={styles.image} />
              )}
              <MyIcon name="camera" style={styles.cameraIcon} />
            </TouchableOpacity>
            <Text style={styles.imageTitle}>{t('realPhoto')}</Text>
            <Text style={styles.imageDescription}>
              {t('realPhotoDescription')}
            </Text>
          </View>
          <View style={styles.formContainer}>
            {/* 이름 */}
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>{t('name')}</Text>
              <TextInput
                placeholderTextColor={'#9B9B9B'}
                style={styles.formInput}
                placeholder={t('realName')}
                onFocus={() => {
                  scrollRef.current?.scrollTo({
                    y: 50,
                    animated: true,
                  });
                }}
                {...realName}
              />
            </View>
            {/* 생년월일 */}
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>{t('birth')}</Text>
              <TextInput
                placeholderTextColor={'#9B9B9B'}
                style={styles.formInput}
                placeholder={'YYYY-MM-DD'}
                {...birthDate}
                maxLength={10}
                onFocus={() => {
                  scrollRef.current?.scrollTo({
                    y: 80,
                    animated: true,
                  });
                }}
              />
            </View>
            {/* 신분증 */}
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>{t('id')}</Text>
              <View style={styles.idImageWrapper}>
                <View style={{alignItems: 'center', gap: 8}}>
                  <TouchableOpacity
                    style={styles.imageWrapper}
                    onPress={identityImage.onPress}>
                    {identityImage.url ? (
                      <Image
                        source={{uri: identityImage.url}}
                        style={styles.idImage}
                      />
                    ) : (
                      <MyIcon name="defaultImage" style={styles.idImage} />
                    )}
                    <MyIcon
                      name="camera"
                      style={[styles.cameraIcon, {right: -5}]}
                    />
                  </TouchableOpacity>
                  <Text style={{fontSize: 14, color: '#757575'}}>
                    {t('id')}
                  </Text>
                </View>
                <View style={{alignItems: 'center', gap: 8}}>
                  <TouchableOpacity
                    style={styles.imageWrapper}
                    onPress={identityBackImage.onPress}>
                    {identityBackImage.url ? (
                      <Image
                        source={{uri: identityBackImage.url}}
                        style={styles.idImage}
                      />
                    ) : (
                      <MyIcon name="defaultImage" style={styles.idImage} />
                    )}
                    <MyIcon
                      name="camera"
                      style={[styles.cameraIcon, {right: -5}]}
                    />
                  </TouchableOpacity>
                  <Text style={{fontSize: 14, color: '#757575'}}>
                    {t('idBack')}
                  </Text>
                </View>
              </View>
            </View>
            {/* 신분증 + 본인 얼굴 */}
            <View style={styles.formRow}>
              <Text style={styles.formLabel} />
              <View style={{flex: 1, alignItems: 'center', gap: 8}}>
                <TouchableOpacity
                  style={styles.imageWrapper}
                  onPress={identityFaceImage.onPress}>
                  {identityFaceImage.url ? (
                    <Image
                      source={{uri: identityFaceImage.url}}
                      style={styles.idImage}
                    />
                  ) : (
                    <MyIcon name="defaultImage" style={styles.idImage} />
                  )}
                  <MyIcon
                    name="camera"
                    style={[styles.cameraIcon, {right: -5}]}
                  />
                </TouchableOpacity>
                <Text style={{fontSize: 14, color: '#757575'}}>
                  {t('idFace')}
                </Text>
              </View>
            </View>
            {/* 전화번호 */}
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>{t('phone')}</Text>
              <TextInput
                placeholderTextColor={'#9B9B9B'}
                keyboardType="number-pad"
                style={[styles.formInput, {marginLeft: 10}]}
                placeholder="No space or dash"
                onFocus={() => {
                  scrollRef.current?.scrollToEnd({animated: true});
                }}
                {...phone}
              />
            </View>
            {/* 페이스북 프로필 */}
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>{t('facebookProfile')}</Text>
              <TextInput
                onFocus={() => {
                  setTimeout(() => {
                    scrollRef.current?.scrollToEnd({animated: true});
                  }, 250);
                }}
                placeholderTextColor={'#9B9B9B'}
                style={[styles.formInput, {marginLeft: 18}]}
                placeholder={t('facebookProfile')}
                {...facebookProfile}
              />
            </View>
            <TouchableOpacity
              style={{alignItems: 'flex-end', marginRight: 60}}
              onPress={() =>
                navigation.navigate('PolicyModal', {
                  title: t('facebookProfile'),
                  policy: 'facebook',
                })
              }>
              <Text style={styles.anchor}>{t('goToVerifyMethoe')}</Text>
            </TouchableOpacity>
            {/* 약관동의 */}
            <View style={[styles.formRow, {marginTop: 50}]}>
              <Text style={styles.policyDescription}>{t('termsOfUse')}</Text>
              <CheckBox
                tintColor="#FB3048"
                onCheckColor="#fff"
                onFillColor="#FB3048"
                onTintColor="#FB3048"
                animationDuration={0.2}
                tintColors={{true: '#FB3048', false: '#FB3048'}}
                value={isChecked}
                onValueChange={setIsChecked}
                onAnimationType="bounce"
                offAnimationType="fade"
              />
            </View>
            <TouchableOpacity
              style={{marginTop: 8}}
              onPress={() => {
                navigation.navigate('PolicyModal', {
                  title: 'Terms of Use',
                  policy: 'privacy',
                });
              }}>
              <Text style={{fontSize: 12, color: '#757575'}}>
                {t('readMore')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <FooterButton
        disabled={
          !(
            profileImage.url &&
            realName.value &&
            birthDate.value &&
            identityImage.url &&
            identityFaceImage.url &&
            identityBackImage.url &&
            phone.value &&
            facebookProfile.value &&
            isChecked
          )
        }
        title={t('becomeHelper')}
        onPress={() => {
          navigation.navigate('HelperPhone');
        }}
      />
      <Loading isLoading={isLoading} />
      {profileImage.isVisibleGoSetting && (
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
            onOpenSetting={() => profileImage.setIsVisibleGoSetting(false)}
            onClose={() => profileImage.setIsVisibleGoSetting(false)}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default HelperForm;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    alignItems: 'center',
    paddingBottom: 140,
  },
  profileImage: {
    paddingTop: 23,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
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
  imageTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#757575',
  },
  imageDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#757575',
    textAlign: 'center',
  },
  formContainer: {
    width: '90%',
  },
  formRow: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#757575',
    width: 70,
  },
  formInput: {
    fontSize: 14,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#757575',
    padding: 4,
    color: '#171717',
  },
  idImageWrapper: {
    flexDirection: 'row',
    gap: 49,
  },
  idImage: {
    width: 97,
    height: 97,
    borderRadius: 3,
    backgroundColor: '#EBEBEB',
  },
  policyDescription: {
    maxWidth: '80%',
    fontSize: 12,
    color: '#757575',
  },
  anchor: {
    marginTop: 24,
    fontSize: 14,
    color: '#FB3048',
    textDecorationLine: 'underline',
  },
});
