import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MyStackParam} from '../../../types/navigation';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../../contexts/UserContext';
import {S3Image} from 'aws-amplify-react-native';
import Score from '../../../components/@shared/Score/Score';
import ProfileInfoCard from '../../../components/@shared/Card/ProfileInfoCard';
import {ScrollView} from 'react-native-gesture-handler';
import ProfileCertificateInfo from '../../../components/Profile/ProfileCertificateInfo';
import {CertificateStatus, ReviewItem} from '../../../types/user';
import ProfileHelperReview from '../../../components/Profile/ProfileHelperReview';
import ProfileReviewResults from '../../../components/Profile/ProfileReviewResults';
import {useTranslation} from 'react-i18next';
import useUser from '../../../hooks/user/useUser';
import useRefreshing from '../../../hooks/useRefreshing';

const MyProfile = () => {
  const {t} = useTranslation();
  const {id} = useContext(UserContext);
  const {user, setNeedUpdate} = useUser(id);
  const navigation = useNavigation<NativeStackNavigationProp<MyStackParam>>();
  const {isRefreshing, handleRefresh} = useRefreshing({
    onRefresh: () => setNeedUpdate(true),
  });

  useEffect(() => {
    navigation.addListener('focus', () => {
      setTimeout(() => {
        setNeedUpdate(true);
      }, 500);
    });
  }, []);

  const userScore = (user?.helperScore || 0) / (user?.helperCompletedCnt || 1);

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        style={{backgroundColor: '#fcfcfc'}}>
        <View style={styles.page}>
          <View style={styles.profileContainer}>
            {user?.profileImage ? (
              <S3Image style={styles.profileImage} imgKey={user.profileImage} />
            ) : (
              <View style={styles.profileImage} />
            )}
            <Text style={styles.profileName}>
              {user?.nickname}
              <Text style={styles.profileNameSubText} />
            </Text>

            <View style={styles.scoreContainer}>
              <Score score={userScore} />
              <Text style={styles.scoreNumber}>{userScore.toFixed(1)}</Text>
              <Text style={styles.scoreText}>{t('rating')}</Text>
            </View>
            <ProfileInfoCard
              infoList={[
                // {label: '나와 거리', value: '1.5km'}, 알 수 없음
                {
                  label: t('language'),
                  value:
                    user?.languages
                      ?.map(lang => t(lang as string))
                      .join(', ') || '',
                },
                {
                  label: t('performed'),
                  value: t('cases', {count: user?.helperCompletedCnt || 0}),
                },
              ]}
            />
            <ProfileCertificateInfo
              identity={user?.helperIdentityStatus as CertificateStatus}
              phoneInterview={user?.helperPhoneStatus as CertificateStatus}
              facebook={user?.helperFacebookStatus as CertificateStatus}
            />
            <ProfileReviewResults
              review={
                user?.helperReviewList?.map(
                  review => JSON.parse(review as string) as ReviewItem,
                ) as ReviewItem[]
              }
            />
            <View style={styles.divider} />
            <ProfileHelperReview
              reviewCount={user?.helperReviewList?.length || 0}
              hasHeaderMore
              reviewList={
                user?.helperReviewList
                  ?.map(review => JSON.parse(review as string) as ReviewItem)
                  .slice(-3) || []
              }
              handleNavigateToReview={() => {
                navigation.navigate('MyErrandVolunteerReviewList', {
                  userId: id,
                });
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    paddingBottom: 240,
  },
  profileContainer: {
    paddingVertical: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EBEBEB',
  },
  profileName: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#171717',
  },
  profileNameSubText: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#171717',
  },
  scoreContainer: {
    marginTop: 24,
    gap: 16,
  },
  scoreNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#171717',
  },
  scoreText: {
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#757575',
  },
  choiceButtonContainer: {
    padding: 16,
    backgroundColor: 'rgba(256, 256, 256, 0.5)',
    width: '100%',
    position: 'absolute',
    bottom: 100,
  },
  divider: {
    width: '90%',
    marginVertical: 28,
    height: 1,
    backgroundColor: '#ebebeb',
  },
});
