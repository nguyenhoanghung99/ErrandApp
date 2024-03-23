import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Divider} from 'react-native-paper';
import ErrandCard from '../@shared/Card/ErrandCard';
import MyIcon from '../@shared/MyIcons';
import useErrand from '../../hooks/errand/useErrand';
import {calculateDistance, diffDateToString} from '../../utils/util';
import {UserContext} from '../../contexts/UserContext';
import {LatLng} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import useCategory from '../../hooks/useCategory';
import dayjs from 'dayjs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {
  BottomTabNavigateParams,
  ErrandStackParam,
} from '../../types/navigation';
import {isNumber, range} from 'lodash-es';
import {language} from '../../constants/language';
import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';

const distanceList = range(0, 510, 10)
  .filter(item => item !== 0)
  .map(num => `${num}km`);

const NearbySection = ({
  scrollRef,
}: {
  scrollRef: React.RefObject<ScrollView>;
}) => {
  const pickerRef = useRef<View>(null);
  const {t} = useTranslation();
  const {errandList, setNeedUpdate} = useErrand({needInitLoad: false});
  const {
    myPosition,
    translateLanguage,
    setTranslateLanguage,
    distanceFilter,
    setDistanceFilter,
  } = useContext(UserContext);
  const {getCategoryImage, convertCategoryIdToName} = useCategory();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<BottomTabNavigateParams & ErrandStackParam>
    >();
  const [selectedDistance, setSelectedDistance] = useState(distanceFilter);
  const [selectedLanguage, setSelectedLanguage] = useState(translateLanguage);
  const [isVisibleLanguagePicker, setVisibleLanguagePicker] = useState(false);
  const [isVisibleDistancePicker, setVisibleDistancePicker] = useState(false);

  const isTranslate = translateLanguage !== 'original';

  const filteredList = errandList.filter(errand => {
    const calculatedDistance = calculateDistance(myPosition as LatLng, {
      latitude: errand?.latitude || 0,
      longitude: errand?.longitude || 0,
    });
    const distanceNum = Number(distanceFilter?.replace('km', ''));
    if (isNumber(distanceNum) && calculatedDistance > distanceNum) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    navigation.addListener('focus', () => {
      setNeedUpdate(true);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{t('nearby')}</Text>
      </View>
      <View style={styles.pickerContainer}>
        <View style={{flexDirection: 'row', gap: 8}}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.pickerText}>{t('translate')}</Text>
            <TouchableOpacity
              onPress={() => {
                setVisibleDistancePicker(false);
                setVisibleLanguagePicker(!isVisibleLanguagePicker);
                pickerRef.current?.measure(
                  (x, y, width, height, pageX, pageY) => {
                    scrollRef.current?.scrollTo({
                      y: pageY,
                      animated: true,
                    });
                  },
                );
              }}
              style={{
                ...styles.fixedPicker,
                borderWidth: isTranslate ? 1 : 0,
                backgroundColor: !isTranslate ? '#c7c7c7' : '#fff',
                width: !isTranslate ? 70 : 90,
              }}>
              <Text
                style={{
                  ...styles.fixedPickerText,
                  color: isTranslate ? '#171717' : '#757575',
                }}>
                {t(translateLanguage)}
              </Text>
              <MyIcon
                name={isVisibleDistancePicker ? 'upTriangle' : 'downTriangle'}
              />
            </TouchableOpacity>
          </View>
          <MyIcon style={{marginTop: 14}} name="doubleArrow" />
          <View style={{alignItems: 'center'}}>
            <Text style={styles.pickerText}>{''}</Text>
            <TouchableOpacity
              onPress={() => {
                setTranslateLanguage('original');
              }}
              style={{
                ...styles.fixedPicker,
                borderWidth: !isTranslate ? 1 : 0,
                backgroundColor: isTranslate ? '#c7c7c7' : '#fff',
                width: isTranslate ? 70 : 90,
              }}>
              <Text
                style={{
                  ...styles.fixedPickerText,
                  color: !isTranslate ? '#171717' : '#757575',
                }}>
                {t('original')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={{...styles.pickerText}}>{t('distance')}</Text>
          <TouchableOpacity
            onPress={() => {
              setVisibleLanguagePicker(false);
              setVisibleDistancePicker(!isVisibleDistancePicker);
              pickerRef.current?.measure(
                (x, y, width, height, pageX, pageY) => {
                  scrollRef.current?.scrollTo({
                    y: pageY,
                    animated: true,
                  });
                },
              );
            }}
            style={styles.picker}>
            <Text style={styles.pickerValue}>{distanceFilter}</Text>
            <MyIcon
              name={isVisibleDistancePicker ? 'upTriangle' : 'downTriangle'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{width: '90%', marginTop: 16}}
        collapsable={false}
        ref={pickerRef}>
        {isVisibleLanguagePicker && (
          <React.Fragment>
            <View style={styles.pickerButtonContainer}>
              <Button
                color="#FB3048"
                title={t('cancel')}
                onPress={() => {
                  setVisibleLanguagePicker(false);
                }}
              />
              <Button
                color="#FB3048"
                title={t('check')}
                onPress={() => {
                  setVisibleLanguagePicker(false);
                  setTranslateLanguage(selectedLanguage);
                }}
              />
            </View>
            <Picker
              dropdownIconColor={'#171717'}
              style={{color: '#171717'}}
              selectedValue={selectedLanguage}
              onValueChange={itemValue => {
                setSelectedLanguage(itemValue);
              }}>
              {language.map(lan => (
                <Picker.Item key={lan} label={t(lan)} value={lan} />
              ))}
            </Picker>
          </React.Fragment>
        )}
        {isVisibleDistancePicker && (
          <React.Fragment>
            <View style={styles.pickerButtonContainer}>
              <Button
                color="#FB3048"
                title={t('cancel')}
                onPress={() => {
                  setVisibleDistancePicker(false);
                }}
              />
              <Button
                color="#FB3048"
                title={t('check')}
                onPress={() => {
                  setVisibleDistancePicker(false);
                  setDistanceFilter(selectedDistance);
                }}
              />
            </View>
            <Picker
              dropdownIconColor={'#171717'}
              style={{color: '#171717'}}
              selectedValue={selectedDistance}
              onValueChange={itemValue => {
                setSelectedDistance(itemValue);
              }}>
              {distanceList.map(dist => {
                return <Picker.Item key={dist} label={dist} value={dist} />;
              })}
            </Picker>
          </React.Fragment>
        )}
      </View>
      <Divider style={styles.divider} />
      <View style={styles.errandContainer}>
        {filteredList.length === 0 && (
          <Text style={{fontSize: 12, textAlign: 'center', color: '#757575'}}>
            {t('noErrandNearby')}
          </Text>
        )}
        {filteredList.map(errand => {
          const calculatedDistance = calculateDistance(myPosition as LatLng, {
            latitude: errand?.latitude || 0,
            longitude: errand?.longitude || 0,
          });
          const distance = isNaN(calculatedDistance)
            ? '000.0km'
            : `${calculatedDistance.toFixed(1)}km`;

          const selectedDistanceNum = Number(
            selectedDistance.replace('km', ''),
          );
          if (
            isNumber(selectedDistanceNum) &&
            calculatedDistance > selectedDistanceNum
          ) {
            return null;
          }

          return (
            <TouchableOpacity
              style={styles.errandItem}
              key={errand.id}
              onPress={() => {
                navigation.navigate('ErrandTab');
                setTimeout(() => {
                  navigation.navigate('ErrandDetail', {id: errand.id});
                });
              }}>
              <ErrandCard
                language={translateLanguage}
                imgSrc={getCategoryImage(errand.categoryId)}
                category={convertCategoryIdToName(errand.categoryId)}
                title={errand.title || ''}
                distance={distance}
                time={diffDateToString(dayjs(errand.createdAt))}
                price={(errand.price?.toLocaleString() || '') + '₫'}
                volunteerCount={errand.volunteers?.length}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default NearbySection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 300,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16.5,
    fontWeight: '700',
    marginVertical: 27,
    color: '#171717',
  },
  pickerContainer: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#757575',
    marginBottom: 4,
  },
  picker: {
    width: 90,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    flexDirection: 'row',
    gap: 4,
  },
  pickerValue: {
    fontSize: 14,
    color: '#171717',
  },

  divider: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    marginVertical: 25,
  },
  fixedPicker: {
    width: 70,
    borderRadius: 6,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    gap: 4,
  },
  fixedPickerText: {
    fontSize: 14,
    color: '#171717',
  },
  errandContainer: {
    width: '100%',
    gap: 17,
  },
  errandItem: {
    borderRadius: 6,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  pickerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
