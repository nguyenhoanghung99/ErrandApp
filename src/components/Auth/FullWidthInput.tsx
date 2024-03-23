import {StyleSheet, Text, TextInput, TextInputProps} from 'react-native';
import React from 'react';
// import {useTranslation} from 'react-i18next';

interface fullWidthInputProps extends Omit<TextInputProps, 'autoCapitalize'> {
  isVisibleHelperText?: boolean;
  helperText?: string;
}

const FullWidthInput = (props: fullWidthInputProps) => {
  const {isVisibleHelperText, helperText, style, ...inputProps} = props;
  // const {t} = useTranslation();

  return (
    <>
      <TextInput
        style={[styles.fullWidthInput, style]}
        autoCapitalize="none"
        {...inputProps}
      />
      {isVisibleHelperText && <Text style={styles.helper}>{helperText}</Text>}
    </>
  );
};

export default FullWidthInput;

const styles = StyleSheet.create({
  fullWidthInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
  },
  helper: {
    marginTop: 9,
    fontSize: 14,
    color: '#757575',
  },
});
