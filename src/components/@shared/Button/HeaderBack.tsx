import {TouchableOpacity} from 'react-native';
import React from 'react';
import MyIcon from '../MyIcons';

interface HeaderBackProps {
  onPress: () => void;
}

const HeaderBack = (props: HeaderBackProps) => {
  const {onPress} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <MyIcon name="headerBack" />
    </TouchableOpacity>
  );
};

export default HeaderBack;

// const styles = StyleSheet.create({});
