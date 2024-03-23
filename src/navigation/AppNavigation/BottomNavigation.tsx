import React, {useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  ChatNavigator,
  ErrandNavigator,
  HomeNavigator,
  MapNavigator,
  MyNavigator,
} from './Navigator';
import MyIcon from '../../components/@shared/MyIcons';
import {useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import messaging from '@react-native-firebase/messaging';
import FlashMessage, {
  hideMessage,
  showMessage,
} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';
import {
  BottomTabNavigateParams,
  ChatStackParam,
  ErrandStackParam,
} from '../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        BottomTabNavigateParams & ChatStackParam & ErrandStackParam
      >
    >();
  theme.colors.secondaryContainer = 'transperent';

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      showMessage({
        message: remoteMessage.notification?.title || '',
        description: remoteMessage.notification?.body || '',
        onPress: () => {
          if (remoteMessage.data?.chatId) {
            navigation.navigate('ChatTab');
            setTimeout(() => {
              navigation.navigate('ChatRoom', {
                chatId: remoteMessage.data?.chatId as string,
                chatRoomName: remoteMessage.data?.chatRoomName as string,
              });
            });
          } else {
            navigation.navigate('ErrandTab');
            setTimeout(() => {
              navigation.navigate('ErrandDetail', {
                id: remoteMessage.data?.errandId as string,
              });
            });
          }
          hideMessage();
        },
      });
    });

    return unsubscribe;
  }, []);

  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage.data?.chatId) {
      navigation.navigate('ChatTab');
      setTimeout(() => {
        navigation.navigate('ChatRoom', {
          chatId: remoteMessage.data?.chatId as string,
          chatRoomName: remoteMessage.data?.chatRoomName as string,
        });
      });
    }
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        if (remoteMessage.data?.chatId) {
          navigation.navigate('ChatTab');
          setTimeout(() => {
            navigation.navigate('ChatRoom', {
              chatId: remoteMessage.data?.chatId as string,
              chatRoomName: remoteMessage.data?.chatRoomName as string,
            });
          });
        }
      }
    });

  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeTab"
        theme={theme}
        activeColor="#171717"
        inactiveColor="#BDBDBD"
        barStyle={styles.bar}>
        <Tab.Screen
          name="HomeTab"
          component={HomeNavigator}
          options={{
            title: t('home'),
            tabBarIcon: ({focused}) => (
              <MyIcon name={focused ? 'homeFocus' : 'home'} />
            ),
          }}
        />
        <Tab.Screen
          name="MapTab"
          component={MapNavigator}
          options={{
            title: t('map'),
            tabBarIcon: ({focused}) => (
              <MyIcon name={focused ? 'mapFocus' : 'map'} />
            ),
          }}
        />
        <Tab.Screen
          name="ErrandTab"
          component={ErrandNavigator}
          options={{
            title: t('errand'),
            tabBarIcon: ({focused}) => (
              <MyIcon name={focused ? 'errandFocus' : 'errand'} />
            ),
          }}
        />
        <Tab.Screen
          name="ChatTab"
          component={ChatNavigator}
          options={{
            title: t('chat'),
            tabBarIcon: ({focused}) => (
              <MyIcon name={focused ? 'chatFocus' : 'chat'} />
            ),
          }}
        />
        <Tab.Screen
          name="MyTab"
          component={MyNavigator}
          options={{
            title: t('myPage'),
            tabBarIcon: ({focused}) => (
              <MyIcon name={focused ? 'myFocus' : 'my'} />
            ),
          }}
        />
      </Tab.Navigator>
      <FlashMessage position="top" />
    </>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#FCFCFC',
    position: 'absolute',
    overflow: 'hidden',
    height: 100,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(87, 87, 87, 0.10)',
  },
});
