import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface FullWidthButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const FullWidthButton = (props: FullWidthButtonProps) => {
  const {title, onPress, style, disabled = false} = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        {backgroundColor: disabled ? '#eee' : '#FB3048'},
        style,
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FullWidthButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    backgroundColor: '#FB3048',
    borderRadius: 6,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400',
  },
});
