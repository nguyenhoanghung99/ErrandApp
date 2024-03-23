import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {DOMAIN_LIST} from 'constants/dropdown';
import MyIcon from '../@shared/MyIcons';
import {useTranslation} from 'react-i18next';

interface EmailSectionProps {
  value: string;
  handleEmail: (text: string) => void;
  domain: string;
  handleDomain: (text: string) => void;
  isDirectInput: boolean;
  handleDirectInput: (isDirectInput: boolean) => void;
  disabled?: boolean;
}

const EmailSection = (props: EmailSectionProps) => {
  const {
    value,
    handleEmail,
    domain,
    handleDomain,
    isDirectInput,
    handleDirectInput,
    disabled,
  } = props;
  const {t} = useTranslation();

  return (
    <>
      <Text style={{color: '#171717'}}>{t('email')}</Text>
      <View style={styles.emailInputContainer}>
        <TextInput
          autoCapitalize="none"
          placeholder="Example"
          style={styles.emailInput}
          value={value}
          onChangeText={handleEmail}
          autoComplete="off"
          autoCorrect={false}
          placeholderTextColor={'#999'}
          editable={!disabled}
        />
        <Text style={{color: '#757575'}}>@</Text>
        <TextInput
          autoCapitalize="none"
          placeholder="example.com"
          style={styles.emailInput}
          value={domain}
          onChangeText={handleDomain}
          editable={isDirectInput || !disabled}
          autoComplete="off"
          placeholderTextColor={'#999'}
          autoCorrect={false}
        />
        <SelectDropdown
          disabled={disabled}
          data={DOMAIN_LIST}
          defaultValue={'direct'}
          onSelect={(selectedItem: string) => {
            if (selectedItem === 'direct') {
              handleDomain('');
              handleDirectInput(true);
            } else {
              handleDomain(selectedItem);
              handleDirectInput(false);
            }
          }}
          renderDropdownIcon={isOpen => (
            <MyIcon name={isOpen ? 'upTriangle' : 'downTriangle'} />
          )}
          buttonStyle={styles.picker}
          buttonTextStyle={styles.pickerValue}
          dropdownStyle={styles.dropDown}
          rowTextStyle={styles.dropDownRowText}
          rowStyle={styles.dropDownRow}
        />
      </View>
    </>
  );
};

export default EmailSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 30,
  },
  emailInputContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  emailInput: {
    width: 115,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    color: '#171717',
  },
  picker: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F1F1',
  },
  pickerValue: {
    fontSize: 14,
    color: '#171717',
  },
  dropDown: {
    maxHeight: 300,
  },
  dropDownRow: {
    height: 40,
  },
  dropDownRowText: {
    fontSize: 14,
  },
});
