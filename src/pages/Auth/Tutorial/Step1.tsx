import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyIcon from '../../../components/@shared/MyIcons';
import FooterButton from '../../../components/@shared/Button/FooterButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParam} from '../../../types/navigation';
import {useTranslation} from 'react-i18next';

const Step1 = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParam>>();
  return (
    <View style={styles.page}>
      <View style={styles.stepContainer}>
        <View style={styles.step} />
      </View>
      <View>
        <MyIcon name="step1Icon" style={{marginBottom: 60}} />
        <Text style={styles.title}>{t('onboardingStep1Title')}</Text>
        <Text style={styles.description}>
          {t('onboardingStep1Description')}
        </Text>
      </View>
      <FooterButton
        title={t('next')}
        onPress={() => {
          navigation.navigate('Step2');
        }}
      />
    </View>
  );
};

export default Step1;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    position: 'absolute',
    top: 80,
    borderRadius: 3,
    width: '90%',
    height: 6,
    backgroundColor: '#d9d9d9',
  },
  step: {
    borderRadius: 3,
    width: '33%',
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
