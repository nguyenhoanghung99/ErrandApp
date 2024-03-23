import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ModalStackParam} from '../../types/navigation';

type Props = NativeStackScreenProps<ModalStackParam, 'ErrandMapDetail'>;

import MapView, {LatLng, MapMarker, PROVIDER_GOOGLE} from 'react-native-maps';
import {INIT_REGION} from '../../contexts/ErrandMapAddressContext';
import ErrandCard from '../../components/@shared/Card/ErrandCard';
import useCategory from '../../hooks/useCategory';
import {calculateDistance, diffDateToString} from '../../utils/util';
import dayjs from 'dayjs';
import MyIcon from '../../components/@shared/MyIcons';
import {UserContext} from '../../contexts/UserContext';

const ErrandMapDetail = ({route}: Props) => {
  const {translateLanguage, myPosition} = useContext(UserContext);
  const {convertCategoryIdToName, getCategoryImage} = useCategory();
  const {errand} = route.params;
  const ref = useRef<MapView>(null);
  const pos = {
    latitude: errand?.latitude as number,
    longitude: errand?.longitude as number,
  };
  const address = errand?.address as string;
  const distance = isNaN(calculateDistance(myPosition as LatLng, pos))
    ? '0000.0km'
    : `${calculateDistance(myPosition as LatLng, pos).toFixed(1)}km`;
  const createdAt = diffDateToString(dayjs(errand?.createdAt));

  const moveToLocation = (position: LatLng) => {
    ref.current?.animateToRegion({...INIT_REGION, ...position}, 500);
  };

  return (
    <View style={styles.page}>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        ref={ref}
        initialRegion={{...INIT_REGION, ...pos}}
        zoomEnabled={true}>
        {pos && (
          <MapMarker
            coordinate={pos}
            title={errand?.title as string}
            description={address}
            style={{width: 30, height: 30}}
            ref={markerRef => {
              markerRef?.showCallout();
            }}>
            <Image
              style={{width: 30, height: 30, resizeMode: 'contain'}}
              source={require('../../assets/images/position.png')}
            />
          </MapMarker>
        )}
        {myPosition && (
          <MapMarker
            coordinate={myPosition}
            title="My Position"
            ref={markerRef => {
              markerRef?.showCallout();
            }}
            style={{width: 30, height: 30}}>
            <Image
              source={require('../../assets/images/myPosition.png')}
              style={{width: 30, height: 30, resizeMode: 'contain'}}
            />
          </MapMarker>
        )}
      </MapView>
      <View style={styles.errandCardContainer}>
        <TouchableOpacity
          style={styles.myLocationIcon}
          onPress={() => moveToLocation(myPosition as LatLng)}>
          <MyIcon name="mapMyLocation" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.errandCard}
          onPress={() => moveToLocation(pos)}>
          <ErrandCard
            language={translateLanguage}
            title={errand?.title as string}
            category={convertCategoryIdToName(errand?.categoryId as string)}
            imgSrc={getCategoryImage(errand?.categoryId as string)}
            distance={distance}
            time={createdAt}
            price={`${errand?.price?.toLocaleString()}₫`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ErrandMapDetail;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#fff',
  },
  errandCardContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 70,
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
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
