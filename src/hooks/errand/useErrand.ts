import React from 'react';
import {Errand, ListErrandsQuery} from '../../API';
import {API, graphqlOperation} from 'aws-amplify';
import {listErrands} from '../../graphql/queries';
import {GraphQLResult} from '@aws-amplify/api';
import {Alert} from 'react-native';

interface UseErrandProps {
  needInitLoad?: boolean;
  categoryFilterList?: string[];
}

const useErrand = (props: UseErrandProps) => {
  const {needInitLoad, categoryFilterList} = props;
  const [errandList, setErrandList] = React.useState<Errand[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [needUpdate, setNeedUpdate] = React.useState<boolean>(false);

  const categoryFilter = React.useMemo(
    () =>
      categoryFilterList?.map(category => ({
        categoryId: {
          eq: category,
        },
      })),
    [categoryFilterList],
  );

  const getErrandList = async () => {
    setLoading(true);
    try {
      let errandQueryOption: object = {
        limit: 1000,
        filter: {status: {eq: 'PENDING'}},
      };
      if (categoryFilter && categoryFilter.length > 0) {
        errandQueryOption = {
          ...errandQueryOption,
          filter: {or: categoryFilter, and: {status: {eq: 'PENDING'}}},
        };
      }

      const errandItemList = (await API.graphql<ListErrandsQuery>(
        graphqlOperation(listErrands, errandQueryOption),
      )) as GraphQLResult<ListErrandsQuery>;

      setErrandList(errandItemList.data?.listErrands?.items as Errand[]);
    } catch (err) {
      Alert.alert('Error', 'Error getting errand list');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (needInitLoad) {
      getErrandList();
    }
  }, [categoryFilter]);

  React.useEffect(() => {
    if (needUpdate === true) {
      getErrandList();
      setNeedUpdate(false);
    }
  }, [needUpdate]);

  return {
    errandList,
    isLoading,
    setNeedUpdate,
  };
};

export default useErrand;
