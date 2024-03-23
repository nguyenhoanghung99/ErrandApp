import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MyIcon from '../@shared/MyIcons';
import FullWidthButton from '../@shared/Button/FullWidthButton';
import {useNavigation} from '@react-navigation/native';
import {HomeStackParam, RootNavigationProps} from '../../types/navigation';
import {useTranslation} from 'react-i18next';

// interface RequestFormSectionProps {}

const RequestFormSection = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<RootNavigationProps<HomeStackParam>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => {
          navigation.navigate('ErrandForm', {});
        }}>
        <MyIcon name="search" />
        <TextInput
          inputMode="none"
          placeholder={t('noCategory')}
          style={styles.input}
          editable={false}
          placeholderTextColor={'#9B9B9B'}
        />
      </TouchableOpacity>
      <View style={styles.button}>
        <FullWidthButton
          title={t('requestErrand')}
          onPress={() => {
            navigation.navigate('ErrandForm', {});
          }}
        />
      </View>
    </View>
  );
};

export default RequestFormSection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFF',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 6,
    height: 54,
    alignItems: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 12,
  },
  input: {
    fontSize: 14,
    marginLeft: 25,
    color: '#9B9B9B',
  },
  button: {
    marginTop: 13,
    marginHorizontal: 16,
  },
});
