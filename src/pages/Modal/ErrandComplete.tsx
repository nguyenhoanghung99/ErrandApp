import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import ErrandCard from '../../components/@shared/Card/ErrandCard';
import {BottomTabNavigateParams, ModalStackParam} from '../../types/navigation';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {UserContext} from '../../contexts/UserContext';
import useCategory from '../../hooks/useCategory';
import useErrandDetail from '../../hooks/errand/useErrandDetail';
import {calculateDistance, diffDateToString} from '../../utils/util';
import dayjs from 'dayjs';
import {LatLng} from 'react-native-maps';
import Score from '../../components/@shared/Score/Score';
import FullWidthButton from '../../components/@shared/Button/FullWidthButton';
import useUser from '../../hooks/user/useUser';
import useChat from '../../hooks/chat/useChat';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../components/@shared/Loading';
import {REVIEW_ITEMS} from '../../constants/errand';
import {useTranslation} from 'react-i18next';
import {postMatchCompleteNotification} from '../../utils/notification';

type Props = NativeStackScreenProps<ModalStackParam, 'ErrandComplete'>;

const ErrandComplete = ({route}: Props) => {
  const {t} = useTranslation();
  const inputRef = useRef<TextInput>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomTabNavigateParams>>();
  const {id: myId, profileImage, nickname} = useContext(UserContext);
  const scrollRef = React.useRef<ScrollView>(null);
  const {translateLanguage, myPosition} = useContext(UserContext);
  const {getCategoryImage, convertCategoryIdToName} = useCategory();
  const {errandId, chatId} = route.params;
  const {
    errand,
    updateErrandStatus,
    isLoading: errandLoading,
  } = useErrandDetail(errandId);
  const [score, setScore] = React.useState(5);
  const [selectedReviewKeyList, setSelectedReviewKeyList] = useState<string[]>(
    [],
  );
  const [reviewContent, setReviewContent] = useState('');
  const {updateChatStatus, isLoading: chatLoading, chatInfo} = useChat(chatId);
  const helperId = chatInfo?.helperId;

  const {
    user: helperInfo,
    updateHelperReview,
    isLoading: userLoading,
  } = useUser(helperId || '');

  const isLoading = errandLoading || chatLoading || userLoading;

  const calculatedDistance = calculateDistance(myPosition as LatLng, {
    latitude: errand?.latitude || 0,
    longitude: errand?.longitude || 0,
  });
  const distance = isNaN(calculatedDistance)
    ? '000.0km'
    : `${calculatedDistance.toFixed(1)}km`;

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <ScrollView ref={scrollRef} style={{backgroundColor: '#F6F6F6'}}>
        <View style={styles.page}>
          <View style={styles.errandInfo}>
            <ErrandCard
              language={translateLanguage}
              imgSrc={getCategoryImage(errand?.categoryId || '')}
              category={convertCategoryIdToName(errand?.categoryId || '')}
              title={errand?.title || ''}
              distance={distance}
              time={diffDateToString(dayjs(errand?.createdAt))}
              price={(errand?.price?.toLocaleString() || '') + '₫'}
            />
          </View>
          <View style={styles.reviewContainer}>
            <Text style={styles.title}>{t('ReviewHowAbout')}</Text>
            <View style={styles.score}>
              <Score score={score} setScore={setScore} />
              <Text style={styles.title}>{score}</Text>
            </View>
            <View style={styles.reviewButtonContainer}>
              {REVIEW_ITEMS.map(item => {
                const isSelected = selectedReviewKeyList.includes(item.key);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (isSelected) {
                        setSelectedReviewKeyList(
                          selectedReviewKeyList.filter(
                            selectedKey => selectedKey !== item.key,
                          ),
                        );
                      } else {
                        setSelectedReviewKeyList([
                          ...selectedReviewKeyList,
                          item.key,
                        ]);
                      }
                    }}
                    key={item.key}
                    style={{
                      ...styles.reviewButton,
                      borderWidth: 1,
                      borderColor: isSelected ? '#171717' : '#FFF',
                    }}>
                    <Text
                      style={{
                        ...styles.reviewButtonText,
                        color: isSelected ? '#171717' : '#C7C7CC',
                      }}>
                      {t(item.key)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {/* <TouchableOpacity style={styles.reviewButton}>
                <Text style={styles.reviewButtonText}>
                  헬퍼를 신고하고 싶어요.
                </Text>
                <MyIcon
                  name="rightGrayArrow"
                  style={{position: 'absolute', right: 24}}
                />
              </TouchableOpacity> */}
            </View>
            <View style={styles.reviewInputContainer}>
              <Text style={styles.title}>{t('warmReview')}</Text>
              <TextInput
                ref={inputRef}
                collapsable={false}
                onFocus={() => {
                  inputRef.current?.measure(
                    (x, y, width, height, pageX, pageY) => {
                      scrollRef.current?.scrollTo({
                        y: pageY,
                        animated: true,
                      });
                    },
                  );
                }}
                value={reviewContent}
                onChangeText={setReviewContent}
                multiline
                placeholder={t('reviewDescription')}
                style={styles.reviewInput}
              />
            </View>
            <View style={styles.completeButton}>
              <FullWidthButton
                disabled={!selectedReviewKeyList.length}
                title={t('completeTrade')}
                onPress={async () => {
                  try {
                    await updateHelperReview(
                      {
                        id: uuid.v4() as string,
                        reviewerId: myId,
                        reviewerProfileImage: profileImage || '',
                        reviewerName: nickname || '',
                        date: new Date().getTime(),
                        result: selectedReviewKeyList.join(','),
                        content: reviewContent,
                      },
                      score,
                    );
                    await updateErrandStatus(errandId, 'COMPLETED');
                    await updateChatStatus('INACTIVE');
                    helperInfo?.fcmToken &&
                      postMatchCompleteNotification({
                        type: 'COMPLETE',
                        errandId: errandId,
                        errandTitle: errand?.title || '',
                        fcmToken: helperInfo?.fcmToken || '',
                        language: helperInfo?.i18n || 'en',
                      });
                    navigation.goBack();
                    setTimeout(() => {
                      navigation.popToTop();
                    }, 500);
                  } catch {
                    Alert.alert('Failed to update review. Try again.');
                    return;
                  }
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Loading isLoading={isLoading} />
    </KeyboardAvoidingView>
  );
};

export default ErrandComplete;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    paddingBottom: 150,
  },
  errandInfo: {
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    backgroundColor: '#fff',
  },
  reviewContainer: {
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#171717',
  },
  score: {
    marginTop: 36,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewButtonContainer: {
    marginTop: 36,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reviewButton: {
    position: 'relative',
    width: '100%',
    height: 45,
    borderRadius: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#c7c7cc',
  },
  reviewInputContainer: {
    marginTop: 60,
  },
  reviewInput: {
    marginTop: 22,
    borderWidth: 1,
    borderColor: '#171717',
    backgroundColor: '#fff',
    paddingTop: 20,
    padding: 18,
    height: 170,
  },
  completeButton: {
    marginTop: 17,
    width: '100%',
    alignSelf: 'center',
  },
});
