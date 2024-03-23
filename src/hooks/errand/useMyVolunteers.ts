import {useEffect, useState} from 'react';
import {Errand, ListErrandsQuery} from '../../API';
import {API, graphqlOperation} from 'aws-amplify';
import {listErrands} from '../../graphql/queries';
import {GraphQLResult} from '@aws-amplify/api';
import {Alert} from 'react-native';

interface UseMyVolunteersProps {
  myId: string;
}

const useMyVolunteers = ({myId}: UseMyVolunteersProps) => {
  const [myVolunteerErrandList, setMyVolunteerErrandList] = useState<Errand[]>(
    [],
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const [needUpdate, setNeedUpdate] = useState<boolean>(false);

  const getMyVolunteerErrandList = async () => {
    setLoading(true);
    try {
      const errandItemList = (await API.graphql<ListErrandsQuery>(
        graphqlOperation(listErrands, {
          filter: {volunteerIDs: {contains: myId}},
        }),
      )) as GraphQLResult<ListErrandsQuery>;

      setMyVolunteerErrandList(
        errandItemList.data?.listErrands?.items as Errand[],
      );
    } catch (err) {
      Alert.alert('Error', 'Error getting errand list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!myId) {
      return;
    }

    getMyVolunteerErrandList();
  }, [myId]);

  useEffect(() => {
    if (needUpdate) {
      getMyVolunteerErrandList();
      setNeedUpdate(false);
    }
  }, [needUpdate]);

  return {
    myVolunteerErrandList,
    isLoading,
    setNeedUpdate,
  };
};

export default useMyVolunteers;
