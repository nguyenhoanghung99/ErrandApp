import React, {PropsWithChildren, createContext, useState} from 'react';
import {LatLng, Region} from 'react-native-maps';

export interface ErrandMapAddressContextState {
  address: string;
  setAddress: (address: string) => void;
  addressDetail: string;
  setAddressDetail: (addressDetail: string) => void;
  region: Region;
  setRegion: (region: Region) => void;
  markerPosition: LatLng | null;
  setMarkerPosition: (markerPosition: LatLng | null) => void;
  initState: () => void;
}

export const INIT_REGION = {
  latitude: 21.03333,
  longitude: 105.85,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const initialState: ErrandMapAddressContextState = {
  address: '',
  setAddress: () => {},
  addressDetail: '',
  setAddressDetail: () => {},
  region: INIT_REGION,
  setRegion: () => {},
  markerPosition: null,
  setMarkerPosition: () => {},
  initState: () => {},
};

export const ErrandMapAddressContext =
  createContext<ErrandMapAddressContextState>(initialState);

const ErrandMapAddressProvider = ({children}: PropsWithChildren) => {
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [region, setRegion] = useState(initialState.region);
  const [markerPosition, setMarkerPosition] = useState(
    initialState.markerPosition,
  );

  const initState = () => {
    setAddress('');
    setAddressDetail('');
    setRegion(initialState.region);
    setMarkerPosition(initialState.markerPosition);
  };

  return (
    <ErrandMapAddressContext.Provider
      value={{
        address,
        setAddress,
        addressDetail,
        setAddressDetail,
        region,
        setRegion,
        markerPosition,
        setMarkerPosition,
        initState,
      }}>
      {children}
    </ErrandMapAddressContext.Provider>
  );
};

export default ErrandMapAddressProvider;
