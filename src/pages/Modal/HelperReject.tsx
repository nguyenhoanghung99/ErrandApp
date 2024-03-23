import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import MyIcon from '../../components/@shared/MyIcons';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {ModalStackParam} from '../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FullWidthButton from '../../components/@shared/Button/FullWidthButton';
import {UserContext} from '../../contexts/UserContext';
import useUser from '../../hooks/user/useUser';

const HelperReview = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ModalStackParam>>();
  const {t} = useTranslation();
  const {id} = useContext(UserContext);
  const {user} = useUser(id);

  return (
    <>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.page}>
          <MyIcon name="helperReview" style={{marginTop: 120}} />
          <Text style={styles.title}>{t('helperReject')}</Text>
          <View style={styles.rejectReason}>
            <Text style={styles.reasonTitle}>{t('helperRejectReason')}</Text>
            <View style={styles.reasonBox}>
              <Text style={{color: '#171717'}}>
                {user?.helperPhoneRejectReason}
              </Text>
              <Text style={{color: '#171717'}}>
                {user?.helperIdentityRejectReason}
              </Text>
              <Text style={{color: '#171717'}}>
                {user?.helperFacebookRejectReason}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <FullWidthButton
          title="헬퍼 재신청하기"
          onPress={() => {
            navigation.navigate('HelperFormRetry');
          }}
        />
      </View>
    </>
  );
};

export default HelperReview;

const styles = StyleSheet.create({
  page: {
    height: '100%',
  },
  title: {
    fontSize: 25,
    color: '#171717',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 30,
    maxWidth: '100%',
    paddingHorizontal: 30,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    gap: 13,
  },
  rejectReason: {
    width: '100%',
    paddingHorizontal: 20,
  },
  reasonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    marginTop: 50,
    marginBottom: 10,
  },
  reasonBox: {
    width: '100%',
    minHeight: 140,
    borderWidth: 1,
    borderColor: '#171717',
    borderRadius: 3,
    padding: 16,
    gap: 4,
  },
});
