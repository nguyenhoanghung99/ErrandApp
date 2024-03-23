import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {AuthStackParam} from '../../types/navigation';
import {createUser} from '../../graphql/mutations';
import {pathToImageFile} from '../../utils/amplify';
import {API, graphqlOperation} from 'aws-amplify';
import {GraphQLQuery} from '@aws-amplify/api';
import {CreateUserInput} from '../../API';
import {useTranslation} from 'react-i18next';

const useSignUpFinal = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<AuthStackParam>>();
  const [isLoading, setLoading] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<Asset>({});
  const [nickname, setNickname] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isVisibleGoSetting, setIsVisibleGoSetting] = useState(false);

  const handleNickname = (value: string) => setNickname(value);

  const handleReferralCode = (value: string) => setReferralCode(value);

  const handleChecked = () => setChecked(!isChecked);

  const handleProfileImageFile = async (imageFile: Asset) => {
    if (imageFile.uri) {
      setProfileImageFile(imageFile);
    } else {
      Alert.alert('Error', 'No image selected');
    }
  };

  const onPressProfileImage = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(granted => {
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setIsVisibleGoSetting(true);
          return;
        }
        launchImageLibrary(
          {mediaType: 'photo', selectionLimit: 1},
          async response => {
            if (response.didCancel) {
              return;
            }
            if (response.errorCode) {
              Alert.alert('Failed to get image');
              return;
            }
            if (!response.assets) {
              return;
            }
            await handleProfileImageFile(response.assets[0]);
          },
        );
      });
    } else {
      launchImageLibrary(
        {mediaType: 'photo', selectionLimit: 1},
        async response => {
          if (response.didCancel) {
            return;
          }
          if (response.errorCode) {
            Alert.alert('Failed to get image');
            return;
          }
          if (!response.assets) {
            return;
          }
          await handleProfileImageFile(response.assets[0]);
        },
      );
    }
  };

  const handleSignUpSubmit = async ({
    id,
    email,
  }: {
    id: string;
    email: string;
  }) => {
    setLoading(true);
    try {
      if (!profileImageFile.uri) {
        throw new Error('No image selected');
      }
      const data = await pathToImageFile(
        profileImageFile.uri,
        `${id}/profile`,
        profileImageFile.type,
      );
      if (!data) {
        throw new Error('Error uploading file');
      }
      const input: Partial<CreateUserInput> = {
        id,
        email,
        nickname,
        referralCode: referralCode,
        clientId: `${id}&${new Date().getTime()}`,
        profileImage: data.key,
        isHelper: false,
      };

      await API.graphql<GraphQLQuery<CreateUserInput>>(
        graphqlOperation(createUser, {input}),
      );

      Alert.alert(t('alert'), t('successJoin'));
      setTimeout(() => {
        navigation.navigate('EmailLogin');
      });
    } catch (err) {
      console.error(err);
      Alert.alert(t('error'), t('failJoin'));
    } finally {
      setLoading(false);
    }
  };

  return {
    nickname: {
      value: nickname,
      onChangeText: handleNickname,
    },
    referralCode: {
      value: referralCode,
      onChangeText: handleReferralCode,
    },
    isChecked: {
      value: isChecked,
      onValueChange: handleChecked,
    },
    isVisibleGoSetting,
    setIsVisibleGoSetting,
    isLoading,
    onPressProfileImage,
    profileImageFile,
    handleSignUpSubmit,
  };
};

export default useSignUpFinal;
