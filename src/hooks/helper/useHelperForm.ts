import {useContext} from 'react';
import {Asset} from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {pathToImageFile} from '../../utils/amplify';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {updateUser} from '../../graphql/mutations';
import {UpdateUserInput} from '../../API';
import {API, graphqlOperation} from 'aws-amplify';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../contexts/UserContext';
import {HelperFormContext} from '../../contexts/HelperFormContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ModalStackParam} from '../../types/navigation';

const useHelperForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ModalStackParam>>();
  const userInfo = useContext(UserContext);
  const {
    isLoading,
    profileImageFile,
    realName,
    birthDate,
    identityImageFile,
    identityBackImage,
    identityFaceImage,
    phone,
    facebookProfile,
    isVisibleGoSetting,
    setFacebookProfile,
    setProfileImageFile,
    setRealName,
    setBirthDate,
    setIdentityImageFile,
    setIdentityBackImage,
    setIdentityFaceImage,
    setPhone,
    setLoading,
    initState,
    setIsVisibleGoSetting,
  } = useContext(HelperFormContext);

  const handleProfileImageFile = async (imageFile: Asset) => {
    if (imageFile.uri) {
      setProfileImageFile?.(imageFile);
    } else {
      Alert.alert('Error', 'No image selected');
    }
  };

  const onPressProfileImage = () => {
    if (Platform.OS === 'android') {
      // 앨범에서 가져오는 권한 설정
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
              Alert.alert('Fail to get image');
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
            Alert.alert('Fail to get image');
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

  const handleRealName = (value: string) => setRealName(value);

  const handleBirthDate = (value: string) => {
    // TODO : validation number or '-'
    const regex = /^[0-9-]*$/;
    regex.test(value) && setBirthDate(value);
  };

  const handleIdentityImageFile = async (imageFile: Asset) => {
    if (imageFile.uri) {
      setIdentityImageFile?.(imageFile);
    } else {
      Alert.alert('Error', 'No image selected');
    }
  };

  const onPressIdentityImage = () => {
    launchCamera({mediaType: 'photo'}, async response => {
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
      await handleIdentityImageFile(response.assets[0]);
    });
  };

  const handleIdentityFaceImageFile = async (imageFile: Asset) => {
    if (imageFile.uri) {
      setIdentityFaceImage?.(imageFile);
    } else {
      Alert.alert('Error', 'No image selected');
    }
  };

  const onPressIdentityFaceImage = () => {
    launchCamera({mediaType: 'photo'}, async response => {
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
      await handleIdentityFaceImageFile(response.assets[0]);
    });
  };

  const handleIdentityBackImageFile = async (imageFile: Asset) => {
    if (imageFile.uri) {
      setIdentityBackImage?.(imageFile);
    } else {
      Alert.alert('Error', 'No image selected');
    }
  };

  const onPressIdentityBackImage = () => {
    launchCamera({mediaType: 'photo'}, async response => {
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
      await handleIdentityBackImageFile(response.assets[0]);
    });
  };

  const handlePhone = (value: string) => setPhone(value);

  const handleCancelHelperForm = async () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    try {
      const userId = userInfo.id;
      const input: UpdateUserInput = {
        id: userId,
        clientId: userInfo.clientId,
        isHelper: false,
        helperId: null,
        helperName: null,
        helperBirthDate: null,
        helperProfileImage: null,
        helperIdentityImage: null,
        helperIdentityFaceImage: null,
        helperPhone: null,
        helperFacebook: null,
        helperIdentityStatus: null,
        helperPhoneStatus: null,
        helperFacebookStatus: null,
      };
      initState();
      await API.graphql(graphqlOperation(updateUser, {input}));
      userInfo.setNeedUpdate(true);
      navigation.popToTop();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to cancel helper.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitHelperForm = async () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    try {
      const userId = userInfo.id;
      if (
        profileImageFile?.uri &&
        identityImageFile?.uri &&
        identityFaceImage?.uri &&
        identityBackImage?.uri
      ) {
        const profileS3 = await pathToImageFile(
          profileImageFile.uri,
          `${userId}/helper_profile_image`,
        );
        const identityS3 = await pathToImageFile(
          identityImageFile.uri,
          `${userId}/helper_identity_image`,
        );
        const identityFaceS3 = await pathToImageFile(
          identityFaceImage.uri,
          `$${userId}/helper_identity_face_image`,
        );
        const identityBackS3 = await pathToImageFile(
          identityBackImage.uri,
          `$${userId}/helper_identity_back_image`,
        );

        const input: UpdateUserInput = {
          id: userId,
          clientId: userInfo.clientId,
          isHelper: true,
          helperId: uuid.v4() as string,
          helperName: realName,
          helperBirthDate: birthDate,
          helperProfileImage: profileS3?.key,
          helperIdentityImage: identityS3?.key,
          helperIdentityFaceImage: identityFaceS3?.key,
          helperIdentityBackImage: identityBackS3?.key,
          helperPhone: phone,
          helperFacebook: facebookProfile,
          helperIdentityStatus: 'REVIEW',
          helperPhoneStatus: 'REVIEW',
          helperFacebookStatus: 'REVIEW',
        };
        await API.graphql(graphqlOperation(updateUser, {input}));
        userInfo.setNeedUpdate(true);
        navigation.popToTop();
        setTimeout(() => {
          navigation.navigate('HelperComplete');
        }, 250);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to apply helper.');
    } finally {
      setLoading(false);
    }
  };

  return {
    profileImage: {
      file: profileImageFile,
      url: profileImageFile?.uri,
      isVisibleGoSetting,
      onPress: onPressProfileImage,
      setIsVisibleGoSetting,
    },
    realName: {
      value: realName,
      onChangeText: handleRealName,
    },
    birthDate: {
      value: birthDate,
      onChangeText: handleBirthDate,
    },
    identityImage: {
      file: identityImageFile,
      url: identityImageFile?.uri,
      onPress: onPressIdentityImage,
    },
    identityBackImage: {
      file: identityBackImage,
      url: identityBackImage?.uri,
      onPress: onPressIdentityBackImage,
    },
    identityFaceImage: {
      file: identityFaceImage,
      url: identityFaceImage?.uri,
      onPress: onPressIdentityFaceImage,
    },
    phone: {
      value: phone,
      onChangeText: handlePhone,
    },
    facebookProfile: {
      value: facebookProfile,
      onChangeText: setFacebookProfile,
    },
    handleSubmitHelperForm,
    handleCancelHelperForm,
    isLoading,
    initState,
  };
};

export default useHelperForm;
