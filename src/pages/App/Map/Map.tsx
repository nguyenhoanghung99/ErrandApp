import {
  Dimensions,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GeoLocation from 'react-native-geolocation-service';
import React, {useContext, useRef, useState} from 'react';
import MapView, {LatLng, MapMarker, PROVIDER_GOOGLE} from 'react-native-maps';
import ErrandCard from '../../../components/@shared/Card/ErrandCard';
import {UserContext} from '../../../contexts/UserContext';
import useErrand from '../../../hooks/errand/useErrand';
import useCategory from '../../../hooks/useCategory';
import {calculateDistance, diffDateToString} from '../../../utils/util';
import dayjs from 'dayjs';
import Carousel from 'react-native-reanimated-carousel';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  BottomTabNavigateParams,
  ErrandStackParam,
} from '../../../types/navigation';
import MyIcon from '../../../components/@shared/MyIcons';
import {useTranslation} from 'react-i18next';
import GoSetting from '../../../components/@shared/GoSetting/GoSetting';

const INIT_REGION = {
  latitude: 21.03333,
  longitude: 105.85,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const {width} = Dimensions.get('window');

const Map = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<BottomTabNavigateParams & ErrandStackParam>
    >();
  const ref = useRef<MapView>(null);
  const {errandList} = useErrand({needInitLoad: true});
  const {
    translateLanguage,
    myPosition,
    setMyPosition,
    isLocationNotPermit,
  } = useContext(UserContext);
  const [isVisibleGoSetting, setIsVisibleGoSetting] =
    useState(isLocationNotPermit);
  const {getCategoryImage, convertCategoryIdToName} = useCategory();

  const errandListSortbyDistance = errandList
    .filter(errand => {
      const distance = calculateDistance(myPosition as LatLng, {
        latitude: errand?.latitude as number,
        longitude: errand?.longitude as number,
      });
      if (distance <= 500) {
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      const aDistance = calculateDistance(myPosition as LatLng, {
        latitude: a?.latitude as number,
        longitude: a?.longitude as number,
      });
      const bDistance = calculateDistance(myPosition as LatLng, {
        latitude: b?.latitude as number,
        longitude: b?.longitude as number,
      });
      if (aDistance > bDistance) {
        return 1;
      }
      if (aDistance < bDistance) {
        return -1;
      }
      return 0;
    });

  const moveToLocation = (position: LatLng) => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(granted => {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsVisibleGoSetting(false);
        GeoLocation.getCurrentPosition(
          position => {
            setMyPosition(position.coords);
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        ref.current?.animateToRegion({...INIT_REGION, ...position}, 500);
      } else {
        setIsVisibleGoSetting(true);
        return;
      }
    });
  };

  const handleActiveItemChange = (index: number) => {
    const position = {
      latitude: errandListSortbyDistance[index]?.latitude as number,
      longitude: errandListSortbyDistance[index]?.longitude as number,
    };
    moveToLocation(position);
  };

  return (
    <View style={styles.page}>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        ref={ref}
        initialRegion={INIT_REGION}
        zoomEnabled={true}>
        {myPosition && (
          <MapMarker
            ref={r => r?.showCallout()}
            title={'My position'}
            coordinate={myPosition as LatLng}
            style={{width: 30, height: 30}}
            pinColor="#FB3048">
            <Image
              style={{width: 30, height: 30, resizeMode: 'contain'}}
              source={require('../../../assets/images/myPosition.png')}
            />
          </MapMarker>
        )}
        {errandListSortbyDistance.map(errand => {
          const position = {
            latitude: errand?.latitude as number,
            longitude: errand?.longitude as number,
          };
          return (
            <MapMarker
              title={errand?.title as string}
              description={
                calculateDistance(myPosition as LatLng, position)?.toFixed(2) +
                'km'
              }
              pinColor="#FB3048"
              key={errand?.id}
              style={{width: 30, height: 30}}
              coordinate={position}>
              <Image
                style={{width: 30, height: 30, resizeMode: 'contain'}}
                source={require('../../../assets/images/position.png')}
              />
            </MapMarker>
          );
        })}
      </MapView>
      <TouchableOpacity
        style={{
          ...styles.myLocationIcon,
          bottom: errandListSortbyDistance.length > 0 ? 300 : 200,
        }}
        onPress={() => {
          moveToLocation(myPosition as LatLng);
        }}>
        <MyIcon name="mapMyLocation" />
      </TouchableOpacity>
      <View
        style={{
          ...styles.errandCardContainer,
          bottom: errandListSortbyDistance.length > 0 ? 80 : 120,
        }}>
        {errandListSortbyDistance.length > 0 ? (
          <Carousel
            loop
            width={width}
            height={width / 2}
            data={errandListSortbyDistance}
            scrollAnimationDuration={500}
            onSnapToItem={handleActiveItemChange}
            renderItem={({item}) => {
              const position = {
                latitude: item?.latitude as number,
                longitude: item?.longitude as number,
              };
              const distance = isNaN(
                calculateDistance(myPosition as LatLng, position),
              )
                ? '0000.0km'
                : `${calculateDistance(myPosition as LatLng, position).toFixed(
                    1,
                  )}km`;
              const createdAt = diffDateToString(dayjs(item?.createdAt));
              return (
                <TouchableOpacity
                  key={item?.id}
                  style={styles.errandCard}
                  onPress={() => {
                    navigation.navigate('ErrandTab');
                    setTimeout(() => {
                      navigation.navigate('ErrandDetail', {id: item?.id});
                    }, 250);
                  }}>
                  <ErrandCard
                    language={translateLanguage}
                    title={item?.title as string}
                    category={convertCategoryIdToName(
                      item?.categoryId as string,
                    )}
                    imgSrc={getCategoryImage(item?.categoryId as string)}
                    distance={distance}
                    time={createdAt}
                    price={`${item?.price?.toLocaleString()}₫`}
                  />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View style={styles.errandCard}>
            <Text style={{fontSize: 12, textAlign: 'center', color: '#757575'}}>
              {t('noErrandNearby')}
            </Text>
          </View>
        )}
      </View>
      {isVisibleGoSetting && (
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
            title="Allow Handsfree to access your location to move your location. Press:"
            onOpenSetting={() => setIsVisibleGoSetting(false)}
            onClose={() => setIsVisibleGoSetting(false)}
          />
        </View>
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#fff',
  },
  errandCardContainer: {
    position: 'absolute',
    bottom: 120,
    width: '100%',
    alignItems: 'center',
  },
  errandCard: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  myLocationIcon: {
    position: 'absolute',
    right: 20,
    bottom: 200,
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    zIndex: 100,
  },
});
