import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomNavigation from './BottomNavigation';
import HelperIntro from '../../pages/Modal/HelperIntro';
import HeaderBack from '../../components/@shared/Button/HeaderBack';
import {useNavigation} from '@react-navigation/native';
import HelperForm from '../../pages/Modal/HelperForm';

import ErrandForm from '../../pages/App/Errand/ErrandForm';
import PolicyModal from '../../pages/Modal/PolicyModal';
import {AppStackParam} from '../../types/navigation';
import ErrandMapAddressProvider from '../../contexts/ErrandMapAddressContext';
import ErrandMap from '../../pages/App/Errand/ErrandMap';
import ErrandAddress from '../../pages/App/Errand/ErrandAddress';
import ErrandMapDetail from '../../pages/Modal/ErrandMapDetail';
import ErrandCancel from '../../pages/Modal/ErrandCancel';
import ErrandComplete from '../../pages/Modal/ErrandComplete';
import {useTranslation} from 'react-i18next';
import HelperFormProvider from '../../contexts/HelperFormContext';
import HelperPhone from '../../pages/Modal/HelperPhone';
import HelperComplete from '../../pages/Modal/HelperComplete';
import HelperReview from '../../pages/Modal/HelperReview';
import HelperReject from '../../pages/Modal/HelperReject';
import HelperFormRetry from '../../pages/Modal/HelperFormRetry';

const Stack = createNativeStackNavigator<AppStackParam>();

const AppNavigation = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <ErrandMapAddressProvider>
      <HelperFormProvider>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name="Root"
              component={BottomNavigation}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
            <Stack.Screen
              name="HelperIntro"
              component={HelperIntro}
              options={{
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerShadowVisible: false,
                headerTitle: t('becomeHelper'),
              }}
            />
            <Stack.Screen
              name="HelperForm"
              component={HelperForm}
              options={{
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerTitle: t('becomeHelper'),
              }}
            />
            <Stack.Screen
              name="HelperPhone"
              component={HelperPhone}
              options={{
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerTitle: t('becomeHelper'),
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="HelperComplete"
              component={HelperComplete}
              options={{
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerTitle: t('becomeHelper'),
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="HelperReview"
              component={HelperReview}
              options={{
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerTitle: t('applyHelper'),
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="HelperReject"
              component={HelperReject}
              options={{
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerTitle: t('applyHelper'),
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="HelperFormRetry"
              component={HelperFormRetry}
              options={{
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerTitle: t('becomeHelper'),
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="ErrandForm"
              component={ErrandForm}
              options={{
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerTitle: t('request'),
              }}
            />
            <Stack.Screen
              name="PolicyModal"
              component={PolicyModal}
              options={({route}) => ({
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerTitle: route.params?.title as string,
              })}
            />
            <Stack.Screen
              name="ErrandMap"
              component={ErrandMap}
              options={{
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerTitle: t('viewMap'),
              }}
            />
            <Stack.Screen
              name="ErrandAddress"
              component={ErrandAddress}
              options={{
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerTitle: t('viewMap'),
              }}
            />
            <Stack.Screen
              name="ErrandMapDetail"
              component={ErrandMapDetail}
              options={{
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerTitle: t('viewMap'),
              }}
            />
            <Stack.Screen
              name="ErrandCancel"
              component={ErrandCancel}
              options={{
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerTitle: t('cancelTrade'),
              }}
            />
            <Stack.Screen
              name="ErrandComplete"
              component={ErrandComplete}
              options={{
                headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
                headerTitle: t('writeReview'),
                headerShadowVisible: false,
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </HelperFormProvider>
    </ErrandMapAddressProvider>
  );
};

export default AppNavigation;
