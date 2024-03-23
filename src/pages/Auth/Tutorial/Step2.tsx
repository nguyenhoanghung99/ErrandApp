import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyIcon from '../../../components/@shared/MyIcons';
import FooterButton from '../../../components/@shared/Button/FooterButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParam} from '../../../types/navigation';
import {useTranslation} from 'react-i18next';

const Step2 = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParam>>();
  return (
    <View style={styles.page}>
      <View style={styles.stepContainer}>
        <View style={styles.step} />
      </View>
      <View style={{alignItems: 'center'}}>
        <MyIcon name="step2Icon" style={{marginBottom: 60}} />
        <Text style={styles.title}>{t('onboardingStep2Title')}</Text>
        <Text style={styles.description}>
          {t('onboardingStep2Description')}
        </Text>
      </View>
      <FooterButton
        title={t('next')}
        onPress={() => {
          navigation.navigate('Step3');
        }}
      />
    </View>
  );
};

export default Step2;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    position: 'absolute',
    top: 10,
    borderRadius: 3,
    width: '90%',
    height: 6,
    backgroundColor: '#d9d9d9',
  },
  step: {
    borderRadius: 3,
    width: '66%',
    height: 6,
    backgroundColor: '#FF7979',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#171717',
  },
  description: {
    paddingHorizontal: 20,
    marginTop: 28,
    textAlign: 'center',
    fontSize: 14,
    color: '#707070',
    lineHeight: 24,
  },
});
