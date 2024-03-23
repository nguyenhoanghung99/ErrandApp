import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyIcon from '../@shared/MyIcons';
import {ReviewItem} from '../../types/user';
import {REVIEW_ITEMS} from '../../constants/errand';
import {useTranslation} from 'react-i18next';

interface ProfileReviewResultsProps {
  review: ReviewItem[];
}

const ProfileReviewResults = (props: ProfileReviewResultsProps) => {
  const {t} = useTranslation();
  const {review} = props;

  const reviewCountList = REVIEW_ITEMS.map(item => {
    let count = 0;
    review?.map(reviewItem => {
      if (reviewItem.result === item.key) {
        count++;
      }
    });
    return {
      ...item,
      count,
    };
  });

  let isAllZero = true;
  reviewCountList?.map(reviewCount => {
    if (reviewCount.count !== 0) {
      isAllZero = false;
    }
  });

  if (isAllZero) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('compliments')}</Text>
      {reviewCountList?.map(reviewCount => {
        if (reviewCount.count === 0) {
          return null;
        }
        return (
          <View key={reviewCount.key} style={styles.resultContainer}>
            <View style={styles.result}>
              <Text style={styles.resultText}>{t(reviewCount.key)}</Text>
            </View>
            <View style={styles.countContainer}>
              <Text style={styles.count}>{reviewCount.count}</Text>
              <MyIcon name="person" />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ProfileReviewResults;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 60,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#171717',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  result: {
    backgroundColor: '#EBEBEB',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  resultText: {
    color: '#171717',
    fontSize: 14,
    lineHeight: 28,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  count: {
    color: '#757575',
    fontSize: 12,
    fontWeight: '300',
  },
});
