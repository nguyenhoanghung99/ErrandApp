import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';
import {UserContextProps, initUser} from '../constants/model/user';
import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {GetUserQuery} from '../API';
import {GraphQLResult} from '@aws-amplify/api';
import {getUser} from '../graphql/queries';
import GeoLocation from 'react-native-geolocation-service';
import {useTranslation} from 'react-i18next';
import {LatLng} from 'react-native-maps';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {updateUser} from '../graphql/mutations';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }

  return authStatus;
}

export const UserContext = createContext<UserContextProps>(initUser);

export const UserProvider = ({children}: PropsWithChildren) => {
  const {i18n} = useTranslation();
  const {user, authStatus} = useAuthenticator();
  const [isLocationNotPermit, setIsLocationNotPermit] = useState(false);
  const [userInfo, setUserInfo] = useState<UserContextProps>(initUser);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [myPosition, setMyPosition] = useState<LatLng>();
  const [translateLanguage, setTranslateLanguage] = useState('original');
  const [distanceFilter, setDistanceFilter] = useState('15000km');

  useEffect(() => {
    if (authStatus === 'authenticated') {
      if (Platform.OS === 'ios') {
        GeoLocation.requestAuthorization('whenInUse').then(() => {
          GeoLocation.getCurrentPosition(
            position => {
              setMyPosition(position.coords);
            },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        });
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setIsLocationNotPermit(false);
            GeoLocation.getCurrentPosition(
              position => {
                setMyPosition(position.coords);
              },
              error => {
                console.log(error.code, error.message);
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
          } else {
            setIsLocationNotPermit(true);
            return;
          }
        });
      }
    }
  }, [authStatus, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]);

  useEffect(() => {
    if (!userInfo.id) {
      return;
    }
    if (authStatus === 'authenticated') {
      requestUserPermission().then(res => {
        if (res !== messaging.AuthorizationStatus.AUTHORIZED) {
          return;
        }
        messaging()
          .getToken()
          .then(token => {
            if (userInfo.id) {
              API.graphql(
                graphqlOperation(updateUser, {
                  input: {id: userInfo.id, fcmToken: token},
                }),
              );
            }
          })
          .then(() => {
            setNeedUpdate(true);
          });
      });
    }
  }, [authStatus, userInfo.id]);

  useEffect(() => {
    if (!userInfo?.i18n) {
      return;
    }
    if (userInfo.i18n === 'original') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage(userInfo?.i18n);
    }
  }, [userInfo.i18n]);

  const handleInitUser = () => {
    setUserInfo(initUser);
  };

  const getUserQuery = async (userId: string) => {
    const res = (await API.graphql<GetUserQuery>(
      graphqlOperation(getUser, {id: userId}),
    )) as GraphQLResult<GetUserQuery>;
    if (res.data?.getUser) {
      setUserInfo({
        ...initUser,
        ...res.data.getUser,
      });
    }
  };

  useEffect(() => {
    if (user) {
      const userId = user.attributes?.name;
      userId && getUserQuery(userId);
    }
  }, [user]);

  useEffect(() => {
    if (needUpdate) {
      getUserQuery(userInfo.id);
      setNeedUpdate(false);
    }
  }, [needUpdate]);

  return (
    <UserContext.Provider
      value={{
        ...userInfo,
        isLocationNotPermit,
        setIsLocationNotPermit,
        setNeedUpdate,
        handleInitUser,
        getUser: getUserQuery,
        myPosition,
        setMyPosition,
        translateLanguage,
        setTranslateLanguage,
        distanceFilter,
        setDistanceFilter,
      }}>
      {children}
    </UserContext.Provider>
  );
};
