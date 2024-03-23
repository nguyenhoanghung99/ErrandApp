import React from 'react';
import {StyleProp, View, ViewStyle, StyleSheet} from 'react-native';

import {SvgXml} from 'react-native-svg';
import {icons} from 'assets/svgs/icons';

export type IconName = keyof typeof icons;
interface IconProps {
  name: IconName;
  style?: StyleProp<ViewStyle>;
}

export default function MyIcon({name, style}: IconProps) {
  return (
    <View style={[styles.container, style]}>
      <SvgXml style={{flex: 1}} xml={icons[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
