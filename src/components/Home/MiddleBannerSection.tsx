import {
  // Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  BottomTabNavigateParams,
  MyStackParam,
  RootNavigationProps,
} from '../../types/navigation';
import {UserContext} from '../../contexts/UserContext';
import MyIcon from '../@shared/MyIcons';
import {useTranslation} from 'react-i18next';

const MiddleBannerSection = () => {
  const {t} = useTranslation();
  const {isHelper, ...userInfo} = useContext(UserContext);
  const imgSource = undefined;
  const navigation =
    useNavigation<
      RootNavigationProps<BottomTabNavigateParams & MyStackParam>
    >();

  return (
    <View style={styles.container}>
      {imgSource ? (
        <Image style={styles.image} source={{uri: imgSource}} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            if (isHelper) {
              if (
                userInfo.helperPhoneStatus === 'APPROVED' &&
                userInfo.helperFacebookStatus === 'APPROVED' &&
                userInfo.helperIdentityStatus === 'APPROVED'
              ) {
                navigation.navigate('MyTab');
                setTimeout(() => {
                  navigation.navigate('MyHelperSetting');
                });
              } else if (
                userInfo.helperPhoneStatus === 'REVIEW' ||
                userInfo.helperFacebookStatus === 'REVIEW' ||
                userInfo.helperIdentityStatus === 'REVIEW'
              ) {
                navigation.navigate('HelperReview');
              } else if (
                userInfo.helperPhoneStatus === 'REJECTED' ||
                userInfo.helperFacebookStatus === 'REJECTED' ||
                userInfo.helperIdentityStatus === 'REJECTED'
              ) {
                navigation.navigate('HelperReject');
              }
              return;
            }
            setTimeout(() => {
              navigation.navigate('HelperIntro');
            });
          }}
          style={styles.defaultContainer}>
          <View style={styles.defaultText}>
            <Text style={styles.defaultTitle}>{t('helperPromotionTitle')}</Text>
            <Text style={styles.defaultSubTitle}>
              {t('helperPromotionDescription')}
            </Text>
          </View>
          <View style={styles.defaultCircle} />
          <MyIcon name="helperPersonIcon" style={styles.defaultPersonIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MiddleBannerSection;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 22,
    backgroundColor: '#fff',
    width: '100%',
  },
  image: {
    width: '100%',
    borderRadius: 5,
    height: 74,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  defaultContainer: {
    marginHorizontal: 16,
    borderRadius: 5,
    height: 74,
    backgroundColor: '#F3F3F3',
    position: 'relative',
    overflow: 'hidden',
  },
  defaultText: {
    marginLeft: 16,
    height: '100%',
    justifyContent: 'center',
    gap: 6,
  },
  defaultTitle: {
    color: '#4c4c4c',
    fontSize: 15,
    fontWeight: 'bold',
    width: '80%',
  },
  defaultSubTitle: {
    color: '#777',
    fontSize: 12,
    fontWeight: '400',
    width: '80%',
  },
  defaultCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#DEDEDE',
    position: 'absolute',
    right: 17,
    bottom: -43,
  },
  defaultPersonIcon: {
    position: 'absolute',
    right: 17,
    width: 100,
  },
});
