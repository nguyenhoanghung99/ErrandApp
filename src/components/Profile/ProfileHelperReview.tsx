import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ReviewItem} from '../../types/user';
import HelperReviewItem from './HelperReviewItem';
import {useTranslation} from 'react-i18next';

interface ProfileHelperReviewProps {
  hasHeaderMore?: boolean;
  handleNavigateToReview?: () => void;
  reviewCount: number;
  reviewList: ReviewItem[];
}

const ProfileHelperReview = (props: ProfileHelperReviewProps) => {
  const {reviewList, reviewCount, handleNavigateToReview, hasHeaderMore} =
    props;
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t('review')} {t('cases', {count: reviewCount})}
        </Text>
        {hasHeaderMore && (
          <TouchableOpacity onPress={handleNavigateToReview}>
            <Text style={styles.headerMoreText}>{t('showAll')}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        {reviewList.map(review => (
          <HelperReviewItem
            type="simple"
            key={review.id}
            {...review}
            containerStyle={styles.reviewItemContainer}
          />
        ))}
      </View>
    </View>
  );
};

export default ProfileHelperReview;

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#171717',
  },
  headerMoreText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#757575',
  },
  reviewItemContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ebebeb',
    paddingTop: 28,
    paddingBottom: 16,
  },
});
