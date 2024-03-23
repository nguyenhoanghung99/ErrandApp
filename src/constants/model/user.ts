import {LatLng} from 'react-native-maps';
import {User} from '../../API';
import { GeoCoordinates } from 'react-native-geolocation-service';
export interface UserContextProps extends User {
  getUser: (userId: string) => Promise<void>;
  setNeedUpdate: (needUpdate: boolean) => void;
  handleInitUser: () => void;
  myPosition?: LatLng;
  setMyPosition: (coords: GeoCoordinates) => void;
  translateLanguage: string;
  setTranslateLanguage: (language: string) => void;
  distanceFilter: string;
  setDistanceFilter: (distance: string) => void;
  isLocationNotPermit: boolean;
  setIsLocationNotPermit: (isVisible: boolean) => void;
}

export const initUser: UserContextProps = {
  __typename: 'User',
  id: '',
  referralCode: '',
  clientId: '',
  helperId: '',
  email: '',
  profileImage: '',
  nickname: '',
  isHelper: false,
  helperProfileImage: '',
  helperName: '',
  helperBirthDate: '',
  helperIdentityImage: '',
  helperIdentityFaceImage: '',
  helperPhone: '',
  helperFacebook: '',
  helperIdentityStatus: '',
  helperPhoneStatus: '',
  helperFacebookStatus: '',
  createdAt: '',
  updatedAt: '',
  helperScore: 0,
  helperCompletedCnt: 0,
  setNeedUpdate: () => {},
  handleInitUser: () => {},
  getUser: async () => {},
  myPosition: {latitude: 21.03333, longitude: 105.85},
  setMyPosition: () => {},
  translateLanguage: '',
  setTranslateLanguage: () => {},
  distanceFilter: '10km',
  setDistanceFilter: () => {},
  isLocationNotPermit: false,
  setIsLocationNotPermit: () => {},
};
