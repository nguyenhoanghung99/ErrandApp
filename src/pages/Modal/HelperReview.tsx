import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MyIcon from '../../components/@shared/MyIcons';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {ModalStackParam} from '../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useHelperForm from '../../hooks/helper/useHelperForm';

const HelperReview = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ModalStackParam>>();
  const {t} = useTranslation();
  const {handleCancelHelperForm} = useHelperForm();

  return (
    <View style={styles.page}>
      <MyIcon name="helperReview" style={{marginTop: 120}} />
      <Text style={styles.title}>{t('helperReview')}</Text>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.idont}
          onPress={() => {
            Alert.alert(t('helperCloseAlert'), '', [
              {
                text: t('helperCloseContinue'),
              },
              {
                text: t('helperCloseCancel'),
                onPress: handleCancelHelperForm,
                style: 'destructive',
              },
            ]);
          }}>
          <Text style={styles.idontText}>{t('helperReviewCancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ido}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.idoText}>{t('ido')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HelperReview;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    color: '#171717',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 60,
    maxWidth: '80%',
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
  idont: {
    backgroundColor: '#EBEBEB',
    borderRadius: 6,
    paddingVertical: 17,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  idontText: {
    fontSize: 15,
    color: '#757575',
    fontWeight: '500',
  },
  ido: {
    flex: 2,
    backgroundColor: '#FB3048',
    borderRadius: 6,
    paddingVertical: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  idoText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
});
