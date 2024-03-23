import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface SubCategoryButtonProps {
  title: string;
  onPress: () => void;
  isSelected?: boolean;
}

const SubCategoryButton = (props: SubCategoryButtonProps) => {
  const {title, onPress, isSelected} = props;

  const selectedColor = isSelected ? '#FF677D' : '#C7C7CC';

  return (
    <TouchableOpacity
      style={[styles.container, {borderColor: selectedColor}]}
      onPress={onPress}>
      <Text style={[styles.text, {color: selectedColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SubCategoryButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 10,
  },
  text: {
    lineHeight: 28,
  },
});
