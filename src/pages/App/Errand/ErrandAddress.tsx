import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import MyIcon from '../../../components/@shared/MyIcons';
import {useNavigation} from '@react-navigation/native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import {ErrandMapAddressContext} from '../../../contexts/ErrandMapAddressContext';
import {useTranslation} from 'react-i18next';

const ErrandAddress = () => {
  const ref = React.useRef<GooglePlacesAutocompleteRef>(null);
  const navigation = useNavigation();
  const {i18n, t} = useTranslation();
  const {setAddress, setAddressDetail, setRegion, setMarkerPosition} =
    useContext(ErrandMapAddressContext);
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={styles.page}>
      <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        query={{
          key: 'AIzaSyCJ_rJZ7yYULbHlVddViTO2_trTV8qWfwQ',
          language: i18n.language,
          components: 'country:vn',
        }}
        fetchDetails={true}
        placeholder={t('enterAddress')}
        renderLeftButton={() => <MyIcon name="marker" />}
        renderRightButton={() => (
          <TouchableOpacity
            onPress={() => {
              setInputValue('');
              Keyboard.dismiss();
              ref.current?.setAddressText('');
            }}>
            <MyIcon name="inputClose" />
          </TouchableOpacity>
        )}
        renderHeaderComponent={() => (
          <View style={{marginTop: 32}}>
            <Text style={styles.resultTitle}>{t('searchResult')}</Text>
          </View>
        )}
        isRowScrollable={true}
        debounce={500}
        renderRow={data => {
          return (
            <View key={data.place_id} style={styles.addressItem}>
              <View style={styles.addressItemHeader}>
                <Text style={styles.addressItemTitle}>
                  {data.structured_formatting.main_text}
                </Text>
                {/* <Text style={styles.addressItemDistance}>
                  {data.description}
                </Text> */}
              </View>
              <Text style={styles.addressItemDetail}>{data.description}</Text>
            </View>
          );
        }}
        onPress={(data, details) => {
          setInputValue(data.structured_formatting.main_text);
          ref.current?.setAddressText(data.structured_formatting.main_text);
          setAddress(data.structured_formatting.main_text);
          setAddressDetail(data.description);
          if (details?.geometry) {
            setRegion({
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
            setMarkerPosition({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }
          navigation.goBack();
        }}
        textInputProps={{
          InputComp: TextInput,
          value: inputValue,
          onChangeText: setInputValue,
          placeholderTextColor: '#C7C7CC',
        }}
        ref={ref}
        styles={{
          textInput: styles.inputText,
          textInputContainer: styles.input,
        }}
        enablePoweredByContainer={false}
      />
    </View>
  );
};

export default ErrandAddress;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 16,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 13,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C7C7CC',
    gap: 10,
    paddingHorizontal: 10,
  },
  inputText: {
    color: '#000',
    fontSize: 15,
    flex: 1,
  },
  resultContainer: {
    marginTop: 32,
  },
  resultTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C7C7CC',
    marginBottom: 24,
  },
  addressItem: {
    paddingVertical: 14,
    width: '100%',
  },
  addressItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  addressItemTitle: {
    fontSize: 14,
    color: '#000',
    width: '70%',
  },
  addressItemDistance: {
    fontSize: 12,
    color: '#C7C7CC',
  },
  addressItemDetail: {
    fontSize: 12,
    color: '#C7C7CC',
    width: '80%',
  },
});
