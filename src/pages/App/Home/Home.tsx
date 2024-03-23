import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import ShortCutSection from '../../../components/Home/ShortcutSection';
import RequestFormSection from '../../../components/Home/RequestFormSection';
import MiddleBannerSection from '../../../components/Home/MiddleBannerSection';
import NearbySection from '../../../components/Home/NearbySection';

const Home = () => {
  const scrollRef = React.useRef<ScrollView>(null);

  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      <ShortCutSection />
      <RequestFormSection />
      <MiddleBannerSection />
      <NearbySection scrollRef={scrollRef} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
  },
});
