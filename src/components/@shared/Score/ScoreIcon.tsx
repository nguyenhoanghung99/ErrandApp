import {TouchableOpacity} from 'react-native';
import React from 'react';
import MyIcon from '../MyIcons';

interface ScoreIconProps {
  fill?: boolean;
  onPress?: () => void;
}

const ScoreIcon = ({fill, onPress}: ScoreIconProps) => {
  if (fill) {
    return (
      <TouchableOpacity onPress={onPress}>
        <MyIcon name="scoreStar" />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <MyIcon name="scoreStarEmpty" />
    </TouchableOpacity>
  );
};

export default ScoreIcon;

// const styles = StyleSheet.create({});
