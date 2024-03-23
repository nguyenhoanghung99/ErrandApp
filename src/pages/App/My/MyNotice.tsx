import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import React from 'react';
import Loading from '../../../components/@shared/Loading';

const MyNotice = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  return (
    <View style={styles.page}>
      <WebView
        onLoad={() => {
          setIsLoading(false);
        }}
        source={{
          uri: 'https://modslove.notion.site/modslove/1090560ce4214d6a8f0e5c0db5bcfafc',
        }}
        style={{flex: 1}}
      />
      <Loading isLoading={isLoading} />
    </View>
  );
};

export default MyNotice;

const styles = StyleSheet.create({
  page: {
    height: '90%',
    backgroundColor: '#fff',
  },
});
