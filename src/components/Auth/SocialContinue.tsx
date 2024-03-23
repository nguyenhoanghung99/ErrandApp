import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  // View,
  ViewStyle,
} from 'react-native';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import MyIcon from '../@shared/MyIcons';

interface SocialContinueProps {
  style?: StyleProp<ViewStyle>;
  type: 'facebook' | 'google' | 'apple';
  onPress?: () => void;
}

const SocialContinue = (props: SocialContinueProps) => {
  const {t} = useTranslation();
  const {type, style, onPress} = props;

  const getSocialByType = useCallback(() => {
    switch (type) {
      case 'facebook':
        return {
          title: t('socialFacebook'),
          backgroundColor: '#1877F2',
          borderColor: '#1877F2',
          color: '#fff',
        };
      case 'google':
        return {
          title: t('socialGoogle'),
          backgroundColor: '#fff',
          borderColor: '#000000',
          color: '#000',
        };
      case 'apple':
        return {
          title: t('socialApple'),
          backgroundColor: '#000000',
          borderColor: '#000000',
          color: '#fff',
        };
      default:
        return {
          title: '',
          backgroundColor: 'transparent',
          borderColor: '#000000',
          color: '#000',
        };
    }
  }, [type]);

  const {title, backgroundColor, borderColor, color} = getSocialByType();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style, {backgroundColor, borderColor}]}>
      <MyIcon name={type} />
      <Text style={[styles.title, {color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SocialContinue;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    backgroundColor: '#900',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 63,
    paddingVertical: 15,
    borderWidth: 1,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: '400',
  },
});
