import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import MapView, {PROVIDER_GOOGLE, MapMarker} from 'react-native-maps';
import ErrandMapBottomSheet from '../../../components/Errand/ErrandMap/ErrandMapBottomSheet';
import {ErrandMapAddressContext} from '../../../contexts/ErrandMapAddressContext';
import MyIcon from '../../../components/@shared/MyIcons';
import {UserContext} from '../../../contexts/UserContext';

const ErrnadMap = () => {
  const mapRef = React.useRef<MapView>(null);
  const {myPosition} = useContext(UserContext);
  const {region, markerPosition, address} = useContext(ErrandMapAddressContext);

  const moveToMyLocation = () => {
    mapRef.current?.animateToRegion({...region, ...myPosition}, 500);
  };

  return (
    <View style={styles.page}>
      <View style={{position: 'relative', flex: 1}}>
        <MapView
          ref={mapRef}
          style={{height: '100%', width: '100%'}}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          region={region}
          zoomEnabled={true}>
          {markerPosition && (
            <MapMarker
              coordinate={markerPosition}
              title={address}
              style={{width: 30, height: 30}}>
              <Image
                source={require('../../../assets/images/position.png')}
                style={{width: 30, height: 30, resizeMode: 'contain'}}
              />
            </MapMarker>
          )}
          {myPosition && (
            <MapMarker
              ref={ref => {
                if (ref) {
                  ref.showCallout();
                }
              }}
              style={{width: 30, height: 30}}
              coordinate={myPosition}
              title="My Position">
              <Image
                source={require('../../../assets/images/myPosition.png')}
                style={{width: 30, height: 30, resizeMode: 'contain'}}
              />
            </MapMarker>
          )}
        </MapView>
        <TouchableOpacity
          style={styles.myLocationIcon}
          onPress={moveToMyLocation}>
          <MyIcon name="mapMyLocation" />
        </TouchableOpacity>
      </View>

      <ErrandMapBottomSheet />
    </View>
  );
};

export default ErrnadMap;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#fff',
  },
  myLocationIcon: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    zIndex: 100,
  },
});
