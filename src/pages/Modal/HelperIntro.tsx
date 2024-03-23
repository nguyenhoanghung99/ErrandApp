import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyIcon from '../../components/@shared/MyIcons';
import FooterButton from '../../components/@shared/Button/FooterButton';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../types/navigation';
import {useTranslation} from 'react-i18next';

const HelperIntro = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<RootNavigationProps<{}>>();

  return (
    <View style={styles.page}>
      <MyIcon name="introLogo" />
      <Text style={styles.title}>{t('wantHelper')}</Text>
      <Text style={styles.description}>
        {t('wantHelperDescription')}
        {'\n\n'}
        {t('estimate5')}
      </Text>
      <FooterButton
        title={t('applyBecomeHelper')}
        onPress={() => {
          navigation.goBack();
          setTimeout(() => navigation.navigate('HelperForm'));
        }}
      />
    </View>
  );
};

export default HelperIntro;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginTop: 42,
    color: '#171717',
  },
  description: {
    fontSize: 14,
    marginTop: 42,
    textAlign: 'center',
    color: '#707070',
    paddingBottom: 150,
  },
});
