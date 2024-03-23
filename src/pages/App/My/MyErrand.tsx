import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {UserContext} from '../../../contexts/UserContext';
import useMyErrand from '../../../hooks/errand/useMyErrand';
import ErrandCard from '../../../components/@shared/Card/ErrandCard';
import useCategory from '../../../hooks/useCategory';
import useRefreshing from '../../../hooks/useRefreshing';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MyStackParam} from '../../../types/navigation';
import {calculateDistance, diffDateToString} from '../../../utils/util';
import dayjs from 'dayjs';
import {LatLng} from 'react-native-maps';
import {useTranslation} from 'react-i18next';

const MyErrand = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<MyStackParam>>();
  const {id: myId, myPosition} = useContext(UserContext);
  const {myErrandList, setNeedUpdate} = useMyErrand({myId});
  const {convertCategoryIdToName, getCategoryImage} = useCategory();
  const {isRefreshing, handleRefresh} = useRefreshing({
    onRefresh: () => setNeedUpdate(true),
    delay: 1000,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setNeedUpdate(true);
    });

    return unsubscribe;
  }, []);

  if (myErrandList.length === 0) {
    return (
      <View
        style={{
          height: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: '700', color: '#171717'}}>
          {t('noErrand')}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <FlatList
        refreshControl={
          <RefreshControl
            tintColor="#FB3048"
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
        contentContainerStyle={{alignItems: 'center', paddingBottom: 150}}
        data={myErrandList}
        renderItem={({item}) => {
          const calculatedDistance = calculateDistance(myPosition as LatLng, {
            latitude: item?.latitude || 0,
            longitude: item?.longitude || 0,
          });
          const distance = isNaN(calculatedDistance)
            ? '000.0km'
            : `${calculatedDistance.toFixed(1)}km`;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.errandItem}
              onPress={() =>
                navigation.navigate('MyErrandDetail', {id: item.id})
              }>
              <ErrandCard
                language={'original'}
                imgSrc={getCategoryImage(item?.categoryId || '')}
                category={convertCategoryIdToName(item?.categoryId || '')}
                title={item?.title || ''}
                distance={distance}
                time={diffDateToString(dayjs(item?.createdAt))}
                price={(item?.price?.toLocaleString() || '') + '₫'}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default MyErrand;

const styles = StyleSheet.create({
  page: {height: '100%', backgroundColor: '#fcfcfc'},
  errandItem: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginVertical: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
