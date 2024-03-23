import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Volunteer} from '../../types/errand';
import {S3Image} from 'aws-amplify-react-native';
import MyIcon, {IconName} from '../@shared/MyIcons';
import {TRANSPORTATION_LIST} from '../../constants/errand';
import {useTranslation} from 'react-i18next';

interface ErrandVolunteerCardProps extends Volunteer {
  onPress: () => void;
}

const ErrandVolunteerCard = (props: ErrandVolunteerCardProps) => {
  const {t} = useTranslation();
  const {
    helperName,
    helperProfileImage,
    helperScore,
    helperCompletedCnt,
    transportation,
    price,
    // distance,
    estimateTime,
    memo,
    onPress,
  } = props;

  const transportationInfo = TRANSPORTATION_LIST.find(
    item => item.id === transportation,
  );

  const userScore = (helperScore || 0) / (helperCompletedCnt || 1);

  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          {helperProfileImage ? (
            <S3Image imgKey={helperProfileImage} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImage} />
          )}
          <Text style={{color: '#171717'}}>{helperName}</Text>
        </View>
        <View style={styles.volunteerContainer}>
          <View style={styles.infoRow}>
            {/* <View style={styles.infoItem}>
              <MyIcon name="distance" />
              <Text style={styles.infoText}>{distance + 'm'}</Text>
            </View> */}
            <View style={styles.infoItem}>
              <MyIcon name="star" />
              <Text style={styles.infoText}>{(userScore || 0).toFixed(1)}</Text>
            </View>
            <View style={styles.infoItem}>
              <MyIcon name="completedCnt" />
              <Text style={styles.infoText}>{helperCompletedCnt || 0}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <MyIcon name="price" />
            <Text style={styles.price}>{price.toLocaleString() + '₫'}</Text>
          </View>
          <View style={styles.transportation}>
            <MyIcon name={transportationInfo?.iconName as IconName} />
            <Text style={styles.greyDescription}>
              {t(transportationInfo?.name || '')}
            </Text>
          </View>
          <View style={styles.estimateContainer}>
            <MyIcon name="estimateTime" />
            <Text style={styles.greyDescription}>
              {estimateTime + t('minute')}
            </Text>
          </View>
        </View>
      </View>
      {memo && (
        <View style={styles.memoContainer}>
          <Text style={styles.greyDescription}>{memo}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ErrandVolunteerCard;

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    padding: 36,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    gap: 40,
  },
  profileContainer: {
    alignItems: 'center',
    gap: 18,
  },
  profileName: {
    fontSize: 15,
    fontWeight: '500',
  },
  profileImage: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#ebebeb',
  },
  volunteerContainer: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: 12,
    color: '#171717',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171717',
  },
  transportation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  greyDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#757575',
  },
  estimateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  memoContainer: {
    marginTop: 30,
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 8,
  },
});
