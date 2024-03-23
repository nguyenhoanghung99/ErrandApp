import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParam} from '../../../types/navigation';
import HomeHeaderLeft from '../../../components/Home/HomeHeaderLeft';
// import HomeHeaderRight from '../../../components/Home/HomeHeaderRight';
import {View, Text} from 'react-native';
import {Home, Notification} from '../../../pages/App/Home';

const Stack = createNativeStackNavigator<HomeStackParam>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#000',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: '',
          headerLeft: () => <HomeHeaderLeft />,
          // headerRight: () => <HomeHeaderRight />,
        }}
      />
      <Stack.Screen
        name="Notification"
        options={{
          headerShadowVisible: false,
          headerTitle: '알림',
          headerRight: () => (
            <View>
              <Text style={{color: '#171717'}}>설정</Text>
            </View>
          ),
        }}
        component={Notification}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
