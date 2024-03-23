import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';

interface SettingButtonProps {
  title: string;
  onPress: () => void;
}

const SettingButton = (props: SettingButtonProps) => {
  const {title, onPress} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SettingButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 15,
    color: '#757575',
  },
});
