import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {S3Image} from 'aws-amplify-react-native';

interface ShortCutProps {
  id: string;
  title: string;
  imageUrl?: string;
  onPress?: () => void;
  disabled?: boolean;
  isSelected?: boolean;
}

const ShortCut = (props: ShortCutProps) => {
  const {title, imageUrl, id, onPress, disabled, isSelected} = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      key={id}
      style={styles.container}
      onPress={onPress}>
      {imageUrl ? (
        <View
          style={{
            ...styles.icon,
            borderColor: isSelected ? '#171717' : '#ebebeb',
          }}>
          <S3Image
            imgKey={imageUrl}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'center',
            }}
          />
        </View>
      ) : (
        <View style={{...styles.icon, backgroundColor: '#ebebeb'}} />
      )}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ShortCut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ebebeb',
    overflow: 'hidden',
  },
  title: {
    color: '#757575',
    fontWeight: '400',
    textAlign: 'center',
    width: 70,
  },
});
