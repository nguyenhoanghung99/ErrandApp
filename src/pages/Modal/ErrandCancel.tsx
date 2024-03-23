import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FullWidthButton from '../../components/@shared/Button/FullWidthButton';
import useErrandDetail from '../../hooks/errand/useErrandDetail';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {BottomTabNavigateParams, ModalStackParam} from '../../types/navigation';
import useChat from '../../hooks/chat/useChat';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import useUser from '../../hooks/user/useUser';
import {postMatchCompleteNotification} from '../../utils/notification';

type Props = NativeStackScreenProps<ModalStackParam, 'ErrandCancel'>;

const CANCEL_REASON_ITEMS = [
  {key: 'noResponse'},
  {key: 'alreadySolved'},
  {key: 'unfriendly'},
  {key: 'tooLate'},
  {key: 'otherReasons'},
];

const ErrandCancel = ({route}: Props) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomTabNavigateParams>>();
  const {errandId, chatId} = route.params;
  const [selectedCancelReasonKeys, setSelectedCancelReasonKeys] = useState<
    string[]
  >([]);
  const {errand, updateErrandStatus, updateErrandCancelReasons} =
    useErrandDetail(errandId);
  const {updateChatStatus} = useChat(chatId);
  const {user: helperInfo} = useUser(errand?.helperId || '');

  return (
    <ScrollView style={{backgroundColor: '#f6f6f6'}}>
      <View style={styles.page}>
        <View style={styles.cancelContainer}>
          <Text style={styles.title}>{t('tellTheReason')}</Text>
          <Text style={styles.description}>
            {t('tellTheReasonDescription')}
          </Text>
          <View style={styles.reviewButtonContainer}>
            {CANCEL_REASON_ITEMS.map(item => {
              const isSelected = selectedCancelReasonKeys.includes(item.key);
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (isSelected) {
                      setSelectedCancelReasonKeys(
                        selectedCancelReasonKeys.filter(
                          selectedKey => selectedKey !== item.key,
                        ),
                      );
                    } else {
                      setSelectedCancelReasonKeys([
                        ...selectedCancelReasonKeys,
                        item.key,
                      ]);
                    }
                  }}
                  key={item.key}
                  style={{
                    ...styles.reviewButton,
                    borderWidth: 1,
                    borderColor: isSelected ? '#171717' : '#FFF',
                  }}>
                  <Text
                    style={{
                      ...styles.reviewButtonText,
                      color: isSelected ? '#171717' : '#C7C7CC',
                    }}>
                    {t(item.key)}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {/* <TouchableOpacity style={styles.reviewButton}>
              <Text style={styles.reviewButtonText}>
                헬퍼를 신고하고 싶어요.
              </Text>
              <MyIcon
                name="rightGrayArrow"
                style={{position: 'absolute', right: 24}}
              />
            </TouchableOpacity> */}
          </View>
          <View style={styles.completeButton}>
            <FullWidthButton
              title={t('cancelTrade')}
              onPress={async () => {
                if (selectedCancelReasonKeys.length === 0) {
                  Alert.alert(t('tellTheReason'));
                  return;
                }
                await updateChatStatus('INACTIVE');
                await updateErrandCancelReasons(
                  errandId,
                  selectedCancelReasonKeys,
                );
                await updateErrandStatus(errandId, 'CANCELED');
                helperInfo?.fcmToken &&
                  postMatchCompleteNotification({
                    type: 'CANCEL',
                    errandTitle: errand?.title || '',
                    errandId: errandId,
                    fcmToken: helperInfo.fcmToken,
                    language: helperInfo?.i18n || 'en',
                  });
                navigation.goBack();
                setTimeout(() => {
                  navigation.popToTop();
                }, 500);
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ErrandCancel;

const styles = StyleSheet.create({
  page: {
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#171717',
  },
  cancelContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  description: {
    maxWidth: '50%',
    marginTop: 20,
    fontSize: 12,
    color: '#757575',
    fontWeight: '300',
    lineHeight: 20,
  },
  reviewButtonContainer: {
    marginTop: 36,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reviewButton: {
    position: 'relative',
    width: '100%',
    height: 45,
    borderRadius: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#c7c7cc',
  },
  completeButton: {
    marginTop: 17,
    width: '100%',
    alignSelf: 'center',
  },
});
