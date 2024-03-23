import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {UserContext} from '../../../contexts/UserContext';
import useUser from '../../../hooks/user/useUser';
import {useTranslation} from 'react-i18next';
import MyIcon from '../../../components/@shared/MyIcons';
import {language} from '../../../constants/language';
import Loading from '../../../components/@shared/Loading';

const MyLanguage = () => {
  const {t, i18n} = useTranslation();
  const {id} = useContext(UserContext);
  const {user, isLoading, updateI18n, setNeedUpdate} = useUser(id);

  const getLanguageEn = (lang: string) => {
    switch (lang) {
      case 'ko':
        return 'Korean';
      case 'en':
        return 'English';
      case 'vi':
        return 'Vietnamese';
      default:
        return 'English';
    }
  };

  useEffect(() => {
    if (user?.i18n) {
      i18n.changeLanguage(user.i18n);
    }
  }, [user?.i18n]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {language
          .filter(el => el !== 'original')
          .map(lan => (
            <TouchableOpacity
              onPress={() => {
                updateI18n(lan).then(() => {
                  setNeedUpdate(true);
                });
              }}
              key={lan}
              style={styles.item}>
              <Text style={styles.itemText}>
                {t(lan)} / {getLanguageEn(lan)}
              </Text>
              {user?.i18n === lan && <MyIcon name="check" />}
            </TouchableOpacity>
          ))}
      </View>
      <Loading isLoading={isLoading} />
    </View>
  );
};

export default MyLanguage;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#fff',
  },
  container: {
    marginTop: 14,
    gap: 24,
  },
  item: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#171717',
  },
});
