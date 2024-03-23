import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ErrandStackParam} from '../../../types/navigation';
import Errand from '../../../pages/App/Errand/Errand';
import ErrandDetail from '../../../pages/App/Errand/ErrandDetail';
// import {View} from 'react-native';
import MyErrandVolunteers from '../../../pages/App/My/MyErrandVolunteers';
import MyErrandVolunteerProfile from '../../../pages/App/My/MyErrandVolunteerProfile';
import MyErrandChatRoom from '../../../pages/App/My/MyErrandChatRoom';
import MyErrandVolunteerReviewList from '../../../pages/App/My/MyErrandVolunteerReviewList';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator<ErrandStackParam>();

const ErrandNavigator = () => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#000',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Errand"
        component={Errand}
        options={{
          title: t('errand'),
        }}
      />
      <Stack.Screen
        name="ErrandDetail"
        component={ErrandDetail}
        options={{
          title: t('yourRequest'),
        }}
      />
      <Stack.Screen
        name="MyErrandVolunteers"
        component={MyErrandVolunteers}
        options={{
          title: t('viewApplicant'),
        }}
      />
      <Stack.Screen
        name="MyErrandVolunteerProfile"
        component={MyErrandVolunteerProfile}
        options={{
          title: t('profile'),
        }}
      />
      <Stack.Screen
        name="MyErrandChatRoom"
        component={MyErrandChatRoom}
        options={({route}) => ({
          title: route.params?.headerName as string,
        })}
      />
      <Stack.Screen
        name="MyErrandVolunteerReviewList"
        component={MyErrandVolunteerReviewList}
        options={{
          title: t('review'),
        }}
      />
    </Stack.Navigator>
  );
};

export default ErrandNavigator;
