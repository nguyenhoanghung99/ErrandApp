import {
  Button,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Divider} from 'react-native-paper';
import ErrandCard from '../../../components/@shared/Card/ErrandCard';
import MyIcon from '../../../components/@shared/MyIcons';
import useErrand from '../../../hooks/errand/useErrand';
import {calculateDistance, diffDateToString} from '../../../utils/util';
import {UserContext} from '../../../contexts/UserContext';
import {LatLng} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import useCategory from '../../../hooks/useCategory';
import dayjs from 'dayjs';
import {ErrandStackParam, RootNavigationProps} from '../../../types/navigation';
import {isNumber, range} from 'lodash-es';
import {language} from '../../../constants/language';
import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';
import ShortCut from '../../../components/Home/Shortcut';
import FullWidthButton from '../../../components/@shared/Button/FullWidthButton';
import useRefreshing from '../../../hooks/useRefreshing';

const distanceList = range(0, 510, 10)
  .filter(item => item !== 0)
  .map(num => `${num}km`);

const Errand = () => {
  const {t} = useTranslation();
  const [categoryIdList, setCategoryIdList] = useState<string[]>([]);
  const {errandList, setNeedUpdate} = useErrand({
    needInitLoad: true,
    categoryFilterList: categoryIdList,
  });
  const {
    myPosition,
    translateLanguage,
    setTranslateLanguage,
    distanceFilter,
    setDistanceFilter,
  } = useContext(UserContext);
  const {categoryList, getCategoryImage, convertCategoryIdToName} =
    useCategory();
  const {isRefreshing, handleRefresh} = useRefreshing({
    onRefresh: () => setNeedUpdate(true),
  });
  const navigation = useNavigation<RootNavigationProps<ErrandStackParam>>();
  const [isVisibleFilterModal, setIsVisibleFilterModal] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState(distanceFilter);
  const [selectedLanguage, setSelectedLanguage] = useState(translateLanguage);
  const [isVisibleLanguagePicker, setVisibleLanguagePicker] = useState(false);
  const [isVisibleDistancePicker, setVisibleDistancePicker] = useState(false);
  const [selectedCategoryIdList, setSelectedCategoryIdList] = useState<
    string[]
  >([]);

  const isTranslate = translateLanguage !== 'original';

  useEffect(() => {
    navigation.addListener('focus', () => {
      setNeedUpdate(true);
    });
  }, []);

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

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor="#FB3048"
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{t('errand')}</Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedCategoryIdList(categoryIdList);
                setIsVisibleFilterModal(true);
              }}>
              <MyIcon name="filter" />
            </TouchableOpacity>
          </View>
          <View style={styles.pickerContainer}>
            <View style={{flexDirection: 'row', gap: 8}}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.pickerText}>{t('translate')}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setVisibleDistancePicker(false);
                    setVisibleLanguagePicker(!isVisibleLanguagePicker);
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
                    name={
                      isVisibleLanguagePicker ? 'upTriangle' : 'downTriangle'
                    }
                  />
                </TouchableOpacity>
              </View>
              <MyIcon style={{marginTop: 14}} name="doubleArrow" />
              <View>
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
              <Text style={styles.pickerText}>{t('distance')}</Text>
              <TouchableOpacity
                onPress={() => {
                  setVisibleLanguagePicker(false);
                  setVisibleDistancePicker(!isVisibleDistancePicker);
                }}
                style={styles.picker}>
                <Text style={styles.pickerValue}>{distanceFilter}</Text>
                <MyIcon
                  name={isVisibleDistancePicker ? 'upTriangle' : 'downTriangle'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width: '90%', marginTop: 16}}>
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
              <View
                style={{
                  height: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 20, fontWeight: '700', color: '#171717'}}>
                  {t('noErrand')}
                </Text>
              </View>
            )}
            {filteredList.map(errand => {
              const calculatedDistance = calculateDistance(
                myPosition as LatLng,
                {
                  latitude: errand?.latitude || 0,
                  longitude: errand?.longitude || 0,
                },
              );
              const distance = isNaN(calculatedDistance)
                ? '000.0km'
                : `${calculatedDistance.toFixed(1)}km`;

              return (
                <TouchableOpacity
                  style={styles.errandItem}
                  key={errand.id}
                  onPress={() =>
                    navigation.navigate('ErrandDetail', {id: errand.id})
                  }>
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
      </ScrollView>
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => {
          navigation.navigate('ErrandForm', {});
        }}>
        <MyIcon name="whitePlus" />
      </TouchableOpacity>
      <Modal
        visible={isVisibleFilterModal}
        transparent={true} // Make the modal transparent
        animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.backdrop}
            onPress={() => {
              setIsVisibleFilterModal(false);
            }}
          />
          <View style={styles.modalContent}>
            <View style={{padding: 16, width: '100%'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#171717',
                }}>
                {t('categoryFilter')}
              </Text>
            </View>
            <FlatList
              data={categoryList}
              scrollEnabled={categoryList.length > 6}
              numColumns={4}
              columnWrapperStyle={{
                gap: 10,
                padding: 10,
              }}
              renderItem={({item}) => (
                <View style={styles.categoryItem} key={item.id}>
                  <ShortCut
                    isSelected={selectedCategoryIdList.includes(item.id)}
                    id={item.id}
                    title={convertCategoryIdToName(item.id)}
                    imageUrl={item?.imageUrl || ''}
                    onPress={() => {
                      if (selectedCategoryIdList.includes(item.id)) {
                        setSelectedCategoryIdList(
                          selectedCategoryIdList.filter(id => id !== item.id),
                        );
                        return;
                      }
                      setSelectedCategoryIdList([
                        ...selectedCategoryIdList,
                        item.id,
                      ]);
                    }}
                  />
                </View>
              )}
            />
            <View style={{padding: 16, width: '100%'}}>
              <FullWidthButton
                title={t('toApply')}
                onPress={() => {
                  setCategoryIdList(selectedCategoryIdList);
                  setIsVisibleFilterModal(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Errand;

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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16.5,
    fontWeight: '700',
    marginVertical: 27,
    color: '#171717',
  },
  pickerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  applyBtn: {
    position: 'absolute',
    backgroundColor: '#FB3048',
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 130,
    right: 20,
  },
  applyBtnText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
  },
  modalContent: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5, // For Android shadow
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categoryItem: {
    marginBottom: 10,
  },
});
