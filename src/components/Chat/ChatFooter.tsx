import {
  Alert,
  Keyboard,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyIcon from '../@shared/MyIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageHScroll from '../@shared/Images/ImageHScroll';
import {pathToImageFile} from 'utils/amplify';
import {useNavigation} from '@react-navigation/native';
import {AppStackParam} from 'types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import GoSetting from '../@shared/GoSetting/GoSetting';

interface ChatFooterProps {
  errandId?: string;
  chatId?: string;
  value: string;
  onChangeText: (text: string) => void;
  handleSend: () => void;
  setLoading: (isLoading: boolean) => void;
  senderId?: string;
  handleSendOriginal?: (senderId: string, text: string) => void;
  amIHelper: boolean;
}

const ChatFooter = (props: ChatFooterProps) => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParam>>();
  const {
    chatId,
    errandId,
    value,
    onChangeText,
    handleSend,
    setLoading,
    handleSendOriginal,
    senderId,
    amIHelper,
  } = props;

  const [isVisibleAdditionalBottom, setVisibleAdditionalBottom] =
    useState(false);
  const [libraryImages, setLibraryImages] = useState<string[]>([]);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [isVisibleGoSetting, setIsVisibleGoSetting] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  });

  const handleLibraryImages = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          launchImageLibrary(
            {mediaType: 'photo', selectionLimit: 1},
            async response => {
              if (response.didCancel) {
                return;
              }
              if (response.errorCode) {
                Alert.alert('Fail to get image');
                return;
              }
              if (!response.assets) {
                return;
              }
              setVisibleAdditionalBottom(false);
              setLibraryImages(
                response.assets.map(asset => asset?.uri) as string[],
              );
            },
          );
        } else {
          setIsVisibleGoSetting(true);
          return;
        }
      });
    } else {
      launchImageLibrary(
        {mediaType: 'photo', selectionLimit: 1},
        async response => {
          if (response.didCancel) {
            return;
          }
          if (response.errorCode) {
            Alert.alert('Fail to get image');
            return;
          }
          if (!response.assets) {
            return;
          }
          setVisibleAdditionalBottom(false);
          setLibraryImages(
            response.assets.map(asset => asset?.uri) as string[],
          );
        },
      );
    }
  };

  const handleCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Fail to get image');
        return;
      }
      if (!response.assets) {
        return;
      }
      setVisibleAdditionalBottom(false);
      setLibraryImages(response.assets.map(asset => asset?.uri) as string[]);
    });
  };

  const handleSendTextOrImage = async () => {
    setLoading(true);
    if (libraryImages.length > 0) {
      let s3ImageKeys: string[] = [];
      for (const imageUrl of libraryImages) {
        const fileName = imageUrl.split('/').pop();
        const data = await pathToImageFile(
          imageUrl,
          `chat/${chatId}/${fileName}`,
        );
        if (data?.key) {
          s3ImageKeys.push(`${data.key}`);
        }
      }
      setLoading(false);
      const imageStr = s3ImageKeys.join(',');
      setLibraryImages([]);
      handleSendOriginal &&
        handleSendOriginal(senderId || '', ':@#$%IMAGE@#$%:' + imageStr);
      return;
    }
    handleSend();
  };

  const handleCancel = () => {
    navigation.navigate('ErrandCancel', {
      chatId: chatId || '',
      errandId: errandId || '',
    });
  };

  const handleComplete = () => {
    navigation.navigate('ErrandComplete', {
      chatId: chatId || '',
      errandId: errandId || '',
    });
  };

  return (
    <View
      style={{
        ...styles.wrapper,
        paddingBottom: Platform.OS === 'android' && keyboardOpen ? 40 : 0,
      }}>
      {!amIHelper && chatId && errandId && (
        <View style={styles.clientTab}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(t('cancel'), t('wantCancel'), [
                {
                  text: t('cancel'),
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: t('check'),
                  onPress: () => {
                    handleCancel && handleCancel();
                  },
                },
              ]);
            }}
            style={{...styles.clientTabBtn, backgroundColor: '#EBEBEB'}}>
            <Text style={styles.clientTabBtnText}>{t('cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(t('complete'), t('wantComplete'), [
                {
                  text: t('cancel'),
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: t('check'),
                  onPress: () => {
                    handleComplete && handleComplete();
                  },
                },
              ]);
            }}
            style={{...styles.clientTabBtn, backgroundColor: '#FB3048'}}>
            <Text style={{...styles.clientTabBtnText, color: '#fff'}}>
              {t('complete')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setVisibleAdditionalBottom(!isVisibleAdditionalBottom);
          }}>
          {isVisibleAdditionalBottom ? (
            <MyIcon name="close" />
          ) : (
            <MyIcon name="chatPlus" />
          )}
        </TouchableOpacity>
        <View style={styles.chatInputContainer}>
          {libraryImages.length > 0 ? (
            <View style={{overflow: 'hidden'}}>
              <ImageHScroll
                images={libraryImages}
                deleteImage={idx => {
                  const newLibraryImages = libraryImages.filter(
                    (_, index) => index !== idx,
                  );
                  setLibraryImages(newLibraryImages);
                }}
              />
            </View>
          ) : (
            <TextInput
              value={value}
              onChangeText={onChangeText}
              style={styles.chatInput}
              placeholder={t('chat')}
              placeholderTextColor={'#999'}
              multiline
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.send}
          disabled={!(value || libraryImages.length !== 0)}
          onPress={handleSendTextOrImage}>
          <MyIcon name="chatSend" />
        </TouchableOpacity>
      </View>
      {isVisibleAdditionalBottom && (
        <View style={styles.additionalBottomContainer}>
          <View style={styles.additionalRow}>
            <TouchableOpacity onPress={handleLibraryImages}>
              <View style={styles.additionalIcon}>
                <MyIcon name="whiteLibrary" />
              </View>
              <Text style={styles.additionalText}>{t('album')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCamera}>
              <View style={styles.additionalIcon}>
                <MyIcon name="whiteCamera" />
              </View>
              <Text style={styles.additionalText}>{t('camera')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  );
};

export default ChatFooter;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 110,
  },
  container: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 53,
    alignItems: 'center',
    gap: 8,
  },
  clientTab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  clientTabBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 43,
  },
  clientTabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#757575',
  },
  chatInputContainer: {
    marginLeft: 4,
    borderWidth: 1,
    borderColor: '#b1b1b1',
    width: '90%',
    borderRadius: 34,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
  },
  chatInput: {
    fontSize: 14,
    height: Platform.OS === 'android' ? 40 : 'auto',
    color: '#171717',
  },
  send: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#FB3048',
    justifyContent: 'center',
    alignItems: 'center',
  },
  additionalBottomContainer: {
    width: '100%',
    height: 150,
    padding: 18,
  },
  additionalRow: {
    flexDirection: 'row',
    gap: 26,
  },
  additionalIcon: {
    width: 47,
    height: 47,
    borderRadius: 25,
    backgroundColor: '#FB3048',
    justifyContent: 'center',
    alignItems: 'center',
  },
  additionalBtn: {
    width: 50,
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  additionalText: {
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
    color: '#171717',
  },
});
