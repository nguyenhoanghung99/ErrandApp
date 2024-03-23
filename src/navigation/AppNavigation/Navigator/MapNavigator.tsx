import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MapStackParam} from '../../../types/navigation';
import Map from '../../../pages/App/Map/Map';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator<MapStackParam>();

const MapNavigator = () => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#000',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          title: t('map'),
        }}
      />
    </Stack.Navigator>
  );
};

export default MapNavigator;
