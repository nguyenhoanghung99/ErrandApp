import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import ContentLoader, {IContentLoaderProps} from 'react-content-loader/native';
import {Circle, Rect} from 'react-native-svg';
import ShortCut from './Shortcut';
import {useNavigation} from '@react-navigation/native';
import {HomeStackParam, RootNavigationProps} from '../../types/navigation';
import useCategory from '../../hooks/useCategory';

const ShortcutSectionLoader = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width="90%"
    style={{alignSelf: 'center'}}
    height={300}
    viewBox="0 0 343 216"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <Circle cx="36" cy="35" r="35" />
    <Circle cx="217" cy="35" r="35" />
    <Circle cx="127" cy="35" r="35" />
    <Circle cx="308" cy="35" r="35" />
    <Circle cx="36" cy="155" r="35" />
    <Circle cx="126" cy="155" r="35" />
    <Circle cx="307" cy="155" r="35" />
    <Circle cx="217" cy="155" r="35" />
    <Rect x="5" y="85" rx="0" ry="0" width="60" height="15" />
    <Rect x="97" y="85" rx="0" ry="0" width="60" height="15" />
    <Rect x="189" y="85" rx="0" ry="0" width="60" height="15" />
    <Rect x="280" y="85" rx="0" ry="0" width="60" height="15" />
    <Rect x="5" y="200" rx="0" ry="0" width="61" height="15" />
    <Rect x="97" y="200" rx="0" ry="0" width="61" height="15" />
    <Rect x="189" y="200" rx="0" ry="0" width="61" height="15" />
    <Rect x="280" y="200" rx="0" ry="0" width="61" height="15 " />
  </ContentLoader>
);

const ShortcutSection = () => {
  const {isLoading, categoryList, convertCategoryIdToName} = useCategory();
  const navigation = useNavigation<RootNavigationProps<HomeStackParam>>();

  return isLoading ? (
    <View style={styles.container}>
      <ShortcutSectionLoader />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={categoryList}
        numColumns={4}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginVertical: 22,
        }}
        renderItem={({item}) => (
          <ShortCut
            id={item.id}
            title={convertCategoryIdToName(item.id)}
            imageUrl={item?.imageUrl || ''}
            onPress={() => {
              navigation.navigate('ErrandForm', {categoryId: item.id});
            }}
          />
        )}
      />
    </View>
  );
};

export default ShortcutSection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
});
