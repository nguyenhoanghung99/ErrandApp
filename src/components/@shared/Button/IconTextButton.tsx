import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MyIcon, {IconName} from '../MyIcons';

interface IconTextButtonProps {
  iconName: IconName;
  text: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const IconTextButton = (props: IconTextButtonProps) => {
  const {iconName, text, isSelected, onPress} = props;

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: isSelected ? 'rgba(251, 48, 72, 0.3)' : 'transparent',
        borderColor: isSelected ? '#FB3048' : '#000',
      }}
      onPress={onPress}>
      <MyIcon name={iconName} style={{height: 15}} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default IconTextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 3,
  },
  text: {
    color: '#757575',
    fontSize: 14,
  },
});
