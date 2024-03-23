import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

interface LoadingProps {
  isLoading: boolean;
}

const Loading = (props: LoadingProps) => {
  const {isLoading} = props;

  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FB3048" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
});
