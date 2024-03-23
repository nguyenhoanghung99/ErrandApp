import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {MyStackParam} from '../../../types/navigation';
import My from '../../../pages/App/My/My';
import MyErrand from '../../../pages/App/My/MyErrand';
import ErrandDetail from '../../../pages/App/Errand/ErrandDetail';
import MyErrandVolunteers from '../../../pages/App/My/MyErrandVolunteers';
import MyErrandVolunteerProfile from '../../../pages/App/My/MyErrandVolunteerProfile';
import MyErrandChatRoom from '../../../pages/App/My/MyErrandChatRoom';
import MyErrandVolunteerReviewList from '../../../pages/App/My/MyErrandVolunteerReviewList';
import MyVolunteers from '../../../pages/App/My/MyVolunteers';
import MyHelperSetting from '../../../pages/App/My/MyHelperSetting';
import MyProfile from '../../../pages/App/My/MyProfile';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyProfileEdit from '../../../pages/App/My/MyProfileEdit';
import MyLanguage from '../../../pages/App/My/MyLanguage';
import {useTranslation} from 'react-i18next';
import {Menu, PaperProvider} from 'react-native-paper';
import MyIcon from '../../../components/@shared/MyIcons';
import {API, graphqlOperation} from 'aws-amplify';
import {deleteErrand} from '../../../graphql/mutations';
import MyNotice from '../../../pages/App/My/MyNotice';

const Stack = createNativeStackNavigator<MyStackParam>();

const MyNavigator = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<MyStackParam>>();

  const [isVisibleDropDown, setVisibleDropDown] = React.useState(false);

  return (
    <PaperProvider>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: '#000',
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="My"
          component={My}
          options={{
            title: t('myPage'),
          }}
        />
        <Stack.Screen
          name="MyErrand"
          component={MyErrand}
          options={{
            title: t('viewReferrals'),
          }}
        />
        <Stack.Screen
          name="MyErrandDetail"
          component={ErrandDetail}
          options={({route}) => ({
            title: t('viewReferrals'),
            headerRight: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Menu
                  visible={isVisibleDropDown}
                  onDismiss={() => {
                    setVisibleDropDown(false);
                  }}
                  anchor={
                    <TouchableOpacity
                      onPress={() => {
                        setVisibleDropDown(true);
                      }}>
                      <MyIcon name="more" />
                    </TouchableOpacity>
                  }>
                  <Menu.Item
                    onPress={() => {
                      Alert.alert(t('alert'), t('deleteErrand'), [
                        {
                          text: t('cancel'),
                          onPress: () => {},
                          style: 'cancel',
                        },
                        {
                          text: t('delete'),
                          onPress: async () => {
                            setVisibleDropDown(false);
                            await API.graphql(
                              graphqlOperation(deleteErrand, {
                                input: {id: route.params?.id},
                              }),
                            );
                            navigation.pop();
                          },
                        },
                      ]);
                      setVisibleDropDown(false);
                    }}
                    title={t('delete')}
                  />
                </Menu>
              </View>
            ),
          })}
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
        <Stack.Screen
          name="MyVolunteers"
          component={MyVolunteers}
          options={{
            title: t('applicantHistory'),
          }}
        />
        <Stack.Screen
          name="MyHelperSetting"
          component={MyHelperSetting}
          options={{
            title: t('applyHelper'),
          }}
        />
        <Stack.Screen
          name="MyLanguage"
          component={MyLanguage}
          options={{
            title: t('languageSetting'),
          }}
        />
        <Stack.Screen
          name="MyNotice"
          component={MyNotice}
          options={{
            title: t('notice'),
          }}
        />
        <Stack.Screen
          name="MyProfileEdit"
          component={MyProfileEdit}
          options={{
            title: t('editProfile'),
          }}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            title: t('profile'),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MyProfileEdit');
                }}>
                <Text style={{fontSize: 16, color: '#757575'}}>
                  {t('edit')}
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default MyNavigator;
