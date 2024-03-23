import {Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface FooterButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

const isAndroid = Platform.OS === 'android';

const FooterButton = (props: FooterButtonProps) => {
  const {title, onPress, disabled = false} = props;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? '#ccc' : '#FB3048',
          paddingBottom: isAndroid ? 0 : 20,
          height: isAndroid ? 66 : 86,
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FooterButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    bottom: 0,
    height: 86,
    paddingBottom: 20,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
  },
});
