import i18n from 'i18next';
import {NativeModules, Platform} from 'react-native';
import {initReactI18next} from 'react-i18next';
import en from './languages/en.json';
import ko from './languages/ko.json';
import vi from './languages/vi.json';

const localeIos =
  (Platform.OS === 'ios' &&
    NativeModules.SettingsManager?.settings.AppleLocale) ||
  NativeModules.SettingsManager?.settings.AppleLanguages[0];

// Android:
const localeAndroid = NativeModules.I18nManager.localeIdentifier;

const locale = localeIos || localeAndroid || 'en';
const defaultLanguage = locale.substring(0, 2);

export const initI18n = () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
      en: {translation: en},
      ko: {translation: ko},
      vi: {translation: vi},
    },
    lng: defaultLanguage,
    fallbackLng: 'en',
  });
};
