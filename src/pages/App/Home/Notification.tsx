import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

// type Props = {};

const MyRequest = () => {
  return (
    <View>
      <Text>MyRequest</Text>
    </View>
  );
};

const Work = () => {
  return (
    <View>
      <Text>Work</Text>
    </View>
  );
};

const routes = [
  {key: 'myRequest', title: '내 요청 알림'},
  {key: 'work', title: '일거리 알림'},
];

const renderScene = SceneMap({
  myRequest: MyRequest,
  work: Work,
});

const Notification = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <TabView
      lazy
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          renderLabel={({route, focused}) => (
            <Text style={focused ? styles.labelFocused : styles.label}>
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
};

export default Notification;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#757575',
  },
  labelFocused: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  indicator: {
    backgroundColor: '#000',
  },
  tabBar: {
    backgroundColor: '#fff',
  },
});
