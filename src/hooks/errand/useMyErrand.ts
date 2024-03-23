import {useEffect, useState} from 'react';
import {Errand, ListErrandsQuery} from '../../API';
import {API, graphqlOperation} from 'aws-amplify';
import {listErrands} from '../../graphql/queries';
import {GraphQLResult} from '@aws-amplify/api';
import {Alert} from 'react-native';

interface UseMyErrandProps {
  myId: string;
}

const useMyErrand = ({myId}: UseMyErrandProps) => {
  const [myErrandList, setMyErrandList] = useState<Errand[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [needUpdate, setNeedUpdate] = useState<boolean>(false);

  const getMyErrandList = async () => {
    setLoading(true);
    try {
      const errandItemList = (await API.graphql<ListErrandsQuery>(
        graphqlOperation(listErrands, {filter: {clientId: {eq: myId}}}),
      )) as GraphQLResult<ListErrandsQuery>;

      setMyErrandList(errandItemList.data?.listErrands?.items as Errand[]);
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

    getMyErrandList();
  }, [myId]);

  useEffect(() => {
    if (needUpdate) {
      getMyErrandList();
      setNeedUpdate(false);
    }
  }, [needUpdate]);

  return {
    myErrandList,
    isLoading,
    setNeedUpdate,
  };
};

export default useMyErrand;
