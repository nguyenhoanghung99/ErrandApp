import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  BottomTabNavigateParams,
  ChatStackParam,
  ErrandStackParam,
  MyStackParam,
  RootNavigationProps,
} from '../../../types/navigation';
import useErrandDetail from '../../../hooks/errand/useErrandDetail';
import {S3Image} from 'aws-amplify-react-native';
import useCategory from '../../../hooks/useCategory';
import FullWidthButton from '../../../components/@shared/Button/FullWidthButton';
import {useNavigation} from '@react-navigation/native';
import {Category, Errand} from '../../../API';
import MyIcon from '../../../components/@shared/MyIcons';
import {
  calculateDistance,
  diffDateToString,
  diffStartDateToString,
} from '../../../utils/util';
import ErrandBottomSheet from '../../../components/Errand/ErrandBottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Volunteer} from '../../../types/errand';
import {UserContext} from '../../../contexts/UserContext';
import MapView, {LatLng, MapMarker, PROVIDER_GOOGLE} from 'react-native-maps';
import dayjs from 'dayjs';
import translate from 'translate-google-api';
import {useTranslation} from 'react-i18next';

type Props =
  | NativeStackScreenProps<ErrandStackParam, 'ErrandDetail'>
  | NativeStackScreenProps<MyStackParam, 'MyErrandDetail'>;

const ErrandDetail = ({route}: Props) => {
  const {t, i18n} = useTranslation();
  const {translateLanguage, myPosition, ...userInfo} = useContext(UserContext);
  const navigation =
    useNavigation<
      RootNavigationProps<
        ErrandStackParam &
          MyStackParam &
          ChatStackParam &
          BottomTabNavigateParams
      >
    >();
  const {id} = route.params;
  const {errand, updateVolunteers} = useErrandDetail(id);
  const {categoryList} = useCategory();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [isVisibleModal, setVisibleModal] = React.useState(false);
  const [title, setTitle] = React.useState(errand?.title || '');
  const [description, setDescription] = React.useState(
    errand?.description || '',
  );

  useEffect(() => {
    if (translateLanguage === 'original') {
      setTitle(errand?.title || '');
      setDescription(errand?.description || '');
      return;
    }

    translate([errand?.title || '', errand?.description || ''], {
      tld: 'com',
      to: translateLanguage,
    }).then(res => {
      setTitle(res[0] || '');
      setDescription(res[1] || '');
    });
  }, [translateLanguage, errand?.title, errand?.description]);

  const category = categoryList.find(cate => cate.id === errand?.categoryId);
  const subCategory = category?.subCategories
    ? (JSON.parse(category?.subCategories) as Category[])[0]
    : null;

  const isMyErrand = userInfo.id === errand?.clientId;

  const isMyVolunteerErrand = errand?.volunteerIDs?.includes(
    userInfo.id as string,
  );

  const position = {
    latitude: errand?.latitude || 0,
    longitude: errand?.longitude || 0,
  };

  const distance = isNaN(calculateDistance(myPosition as LatLng, position))
    ? '0000.0km'
    : `${calculateDistance(myPosition as LatLng, position).toFixed(1)}km`;

  const createdAt = diffDateToString(dayjs(errand?.createdAt));

  const startAt = diffStartDateToString(dayjs(errand?.startTime));

  const getBottomButtonTitle = () => {
    if (isMyVolunteerErrand) {
      if (errand?.status === 'COMPLETED') {
        // 지원한 심부름 - 완료
        return t('completedErrand');
      }
      if (errand?.status === 'CANCELED') {
        // 지원한 심부름 - 취소
        return t('canceledErrand');
      }
      // 지원한 심부름
      return t('volunteeredErrand');
    }
    if (isMyErrand) {
      // 내가 의뢰한 심부름
      return t('viewApplicant');
    }
    // 지원하기
    return t('applyErrand');
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setVisibleModal(true);
  }, []);

  const handleApply = () => {
    if (userInfo.isHelper) {
      if (
        userInfo.helperPhoneStatus === 'APPROVED' &&
        userInfo.helperFacebookStatus === 'APPROVED' &&
        userInfo.helperIdentityStatus === 'APPROVED'
      ) {
        handlePresentModalPress();
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
    } else {
      navigation.navigate('HelperIntro');
    }
  };
  const handleBottomButtonPress = () => {
    if (isMyErrand) {
      navigation.navigate('MyErrandVolunteers', {id});
      return;
    } else if (isMyVolunteerErrand) {
      navigation.goBack();
      setTimeout(() => {
        navigation.navigate('ChatTab');
      }, 250);
      return;
    }
    return handleApply();
  };

  const getCategoryByLanguage = () => {
    switch (i18n.language) {
      case 'ko':
        return {category: category?.nameKo, subCategory: subCategory?.nameKo};
      case 'vi':
        return {category: category?.nameVi, subCategory: subCategory?.nameVi};
      case 'en':
        return {category: category?.nameEn, subCategory: subCategory?.nameEn};
      default:
        return {category: category?.name, subCategory: subCategory?.name};
    }
  };

  const {category: categoryName, subCategory: subCategoryName} =
    getCategoryByLanguage();

  return (
    <>
      <ScrollView style={{backgroundColor: '#F6F6F6'}}>
        <View style={styles.page}>
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.price}>
                    {errand?.price?.toLocaleString()}₫
                  </Text>
                  <Text style={styles.title}>{title}</Text>
                  <View style={styles.errandInfoContainer}>
                    <Text style={styles.errandInfo}>{distance}</Text>
                    <MyIcon name="dot" />
                    <Text style={styles.errandInfo}>{createdAt}</Text>
                  </View>
                </View>
                <View style={styles.categoryContainer}>
                  {category?.imageUrl ? (
                    <View style={styles.categoryImg}>
                      <S3Image
                        imgKey={category?.imageUrl || ''}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'center',
                        }}
                      />
                    </View>
                  ) : (
                    <View style={styles.categoryImg} />
                  )}
                  <Text style={styles.categoryText}>{categoryName}</Text>
                  <Text style={styles.subCategory}>{subCategoryName}</Text>
                </View>
              </View>
              <View style={styles.content}>
                <Text style={{color: '#171717'}}>{description}</Text>
              </View>
              <View style={styles.errandState}>
                <View style={styles.errandStateItem}>
                  <MyIcon name="view" />
                  <Text style={styles.errandStateItemText}>
                    {t('views')}{' '}
                    {((errand?.views as number) + 1).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.errandStateItem}>
                  <MyIcon name="person" />
                  <Text style={styles.errandStateItemText}>
                    {t('applicant', {count: errand?.volunteers?.length || 0})}
                  </Text>
                </View>
                <View style={styles.errandStateItem}>
                  <MyIcon name="clock" />
                  <Text style={styles.errandStateItemText}>{startAt}</Text>
                </View>
              </View>
              <ScrollView horizontal>
                {errand?.imageUrls && (
                  <View style={styles.imageContainer}>
                    {errand.imageUrls.map((url, index) =>
                      url ? (
                        <S3Image
                          key={(url as string) + index}
                          imgKey={url as string}
                          style={styles.imageItem}
                        />
                      ) : (
                        <View style={styles.imageItem} />
                      ),
                    )}
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
          <View style={styles.errandPositionContainer}>
            <Text style={styles.errandPositionTitle}>
              {t('viewErrandLocation')}
            </Text>
            <View style={styles.errandPositionMapContainer}>
              <TouchableOpacity
                style={styles.mapNavigateButton}
                onPress={() => {
                  navigation.navigate('ErrandMapDetail', {
                    errand: errand as Errand,
                  });
                }}>
                <Text style={styles.mapNavigateButtonText}>
                  {t('viewOnMap')}
                </Text>
              </TouchableOpacity>
              <MapView
                style={{height: 150}}
                provider={PROVIDER_GOOGLE}
                pitchEnabled={false}
                rotateEnabled={false}
                zoomEnabled={false}
                scrollEnabled={false}
                region={{
                  ...position,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}>
                <MapMarker
                  coordinate={position}
                  style={{width: 30, height: 30}}>
                  <Image
                    source={require('../../../assets/images/position.png')}
                    style={{width: 30, height: 30, resizeMode: 'contain'}}
                  />
                </MapMarker>
              </MapView>
            </View>
            <View style={styles.errandPositionAddress}>
              <MyIcon name="positionWhite" />
              <Text style={styles.errandPositionAddressText}>
                {errand?.address || ''}
              </Text>
            </View>
          </View>

          <ErrandBottomSheet
            helperInfo={{
              id: userInfo?.id as string,
              helperId: userInfo?.helperId as string,
              helperName: userInfo?.helperName as string,
              helperProfileImage: userInfo?.helperProfileImage as string,
              helperScore: userInfo?.helperScore as number,
              helperCompletedCnt: userInfo?.helperCompletedCnt as number,
            }}
            modalProps={{bottomSheetModalRef, isVisibleModal, setVisibleModal}}
            handleApply={(volunteer?: Volunteer) => {
              if (volunteer) {
                updateVolunteers(
                  JSON.stringify(volunteer),
                  volunteer.id,
                ).finally(() => {
                  bottomSheetModalRef.current?.close();
                  setVisibleModal(false);
                });
              }
            }}
            errand={errand}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <FullWidthButton
          disabled={
            errand?.status === 'COMPLETED' ||
            errand?.status === 'CANCELED' ||
            isMyVolunteerErrand
          }
          title={getBottomButtonTitle()}
          onPress={handleBottomButtonPress}
        />
      </View>
    </>
  );
};

export default ErrandDetail;

const styles = StyleSheet.create({
  page: {
    height: '100%',
  },
  container: {
    width: '100%',
    padding: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 6,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#171717',
  },
  title: {
    fontSize: 15,
    color: '#171717',
    marginTop: 6,
    maxWidth: '80%',
  },
  errandInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  errandInfo: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '300',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    marginTop: 32,
  },
  contentText: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '400',
  },
  footer: {
    padding: 16,
    backgroundColor: 'rgba(256, 256, 256, 0.8)',
    width: '100%',
    position: 'absolute',
    bottom: 100,
  },
  categoryContainer: {
    alignItems: 'center',
  },
  categoryImg: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#ebebeb',
  },
  subCategory: {
    fontSize: 12,
    color: '#c7c7cc',
    borderWidth: 1,
    borderColor: '#c7c7cc',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    textAlign: 'center',
    marginTop: 12,
  },
  errandState: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 9,
  },
  errandStateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  errandStateItemText: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '300',
  },
  imageContainer: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  imageItem: {
    width: 97,
    height: 97,
    borderRadius: 3,
    backgroundColor: '#ebebeb',
  },
  errandPositionContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fff',
    width: '100%',
    paddingBottom: 250,
  },
  errandPositionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
  },
  errandPositionMapContainer: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#ebebeb',
    position: 'relative',
  },
  errandPositionAddress: {
    maxWidth: '90%',
    backgroundColor: '#757575',
    marginTop: 12,
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  errandPositionAddressText: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
  },
  mapNavigateButton: {
    position: 'absolute',
    zIndex: 3,
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 4,
    top: 17,
    right: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  mapNavigateButtonText: {
    fontSize: 12,
    color: '#757575',
  },
});
