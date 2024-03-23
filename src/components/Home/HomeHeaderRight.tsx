import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MyIcon from '../@shared/MyIcons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParam} from '../../types/navigation';

interface HomeHeaderRightProps {}

const HomeHeaderRight = (props: HomeHeaderRightProps) => {
  const {} = props;
  const navigation = useNavigation<NavigationProp<HomeStackParam>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('Notification');
      }}>
      <MyIcon name="bell" />
      <View style={styles.bellCircle}>
        <MyIcon name="bellCircle" />
      </View>
    </TouchableOpacity>
  );
};

export default HomeHeaderRight;

const styles = StyleSheet.create({
  container: {},
  bellCircle: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
});
