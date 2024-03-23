import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {UserContext} from '../../../contexts/UserContext';
import MyIcon from '../../../components/@shared/MyIcons';
import {S3Image} from 'aws-amplify-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import FullWidthButton from '../../../components/@shared/Button/FullWidthButton';
import useUser from '../../../hooks/user/useUser';
import {useTranslation} from 'react-i18next';
import Loading from '../../../components/@shared/Loading';
import {pathToImageFile} from '../../../utils/amplify';
import {useNavigation} from '@react-navigation/native';

const MyHelperSetting = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {id, setNeedUpdate} = useContext(UserContext);
  const [profileImageState, setProfileImageState] = useState('');
  const {user, updateHelperProfileImage, isLoading, setLoading} = useUser(id);

  return (
    <React.Fragment>
      <ScrollView style={{backgroundColor: '#FCFCFC'}}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <KeyboardAvoidingView style={styles.page} behavior="padding">
            <View style={styles.imageContainer}>
              <View style={{alignItems: 'center', gap: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    try {
                      if (Platform.OS === 'android') {
                        PermissionsAndroid.request(
                          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        ).then(() => {
                          launchImageLibrary(
                            {
                              mediaType: 'photo',
                              selectionLimit: 1,
                            },
                            res => {
                              if (res.assets) {
                                setProfileImageState(res.assets[0]?.uri || '');
                              }
                            },
                          );
                        });
                      } else {
                        launchImageLibrary(
                          {
                            mediaType: 'photo',
                            selectionLimit: 1,
                          },
                          res => {
                            if (res.assets) {
                              setProfileImageState(res.assets[0]?.uri || '');
                            }
                          },
                        );
                      }
                    } catch (e) {
                      Alert.alert('Failed to pick an image');
                    }
                  }}>
                  {profileImageState ? (
                    <Image
                      source={{uri: profileImageState}}
                      style={styles.image}
                    />
                  ) : user?.helperProfileImage ? (
                    <S3Image
                      style={styles.image}
                      imgKey={user?.helperProfileImage as string}
                    />
                  ) : (
                    <View style={styles.image} />
                  )}
                  <MyIcon name="setting" style={styles.settingIcon} />
                </TouchableOpacity>
                <Text style={styles.imageText}>{t('helperProfile')}</Text>
              </View>
            </View>
            <View style={{width: '100%', marginTop: 40, gap: 40}}>
              <View style={styles.row}>
                <Text style={styles.rowText}>{t('name')}</Text>
                <TextInput
                  placeholderTextColor={'#999'}
                  value={user?.helperName || ''}
                  editable={false}
                  style={styles.rowInput}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.rowText}>{t('phone')}</Text>
                <TextInput
                  placeholderTextColor={'#999'}
                  value={user?.helperPhone || ''}
                  editable={false}
                  style={styles.rowInput}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <FullWidthButton
          title={t('save')}
          disabled={!profileImageState}
          onPress={async () => {
            setLoading(true);
            if (profileImageState) {
              const data = await pathToImageFile(
                profileImageState,
                `${id}/helper_profile_image`,
              );
              data?.key &&
                updateHelperProfileImage(data.key)
                  .then(() => {
                    setNeedUpdate(true);
                    setTimeout(() => {
                      navigation.goBack();
                    }, 500);
                  })
                  .catch(() => {
                    Alert.alert('Failed to update profile image');
                  });
            }
            setLoading(false);
          }}
        />
      </View>
      <Loading isLoading={isLoading} />
    </React.Fragment>
  );
};

export default MyHelperSetting;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#fcfcfc',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 30,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 45,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#C7C7CC',
  },
  settingIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 4,
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
  imageText: {
    fontSize: 12,
    color: '#757575',
  },
  row: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  rowText: {
    width: 100,
    fontSize: 15,
    color: '#757575',
  },
  rowInput: {
    padding: 6,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#757575',
    color: '#c7c7cc',
  },
  pickerButton: {
    width: 77,
    height: 34,
    borderWidth: 1,
    borderColor: '#171717',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 6,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 100,
    backgroundColor: 'rgba(256,256,256, 0.5)',
    padding: 15,
  },
  pickerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
