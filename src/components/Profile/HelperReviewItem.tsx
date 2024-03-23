import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {ReviewItem} from '../../types/user';
import {S3Image} from 'aws-amplify-react-native';
import {diffDateToString} from '../../utils/util';
import dayjs from 'dayjs';

interface HelperReviewItemProps extends ReviewItem {
  type: 'simple' | 'detail';
  containerStyle?: StyleProp<ViewStyle>;
}

const HelperReviewItem = (props: HelperReviewItemProps) => {
  const {
    content,
    reviewerProfileImage,
    reviewerName,
    date,
    type,
    containerStyle,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.reviewer}>
        {reviewerProfileImage ? (
          <S3Image style={styles.reviewerImage} imgKey={reviewerProfileImage} />
        ) : (
          <View style={styles.reviewerImage} />
        )}
        <Text numberOfLines={1} style={styles.reviewerName}>
          {reviewerName}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text
          style={{color: '#171717'}}
          numberOfLines={type === 'simple' ? 3 : undefined}>
          {content}
        </Text>
      </View>
      <View style={{height: '100%'}}>
        <Text style={styles.dateText}>{diffDateToString(dayjs(date))}</Text>
      </View>
    </View>
  );
};

export default HelperReviewItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewer: {
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 53,
  },
  reviewerImage: {
    width: 53,
    height: 53,
    borderRadius: 26.5,
    backgroundColor: '#EBEBEB',
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#757575',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 16,
    paddingBottom: 16,
  },
  dateText: {
    fontSize: 12,
    color: '#757575',
  },
});
