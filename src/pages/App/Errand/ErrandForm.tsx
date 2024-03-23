import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import MyIcon from '../../../components/@shared/MyIcons';
import FooterButton from '../../../components/@shared/Button/FooterButton';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {
  AiTranslate,
  ErrandFormCategory,
} from '../../../components/Errand/ErrandForm';
import useErrandForm from '../../../hooks/errand/useErrandForm';
import Loading from '../../../components/@shared/Loading';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ModalStackParam} from '../../../types/navigation';
import {useNavigation} from '@react-navigation/native';
import {ErrandMapAddressContext} from '../../../contexts/ErrandMapAddressContext';
import {useTranslation} from 'react-i18next';
import {diffStartDateToString} from '../../../utils/util';
import dayjs from 'dayjs';
import GoSetting from '../../../components/@shared/GoSetting/GoSetting';

type Props = NativeStackScreenProps<ModalStackParam, 'ErrandForm'>;

const ErrandForm = ({route}: Props) => {
  const scrollRef = React.useRef<ScrollView>(null);
  const {t} = useTranslation();
  const categoryId = route.params?.categoryId;
  const {
    category,
    title,
    content,
    price,
    startTime,
    images,
    handleSubmitForm,
    isLoading,
  } = useErrandForm({categoryId});
  const navigation =
    useNavigation<NativeStackNavigationProp<ModalStackParam>>();
  const {addressDetail} = useContext(ErrandMapAddressContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView ref={scrollRef}>
        <View style={styles.page}>
          <ErrandFormCategory {...category} firstCategoryId={categoryId} />
          <View style={styles.seperateLine} />
          <View style={styles.formSection}>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleText}>{t('title')}</Text>
              <AiTranslate />
            </View>
            <TextInput
              onFocus={() => {
                scrollRef.current?.scrollTo({
                  y: 0,
                  animated: true,
                });
              }}
              style={styles.input}
              placeholder={t('title')}
              placeholderTextColor={'#C7C7CC'}
              {...title}
            />
          </View>
          <View style={styles.formSection}>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleText}>{t('description')}</Text>
              <AiTranslate />
            </View>
            <TextInput
              onFocus={() => {
                scrollRef.current?.scrollTo({
                  y: 100,
                  animated: true,
                });
              }}
              style={[
                styles.input,
                {
                  height: 150,
                  textAlignVertical: 'top',
                  paddingTop: 16,
                  paddingBottom: 16,
                },
              ]}
              placeholder={t('errandInfoDescription')}
              placeholderTextColor={'#C7C7CC'}
              multiline
              maxLength={2000}
              {...content}
            />
          </View>
          <View style={styles.formSection}>
            <Text style={styles.titleText}>{t('errandPrice')}</Text>
            <View style={styles.priceInputWrapper}>
              <Text style={styles.currency}>VND</Text>
              <TextInput
                {...price}
                onFocus={() => {
                  scrollRef.current?.scrollTo({
                    y: 250,
                    animated: true,
                  });
                }}
                style={styles.priceInput}
                inputMode="numeric"
                placeholder={t('errandPrice')}
                placeholderTextColor={'#C7C7CC'}
              />
              <Text style={styles.currency}>₫</Text>
            </View>
          </View>

          <View style={styles.bottomField}>
            <View style={styles.formSection}>
              <Text style={styles.titleText}>{t('location')}</Text>
              <TouchableOpacity
                style={styles.locationWrapper}
                onPress={() => navigation.navigate('ErrandMap')}>
                <View style={styles.locationTextContainer}>
                  <MyIcon name="location" />
                  <Text numberOfLines={1} style={styles.locationText}>
                    {addressDetail || t('selectLocation')}
                  </Text>
                </View>
                <MyIcon name="rightGrayArrow" />
              </TouchableOpacity>
            </View>
            <View style={styles.formSection}>
              <Text style={styles.titleText}>{t('time')}</Text>
              <View style={styles.startTimeWrapper}>
                <TouchableOpacity
                  onPress={() => startTime.handleSelectedStartTimeType('NOW')}
                  style={[
                    styles.startTimeItem,
                    {
                      borderColor:
                        startTime.selectedStartTimeType === 'NOW'
                          ? '#000'
                          : '#fff',
                    },
                  ]}>
                  <Text
                    style={{
                      color:
                        startTime.selectedStartTimeType === 'NOW'
                          ? '#757575'
                          : '#C7C7CC',
                    }}>
                    {t('now')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    startTime.handleSelectedStartTimeType('RESERVATION');
                    startTime.setIsVisibleDatePicker(true);
                    setTimeout(
                      () =>
                        scrollRef.current?.scrollTo({
                          y: 650,
                          animated: true,
                        }),
                      250,
                    );
                  }}
                  style={[
                    styles.startTimeItem,
                    {
                      borderColor:
                        startTime.selectedStartTimeType === 'RESERVATION'
                          ? '#000'
                          : '#fff',
                    },
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 14,
                      alignItems: 'center',
                    }}>
                    <MyIcon name="grayCalendar" />
                    <Text style={styles.startTimeItemText}>
                      {t('bookTime')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.startTimeTimePicker}>
                {startTime.selectedStartTimeType === 'RESERVATION' &&
                  startTime.isVisibleDatePicker && (
                    <View>
                      {Platform.OS === 'ios' && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Button
                            color={'#FB3048'}
                            title={t('cancel')}
                            onPress={() =>
                              startTime.setIsVisibleDatePicker(false)
                            }
                          />
                          <Button
                            color={'#FB3048'}
                            title={t('check')}
                            onPress={() => {
                              startTime.setIsVisibleDatePicker(false);
                              startTime.setStartTimeState(startTime.value);
                            }}
                          />
                        </View>
                      )}
                      {Platform.OS === 'ios' && (
                        <RNDateTimePicker
                          textColor="#000"
                          mode="datetime"
                          display="spinner"
                          minimumDate={new Date()}
                          value={startTime.value}
                          onChange={startTime.onChange}
                        />
                      )}
                      {Platform.OS === 'android' &&
                        startTime.isVisibleDatePicker &&
                        !startTime.isVisibleTimePicker && (
                          <RNDateTimePicker
                            textColor="#000"
                            mode="date"
                            display="spinner"
                            minimumDate={new Date()}
                            value={startTime.value}
                            onChange={(e, date) => {
                              if (e.type === 'dismissed') {
                                startTime.setIsVisibleDatePicker(false);
                                return;
                              }
                              if (e.type === 'set') {
                                startTime.setStartTime(date || new Date());
                                startTime.setIsVisibleTimePicker(true);
                                startTime.setIsVisibleDatePicker(false);
                              }
                            }}
                          />
                        )}
                      {Platform.OS === 'android' &&
                        startTime.isVisibleTimePicker && (
                          <RNDateTimePicker
                            textColor="#000"
                            mode="time"
                            display="spinner"
                            minimumDate={new Date()}
                            value={startTime.value}
                            onChange={(e, date) => {
                              if (e.type === 'dismissed') {
                                startTime.setIsVisibleTimePicker(false);
                                return;
                              }
                              startTime.setStartTimeState(date || new Date());
                              startTime.setIsVisibleTimePicker(false);
                            }}
                          />
                        )}
                    </View>
                  )}
              </View>
              {startTime.selectedStartTimeType === 'RESERVATION' && (
                <Text
                  style={{
                    textAlign: 'right',
                    fontSize: 20,
                    marginRight: 20,
                    fontWeight: '700',
                    color: '#757575',
                  }}>
                  {dayjs(startTime.startTimeState).format('YYYY-MM-DD HH:MM')} (
                  {diffStartDateToString(dayjs(startTime.startTimeState))})
                </Text>
              )}
            </View>
            <View style={styles.formSection}>
              <Text style={styles.titleText}>{t('addPhotos')}</Text>
              <View style={styles.errandImageWrapper}>
                <FlatList
                  removeClippedSubviews={false}
                  horizontal
                  style={{overflow: 'visible'}}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{gap: 16}}
                  data={images.imageUrls}
                  ListHeaderComponent={() => {
                    return (
                      <TouchableOpacity
                        style={styles.errandAddImage}
                        onPress={images.uploadImages}>
                        <MyIcon name="errandAddImageIcon" />
                        <Text style={styles.errandImageCount}>
                          {images.imageUrls.length}/10
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <View style={styles.errandImageContainer}>
                        <TouchableOpacity
                          style={styles.errandDeleteIcon}
                          onPress={() => images.deleteImage(index)}>
                          <MyIcon name="errandDeleteIcon" />
                        </TouchableOpacity>
                        <Image
                          source={{uri: item}}
                          style={styles.errandImage}
                        />
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <FooterButton
          disabled={
            !(
              category.selectedSubCategory &&
              title.value &&
              content.value &&
              price.value &&
              addressDetail
            )
          }
          title={t('requestErrand')}
          onPress={handleSubmitForm}
        />
      </View>
      <Loading isLoading={isLoading} />
      {images.isVisibleGoSetting && (
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
            onOpenSetting={() => images.setIsVisibleGoSetting(false)}
            onClose={() => images.setIsVisibleGoSetting(false)}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ErrandForm;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },

  seperateLine: {
    marginHorizontal: -16,
    height: 11,
    backgroundColor: '#F6F6F6',
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
  },
  aiTranslate: {
    flexDirection: 'row',
    gap: 4,
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 4,
    paddingHorizontal: 11,
  },
  aiText: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 24,
  },
  formSection: {
    marginTop: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 3,
    fontSize: 14,
    paddingHorizontal: 15,
    marginTop: 10,
    height: 43,
    color: '#171717',
  },
  bottomField: {
    marginTop: 32,
    marginHorizontal: -16,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 16,
    paddingBottom: 150,
  },
  priceInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 3,
    marginTop: 16,
    paddingHorizontal: 14,
    height: 43,
  },
  currency: {
    fontSize: 14,
    color: '#757575',
    paddingRight: 19,
  },
  priceInput: {
    fontSize: 14,
    flex: 1,
    color: '#171717',
  },
  priceSuggestion: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 10,
  },
  locationWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 3,
    marginTop: 24,
  },
  locationTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  locationText: {
    color: '#757575',
    width: '80%',
  },
  startTimeWrapper: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  startTimeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 3,
    borderWidth: 1,
  },
  startTimeItemText: {
    color: '#C7C7CC',
  },
  startTimeTimePicker: {
    marginTop: 24,
  },
  errandImageWrapper: {
    marginTop: 24,
    flexDirection: 'row',
  },
  errandAddImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  errandImageCount: {
    fontSize: 12,
    color: '#757575',
  },
  errandImageContainer: {
    position: 'relative',
    overflow: 'visible',
  },
  errandImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#ebebeb',
  },
  errandDeleteIcon: {
    top: Platform.OS === 'android' ? 0 : -10,
    right: Platform.OS === 'android' ? 0 : -10,
    backgroundColor: '#fff',
    width: 21,
    height: 21,
    borderRadius: 12,
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    bottom: 0,
    position: 'absolute',
  },
});
