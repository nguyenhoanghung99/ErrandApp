import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {MyStackParam} from '../../../types/navigation';
import useUser from '../../../hooks/user/useUser';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../../contexts/UserContext';
import {S3Image} from 'aws-amplify-react-native';
import Score from '../../../components/@shared/Score/Score';
import ProfileInfoCard from '../../../components/@shared/Card/ProfileInfoCard';
import FullWidthButton from '../../../components/@shared/Button/FullWidthButton';
import {ScrollView} from 'react-native-gesture-handler';
import ProfileCertificateInfo from '../../../components/Profile/ProfileCertificateInfo';
import {CertificateStatus, ReviewItem} from '../../../types/user';
import ProfileHelperReview from '../../../components/Profile/ProfileHelperReview';
import useErrandDetail from '../../../hooks/errand/useErrandDetail';
import ProfileReviewResults from '../../../components/Profile/ProfileReviewResults';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<MyStackParam, 'MyErrandVolunteerProfile'>;

const MyErrandVolunteerProfile = ({route}: Props) => {
  const {t} = useTranslation();
  const {userId, errandId} = route.params;
  const {user} = useUser(userId);
  const {id} = useContext(UserContext);
  const {errand} = useErrandDetail(errandId);
  const navigation = useNavigation<NativeStackNavigationProp<MyStackParam>>();

  const hasActiveChat = errand?.hasActiveChat || false;

  const handleCreateChat = () => {
    if (user?.id && errandId) {
      navigation.replace('MyErrandChatRoom', {
        clientId: id,
        helperInfo: user,
        errandId,
        headerName: user.helperName || '',
      });
    } else {
      Alert.alert('Failed to request errand.');
    }
  };

  const userScore = (user?.helperScore || 0) / (user?.helperCompletedCnt || 1);

  return (
    <View>
      <ScrollView style={{backgroundColor: '#fcfcfc'}}>
        <View style={styles.page}>
          <View style={styles.profileContainer}>
            {user?.helperProfileImage ? (
              <S3Image
                style={styles.profileImage}
                imgKey={user.helperProfileImage}
              />
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
              <Text style={styles.scoreText}>{t('raiting')}</Text>
            </View>
            <ProfileInfoCard
              infoList={[
                // {label: '나와 거리', value: '1.5km'}, 알 수 없음
                {
                  label: t('LanguageSpoken'),
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
                  userId: user?.id as string,
                });
              }}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.choiceButtonContainer}>
        <FullWidthButton
          disabled={hasActiveChat}
          title={t('requestErrand')}
          onPress={handleCreateChat}
        />
      </View>
    </View>
  );
};

export default MyErrandVolunteerProfile;

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
