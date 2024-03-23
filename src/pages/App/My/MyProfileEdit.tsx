import {
  Alert,
  Button,
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
import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {UserContext} from '../../../contexts/UserContext';
import MyIcon from '../../../components/@shared/MyIcons';
import {S3Image} from 'aws-amplify-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import FullWidthButton from '../../../components/@shared/Button/FullWidthButton';
import useUser from '../../../hooks/user/useUser';
import {Picker} from '@react-native-picker/picker';
import {language} from '../../../constants/language';
import {useTranslation} from 'react-i18next';
import Loading from '../../../components/@shared/Loading';
import {pathToImageFile} from '../../../utils/amplify';
import {useNavigation} from '@react-navigation/native';
import GoSetting from '../../../components/@shared/GoSetting/GoSetting';

const MyProfileEdit = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [isVisibleGoSetting, setIsVisibleGoSetting] = useState(false);
  const {id, setNeedUpdate} = useContext(UserContext);
  const [profileImageState, setProfileImageState] = useState('');
  const [nicknameState, setNicknameState] = useState('');
  const {user, updateUserProfileEdit, isLoading, setLoading} = useUser(id);
  const [isVisiblePicker, setVisiblePicker] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);

  const selectableLanguages = language
    .filter(el => el !== 'original')
    .filter(el => !languages.includes(el));

  useEffect(() => {
    if (user) {
      setNicknameState(user?.nickname || '');
      setLanguages((user?.languages as string[]) || []);
    }
  }, [user]);

  useEffect(() => {
    return () => {
      setNeedUpdate(true);
    };
  }, []);

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
                    if (Platform.OS === 'android') {
                      PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                      ).then(granted => {
                        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                          setIsVisibleGoSetting(true);
                          return;
                        }
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
                  }}>
                  {profileImageState ? (
                    <Image
                      source={{uri: profileImageState}}
                      style={styles.image}
                    />
                  ) : (
                    <S3Image
                      style={styles.image}
                      imgKey={user?.profileImage as string}
                    />
                  )}
                  <MyIcon name="setting" style={styles.settingIcon} />
                </TouchableOpacity>
                <Text style={styles.imageText}>{t('generalProfile')}</Text>
              </View>
            </View>
            <View style={{width: '100%', marginTop: 80}}>
              <View style={styles.row}>
                <Text style={styles.rowText}>{t('nickname')}</Text>
                <TextInput
                  value={nicknameState}
                  onChangeText={setNicknameState}
                  style={styles.rowInput}
                />
              </View>
              <View style={{...styles.row, marginTop: 40}}>
                <Text style={styles.rowText}>{t('language')}</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                    flexWrap: 'wrap',
                  }}>
                  {languages.map(lan => (
                    <View
                      key={lan}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                      <Text
                        style={{
                          color: '#171717',
                          borderWidth: 1,
                          borderRadius: 8,
                          borderColor: '#c7c7c7',
                          padding: 4,
                        }}>
                        {t(lan)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          if (languages.length === 1) {
                            setLanguages([]);
                            return;
                          }
                          setLanguages(languages.filter(lang => lang !== lan));
                        }}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <MyIcon name="inputClose" />
                      </TouchableOpacity>
                    </View>
                  ))}
                  {selectableLanguages.length > 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setVisiblePicker(true);
                        setSelectedLanguage(selectableLanguages[0]);
                      }}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: '#757575',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MyIcon name="plus" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>

              {isVisiblePicker && (
                <React.Fragment>
                  <View style={styles.pickerButtonContainer}>
                    <Button
                      color="#FB3048"
                      title={t('cancel')}
                      onPress={() => {
                        setVisiblePicker(false);
                      }}
                    />
                    <Button
                      color="#FB3048"
                      title={t('check')}
                      onPress={() => {
                        setLanguages([...languages, selectedLanguage]);
                        setVisiblePicker(false);
                      }}
                    />
                  </View>
                  <Picker
                    style={{color: '#171717'}}
                    dropdownIconColor={'#171717'}
                    selectedValue={selectedLanguage}
                    onValueChange={itemValue => {
                      setSelectedLanguage(itemValue);
                    }}>
                    {selectableLanguages
                      .filter(el => el !== 'original')
                      .filter(el => !languages.includes(el))
                      .map(lan => (
                        <Picker.Item key={lan} label={t(lan)} value={lan} />
                      ))}
                  </Picker>
                </React.Fragment>
              )}
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <FullWidthButton
          title={t('save')}
          onPress={async () => {
            setLoading(true);
            if (profileImageState) {
              const data = await pathToImageFile(
                profileImageState,
                `${id}/profile`,
              );
              if (!data) {
                throw new Error('Error uploading file');
              }
              updateUserProfileEdit({
                nickname: nicknameState,
                profileImageUrl: data.key,
                languages,
              })
                .then(() => {
                  setNeedUpdate(true);
                  setTimeout(() => {
                    navigation.goBack();
                  }, 500);
                })
                .catch(() => {
                  Alert.alert('Failed to edit profile');
                })
                .finally(() => {
                  setLoading(false);
                });
              return;
            }
            updateUserProfileEdit({
              nickname: nicknameState,
              languages,
            })
              .then(() => {
                setNeedUpdate(true);
                setTimeout(() => {
                  navigation.goBack();
                }, 500);
              })
              .catch(() => {
                Alert.alert('Failed to edit profile');
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        />
      </View>
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
      <Loading isLoading={isLoading} />
    </React.Fragment>
  );
};

export default MyProfileEdit;

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
    gap: 20,
  },
  rowText: {
    width: 80,
    fontSize: 15,
    color: '#757575',
  },
  rowInput: {
    padding: 6,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#757575',
    color: '#171717',
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
    marginTop: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
