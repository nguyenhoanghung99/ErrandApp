import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatStackParam} from '../../../types/navigation';
import Chat from '../../../pages/App/Chat/Chat';
import ChatRoom from '../../../pages/App/Chat/ChatRoom';
import {useTranslation} from 'react-i18next';
import {Alert, TouchableOpacity, View} from 'react-native';
import MyIcon from '../../../components/@shared/MyIcons';
import {Menu, PaperProvider} from 'react-native-paper';

const Stack = createNativeStackNavigator<ChatStackParam>();

const ChatNavigator = () => {
  const {t} = useTranslation();
  const [isVisibleDropDown, setVisibleDropDown] = useState(false);

  return (
    <PaperProvider>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: '#000',
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            title: t('chat'),
          }}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={({route}) => ({
            title: route.params?.chatRoomName as string,
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
                      Alert.prompt(t('reportContent'), t('reportDescription'), [
                        {
                          text: t('cancel'),
                          onPress: () => {},
                          style: 'cancel',
                        },
                        {
                          text: t('completeReport'),
                          onPress: () => {
                            Alert.alert(t('report'), t('reportSuccess'));
                          },
                        },
                      ]);
                      setVisibleDropDown(false);
                    }}
                    title={t('report')}
                  />
                </Menu>
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default ChatNavigator;
