import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyIcon from '../../components/@shared/MyIcons';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {ModalStackParam} from '../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FullWidthButton from '../../components/@shared/Button/FullWidthButton';

const HelperPhone = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ModalStackParam>>();
  const {t} = useTranslation();

  return (
    <View style={styles.page}>
      <MyIcon name="helperComplete" style={{marginTop: 120}} />
      <Text style={styles.title}>{t('helperComplete')}</Text>
      <Text style={styles.description}>{t('helperCompleteDescription')}</Text>
      <View style={styles.footer}>
        <FullWidthButton
          title={t('check')}
          onPress={() => {
            navigation.popToTop();
          }}
        />
      </View>
    </View>
  );
};

export default HelperPhone;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    color: '#171717',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 30,
  },
  description: {
    fontSize: 14,
    color: '#707070',
    textAlign: 'center',
    marginTop: 60,
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
});
