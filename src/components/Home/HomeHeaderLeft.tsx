import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyIcon from '../@shared/MyIcons';

interface HomeHeaderLeftProps {}

const HomeHeaderLeft = (props: HomeHeaderLeftProps) => {
  const {} = props;

  return (
    <View style={styles.header}>
      <MyIcon name="logo" />
      <Text style={styles.headerTitle}>
        <Text style={styles.bold}>Hands</Text>
        Free
      </Text>
    </View>
  );
};

export default HomeHeaderLeft;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    color: '#FB3048',
    fontSize: 20,
  },
  bold: {
    fontWeight: '700',
  },
});
