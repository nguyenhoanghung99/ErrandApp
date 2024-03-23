// import {StyleSheet} from 'react-native';
import React from 'react';
import CheckBoxComponent from '@react-native-community/checkbox';

interface CheckBoxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const CheckBox = (props: CheckBoxProps) => {
  const {value, onValueChange} = props;

  return (
    <CheckBoxComponent
      tintColor="#FB3048"
      onCheckColor="#fff"
      onFillColor="#FB3048"
      onTintColor="#FB3048"
      animationDuration={0.2}
      tintColors={{true: '#FB3048', false: '#FB3048'}}
      value={value}
      onValueChange={onValueChange}
      onAnimationType="bounce"
      offAnimationType="fade"
    />
  );
};

export default CheckBox;

// const styles = StyleSheet.create({});
