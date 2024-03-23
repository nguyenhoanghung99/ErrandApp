import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import ProfileHelperReview from '../../../components/Profile/ProfileHelperReview';
// import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MyStackParam} from '../../../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useUser from '../../../hooks/user/useUser';
import {ReviewItem} from '../../../types/user';

type Props = NativeStackScreenProps<
  MyStackParam,
  'MyErrandVolunteerReviewList'
>;

const MyErrandVolunteerReviewList = ({route}: Props) => {
  const {userId} = route.params;
  const {user} = useUser(userId);
  // const navigation = useNavigation<NavigationProp<MyStackParam>>();
  return (
    <ScrollView style={{backgroundColor: '#FCFCFC'}}>
      <View style={styles.page}>
        <ProfileHelperReview
          reviewCount={user?.helperReviewList?.length || 0}
          reviewList={
            user?.helperReviewList?.map(
              review => JSON.parse(review as string) as ReviewItem,
            ) || []
          }
        />
      </View>
    </ScrollView>
  );
};

export default MyErrandVolunteerReviewList;

const styles = StyleSheet.create({
  page: {
    marginTop: 26,
    alignItems: 'center',
  },
});
