import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {ErrandMapAddressContext} from '../../../contexts/ErrandMapAddressContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ModalStackParam} from '../../../types/navigation';
import FullWidthButton from '../../@shared/Button/FullWidthButton';
import {useTranslation} from 'react-i18next';

const ErrandMapBottomSheet = () => {
  const {t} = useTranslation();
  const {address, addressDetail, setAddressDetail, initState} = useContext(
    ErrandMapAddressContext,
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<ModalStackParam>>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{t('selectLocation')}</Text>
            <View style={styles.inputContainer}>
              <View style={styles.input}>
                <View style={styles.bullet} />
                <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() => {
                    initState();
                    navigation.navigate('ErrandAddress');
                  }}>
                  <Text
                    style={{
                      ...styles.inputValue,
                      color: address ? '#000' : '#bcbcbc',
                    }}
                    numberOfLines={1}>
                    {address || t('selectLocation')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.title}>{t('locationDetail')}</Text>
            <TextInput
              placeholderTextColor="#999"
              value={addressDetail}
              onChangeText={setAddressDetail}
              multiline
              style={styles.textArea}
              placeholder={t('locationDetail')}
            />
          </View>
          <FullWidthButton
            title={t('confirmLocation')}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ErrandMapBottomSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(87, 87, 87, 0.2)',
    padding: 24,
    paddingBottom: 36,
    gap: 24,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
  },
  inputContainer: {
    borderBottomWidth: 1,
    marginTop: 20,
    paddingBottom: 10,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#000',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputValue: {
    marginLeft: 12,
    fontSize: 15,
    color: '#171717',
  },
  textArea: {
    padding: 12,
    marginTop: 20,
    height: 80,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#C7C7CC',
  },
});
