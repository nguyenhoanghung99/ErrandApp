import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MyIcon from '../@shared/MyIcons';
import {CertificateStatus} from '../../types/user';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ModalStackParam} from '../../types/navigation';
import {useTranslation} from 'react-i18next';

interface ProfileCertificateInfoProps {
  identity: CertificateStatus;
  phoneInterview: CertificateStatus;
  facebook: CertificateStatus;
}

const ProfileCertificateInfo = ({
  identity,
  phoneInterview,
  facebook,
}: ProfileCertificateInfoProps) => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<ModalStackParam>>();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{t('helperCredential')}</Text>
      <View style={styles.container}>
        <View style={styles.row}>
          <MyIcon
            name={identity === 'APPROVED' ? 'checkIcon' : 'checkIconEmpty'}
          />
          <Text style={styles.rowText}>{t('idVerify')}</Text>
        </View>
        <View style={styles.row}>
          <MyIcon
            name={
              phoneInterview === 'APPROVED' ? 'checkIcon' : 'checkIconEmpty'
            }
          />
          <Text style={styles.rowText}>{t('phoneVerify')}</Text>
        </View>
        <View style={styles.row}>
          <MyIcon
            name={facebook === 'APPROVED' ? 'checkIcon' : 'checkIconEmpty'}
          />
          <Text style={styles.rowText}>{t('facebookVerify')}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PolicyModal', {
            title: t('safety'),
            policy: 'certification',
          })
        }>
        <Text style={styles.anchor}>
          {t('safety')}
          {' > '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCertificateInfo;

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#171717',
    marginBottom: 30,
  },
  container: {
    gap: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  rowText: {
    fontSize: 14,
    color: '#171717',
  },
  anchor: {
    marginTop: 24,
    fontSize: 14,
    color: '#FB3048',
    textDecorationLine: 'underline',
  },
});
