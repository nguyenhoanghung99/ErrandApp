import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import SettingButton from '../../../components/@shared/Button/SettingButton';
import {Auth, Cache} from 'aws-amplify';
import {S3Image} from 'aws-amplify-react-native';
import {UserContext} from '../../../contexts/UserContext';
import {useNavigation} from '@react-navigation/native';
import {MyStackParam, RootNavigationProps} from '../../../types/navigation';
import useUser from '../../../hooks/user/useUser';
import Loading from '../../../components/@shared/Loading';
import {useTranslation} from 'react-i18next';

const My = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<RootNavigationProps<MyStackParam>>();
  const user = useContext(UserContext);
  const {deleteUserInfo, isLoading, setLoading} = useUser(user.id);

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.page}>
        <View style={styles.profile}>
          <View style={styles.profileInfo}>
            {user?.profileImage ? (
              <S3Image style={styles.profileImg} imgKey={user.profileImage} />
            ) : (
              <View style={styles.profileImg} />
            )}
            <Text style={styles.profileName}>{user?.nickname}</Text>
          </View>
          <SettingButton
            title={t('settings')}
            onPress={() => {
              navigation.navigate('MyProfile');
            }}
          />
        </View>
        {/* <View style={styles.pointContainer}>
          <View style={styles.pointLogo}>
            <MyIcon name="logo" />
            <Text style={styles.pointText}>핸즈프리 캐시</Text>
          </View>
          <View style={styles.pointTextContainer}>
            <Text style={styles.pointText}>0원</Text>
            <SettingButton title="출금" onPress={() => {}} />
          </View>
        </View> */}
        {/* <View style={styles.pointContainer}>
          <View style={styles.pointLogo}>
            <MyIcon name="logo" />
            <Text style={styles.pointText}>마일리지</Text>
          </View>
          <View style={{...styles.pointTextContainer, marginRight: 8}}>
            <Text style={styles.pointText}>0점</Text>
          </View>
        </View>
        <Text style={styles.pointDescription}>
          친구 추천, 거래후기 작성 시 포인트가 쌓여요!
        </Text> */}
        <View style={styles.myMenuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('MyErrand')}>
            <Text style={styles.myMenuText}>{t('viewReferrals')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyVolunteers')}>
            <Text style={styles.myMenuText}>{t('applicantHistory')}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Text style={styles.myMenuText}>알림설정</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity>
            <Text style={styles.myMenuText}>친구초대</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              if (!user?.isHelper) {
                navigation.navigate('HelperIntro');
              } else {
                if (
                  user.helperPhoneStatus === 'APPROVED' &&
                  user.helperFacebookStatus === 'APPROVED' &&
                  user.helperIdentityStatus === 'APPROVED'
                ) {
                  navigation.navigate('MyHelperSetting');
                } else if (
                  user.helperPhoneStatus === 'REVIEW' ||
                  user.helperFacebookStatus === 'REVIEW' ||
                  user.helperIdentityStatus === 'REVIEW'
                ) {
                  navigation.navigate('HelperReview');
                } else if (
                  user.helperPhoneStatus === 'REJECTED' ||
                  user.helperFacebookStatus === 'REJECTED' ||
                  user.helperIdentityStatus === 'REJECTED'
                ) {
                  navigation.navigate('HelperReject');
                }
              }
            }}>
            <Text style={styles.myMenuText}>{t('applyHelper')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyLanguage');
            }}>
            <Text style={styles.myMenuText}>{t('languageSetting')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyNotice');
            }}>
            <Text style={styles.myMenuText}>{t('notice')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('', t('wantLogout'), [
                {
                  text: t('cancel'),
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: t('check'),
                  onPress: () => {
                    Auth.signOut();
                    Cache.clear();
                  },
                },
              ]);
            }}>
            <Text style={styles.myMenuText}>{t('logout')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                t('cancelMembership'),
                t('cancelMembershipDescription'),
                [
                  {
                    text: t('cancel'),
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: t('check'),
                    onPress: () => {
                      setLoading(true);
                      Auth.deleteUser().then(() => {
                        Auth.signOut({global: true});
                        Cache.clear();
                        deleteUserInfo().finally(() => {
                          Alert.alert(t('deleteCompleteAlert'));
                          setLoading(false);
                        });
                      });
                    },
                  },
                ],
              );
            }}>
            <Text style={styles.myMenuText}>{t('deleteMembership')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loading isLoading={isLoading} />
    </ScrollView>
  );
};

export default My;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    height: '100%',
    paddingBottom: 150,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 17,
    paddingRight: 13,
    height: 100,
  },
  profileImg: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#EFEFEF',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
  },
  profileName: {
    fontSize: 16.5,
    fontWeight: '700',
    color: '#171717',
  },
  pointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    paddingLeft: 20,
    paddingRight: 13,
  },
  pointLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  pointTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  pointText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#171717',
  },
  pointDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#171717',
    paddingRight: 24,
    backgroundColor: '#FCFCFC',
    textAlign: 'right',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  myMenuContainer: {
    marginTop: 22,
    paddingHorizontal: 16,
    gap: 43,
  },
  myMenuText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#171717',
  },
});
