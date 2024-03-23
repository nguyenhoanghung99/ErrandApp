import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ErrandVolunteerCard from '../../../components/Errand/ErrandVolunteerCard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParam} from '../../../types/navigation';
import useErrandDetail from '../../../hooks/errand/useErrandDetail';
import {Volunteer} from '../../../types/errand';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import useRefreshing from '../../../hooks/useRefreshing';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<MyStackParam, 'MyErrandVolunteers'>;

const MyErrandVolunteers = ({route}: Props) => {
  const navigation = useNavigation<NavigationProp<MyStackParam>>();
  const errandId = route.params.id;
  const {errand, setNeedUpdate, isLoading} = useErrandDetail(errandId);
  const {isRefreshing, handleRefresh} = useRefreshing({
    onRefresh: () => setNeedUpdate(true),
    delay: 1000,
  });

  const parsedVolunteer = (rawVolunteer?: string | null) => {
    if (!rawVolunteer) {
      return null;
    }
    if (typeof rawVolunteer === 'string') {
      return JSON.parse(rawVolunteer) as Volunteer;
    }
  };

  if (isLoading) {
    // TODO : 로딩 Skeleton UI 추가
    return null;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }>
      <View style={styles.page}>
        {errand?.volunteers ? (
          errand?.volunteers.map((volunteer, index) => {
            const volunteerInfo = parsedVolunteer(volunteer);
            if (!volunteerInfo) {
              return null;
            }
            return (
              <ErrandVolunteerCard
                key={volunteerInfo.helperId + index}
                {...volunteerInfo}
                onPress={() => {
                  navigation.navigate('MyErrandVolunteerProfile', {
                    userId: volunteerInfo.id,
                    errandId: errand?.id as string,
                  });
                }}
              />
            );
          })
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No applicants yet.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MyErrandVolunteers;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    paddingBottom: 200,
  },
  emptyContainer: {
    width: '100%',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#BDBDBD',
  },
});
