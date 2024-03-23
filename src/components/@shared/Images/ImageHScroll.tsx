import {
  Image,
  ScrollView,
  StyleSheet,
  // Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MyIcon from '../MyIcons';

type Props = {
  images: string[];
  deleteImage: (idx: number) => void;
};

const ImageHScroll = ({images, deleteImage}: Props) => {
  return (
    <View style={styles.imageWrapper}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{overflow: 'visible'}}>
        <View style={{gap: 16, flexDirection: 'row'}}>
          {images?.map((image, idx) => (
            <View key={image} style={styles.errandImageContainer}>
              <TouchableOpacity
                style={styles.errandDeleteIcon}
                onPress={() => deleteImage(idx)}>
                <MyIcon name="errandDeleteIcon" />
              </TouchableOpacity>
              <Image source={{uri: image}} style={styles.errandImage} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ImageHScroll;

const styles = StyleSheet.create({
  imageWrapper: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  errandAddImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginRight: 16,
  },
  errandImageCount: {
    fontSize: 12,
    color: '#757575',
  },
  errandImageContainer: {
    position: 'relative',
    overflow: 'visible',
  },
  errandImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#ebebeb',
  },
  errandDeleteIcon: {
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    width: 21,
    height: 21,
    borderRadius: 12,
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
