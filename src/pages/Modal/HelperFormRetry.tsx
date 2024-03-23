import {
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import MyIcon from '../../components/@shared/MyIcons';
import FooterButton from '../../components/@shared/Button/FooterButton';
import Loading from '../../components/@shared/Loading';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ModalStackParam} from '../../types/navigation';
import {useTranslation} from 'react-i18next';
import useUser from '../../hooks/user/useUser';
import {UserContext} from '../../contexts/UserContext';
import {S3Image} from 'aws-amplify-react-native';
import {launchCamera} from 'react-native-image-picker';
import {API, graphqlOperation} from 'aws-amplify';
import {updateUser} from '../../graphql/mutations';
import {pathToImageFile} from '../../utils/amplify';

const HelperFormRetry = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<ModalStackParam>>();
  const {id: myId, setNeedUpdate} = useContext(UserContext);
  const {user} = useUser(myId);
  const [identityFaceImage, setIdentityFaceImage] = useState('');
  const [identityImage, setIdentityImage] = useState('');
  const [identityBackImage, setIdentityBackImage] = useState('');
  const [phone, setPhone] = useState('');
  const [facebookProfile, setFacebookProfile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    setPhone(user?.helperPhone || '');
    setFacebookProfile(user?.helperFacebook || '');
  }, [user]);

  return (
    <>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.page}>
          <View style={styles.profileImage}>
            <S3Image imgKey={user?.profileImage || ''} style={styles.image} />
            <Text style={styles.imageTitle}>{t('realPhoto')}</Text>
          </View>
          <View style={styles.formContainer}>
            {/* 이름 */}
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>{t('name')}</Text>
              <TextInput
                placeholderTextColor={'#999'}
                editable={false}
                style={{...styles.formInput, color: '#c7c7c7'}}
                placeholder={t('realName')}
                value={user?.helperName || ''}
              />
            </View>
            {/* 생년월일 */}
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>{t('birth')}</Text>
              <TextInput
                placeholderTextColor={'#999'}
                editable={false}
                style={{...styles.formInput, color: '#c7c7c7'}}
                placeholder={'YYYY-MM-DD'}
                value={user?.helperBirthDate || ''}
              />
            </View>
            {/* 신분증 */}
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>{t('id')}</Text>
              <View style={styles.idImageWrapper}>
                <View style={{alignItems: 'center', gap: 8}}>
                  <TouchableOpacity
                    style={styles.imageWrapper}
                    onPress={async () => {
                      launchCamera(
                        {
                          mediaType: 'photo',
                        },
                        response => {
                          if (response.didCancel) {
                            return;
                          }
                          if (response.errorCode) {
                            Alert.alert('Error', response.errorMessage);
                            return;
                          }
                          if (!response.assets?.[0].uri) {
                            return;
                          }
                          setIdentityImage(response.assets[0].uri);
                        },
                      );
                    }}>
                    {identityImage ? (
                      <Image
                        source={{uri: identityImage}}
                        style={styles.idImage}
                      />
                    ) : user?.helperIdentityImage ? (
                      <S3Image
                        imgKey={user.helperIdentityImage}
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
                    onPress={async () => {
                      launchCamera(
                        {
                          mediaType: 'photo',
                        },
                        response => {
                          if (response.didCancel) {
                            return;
                          }
                          if (response.errorCode) {
                            Alert.alert('Error', response.errorMessage);
                            return;
                          }
                          if (!response.assets?.[0].uri) {
                            return;
                          }
                          setIdentityBackImage(response.assets[0].uri);
                        },
                      );
                    }}>
                    {identityBackImage ? (
                      <Image
                        source={{uri: identityBackImage}}
                        style={styles.idImage}
                      />
                    ) : user?.helperIdentityBackImage ? (
                      <S3Image
                        imgKey={user.helperIdentityBackImage}
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
                  onPress={async () => {
                    launchCamera({mediaType: 'photo'}, response => {
                      if (response.didCancel) {
                        return;
                      }
                      if (response.errorCode) {
                        Alert.alert('Error', response.errorMessage);
                        return;
                      }
                      if (!response.assets?.[0].uri) {
                        return;
                      }
                      setIdentityFaceImage(response.assets[0].uri);
                    });
                  }}>
                  {identityFaceImage ? (
                    <Image
                      source={{uri: identityFaceImage}}
                      style={styles.idImage}
                    />
                  ) : user?.helperIdentityFaceImage ? (
                    <S3Image
                      imgKey={user.helperIdentityFaceImage}
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
                placeholderTextColor={'#999'}
                keyboardType="number-pad"
                style={[styles.formInput, {marginLeft: 10}]}
                placeholder="No space or dash"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            {/* 페이스북 프로필 */}
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>{t('facebookProfile')}</Text>
              <TextInput
                placeholderTextColor={'#999'}
                style={[styles.formInput, {marginLeft: 18}]}
                placeholder={t('facebookProfile')}
                value={facebookProfile}
                onChangeText={setFacebookProfile}
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
        disabled={!phone || !facebookProfile || !isChecked}
        title={t('becomeHelper')}
        onPress={async () => {
          setIsLoading(true);
          try {
            const identityS3 = identityImage
              ? (
                  await pathToImageFile(
                    identityImage,
                    `${myId}/helper_identity_image`,
                  )
                )?.key
              : user?.helperIdentityImage;
            const identityFaceS3 = identityFaceImage
              ? (
                  await pathToImageFile(
                    identityFaceImage,
                    `${myId}/helper_identity_face_image`,
                  )
                )?.key
              : user?.helperIdentityFaceImage;

            await API.graphql(
              graphqlOperation(updateUser, {
                input: {
                  id: myId,
                  helperPhone: phone,
                  helperFacebook: facebookProfile,
                  helperIdentityFaceImage: identityFaceS3,
                  helperIdentityImage: identityS3,
                  isHelper: true,
                  helperPhoneRejectReason: null,
                  helperIdentityRejectReason: null,
                  helperFacebookRejectReason: null,
                  helperPhoneStatus: 'REVIEW',
                  helperIdentityStatus: 'REVIEW',
                  helperFacebookStatus: 'REVIEW',
                },
              }),
            );
            setNeedUpdate(true);
            navigation.navigate('HelperComplete');
          } catch (e) {
            console.log(e);
            Alert.alert("Fail to update helper's information");
          } finally {
            setIsLoading(false);
          }
        }}
      />
      <Loading isLoading={isLoading} />
    </>
  );
};

export default HelperFormRetry;

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
