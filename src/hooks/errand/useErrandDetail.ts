import React, {useEffect} from 'react';
import {Errand, GetErrandQuery} from '../../API';
import {API, graphqlOperation} from 'aws-amplify';
import {getErrand} from '../../graphql/queries';
import {GraphQLResult} from '@aws-amplify/api';
import {updateErrand} from '../../graphql/mutations';
import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';

const useErrandDetail = (id?: string) => {
  const {t} = useTranslation();
  const [errand, setErrand] = React.useState<Errand | null>(null);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [needUpdate, setNeedUpdate] = React.useState<boolean>(false);
  const [viewUpdated, setViewUpdated] = React.useState<boolean>(false);

  const getErrandDetail = async () => {
    setLoading(true);
    try {
      const data = (await API.graphql(
        graphqlOperation(getErrand, {id}),
      )) as GraphQLResult<GetErrandQuery>;
      data && setErrand(data.data?.getErrand as Errand);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    getErrandDetail();
  }, [id]);

  useEffect(() => {
    if (!errand) {
      return;
    }
    if (needUpdate) {
      getErrandDetail();
      setNeedUpdate(false);
    }
  }, [needUpdate]);

  const updateErrandViews = async (errands: Errand) => {
    if (errands.views !== undefined && errands.views !== null) {
      await API.graphql(
        graphqlOperation(updateErrand, {
          input: {id: errands.id, views: errands.views + 1},
        }),
      );
      setViewUpdated(true);
    }
  };

  useEffect(() => {
    if (!errand) {
      return;
    }
    if (viewUpdated) {
      return;
    }
    updateErrandViews(errand);
  }, [errand]);

  const updateVolunteers = async (volunteer: string, volunteerId: string) => {
    try {
      if (!errand) {
        return;
      }
      const volunteers = errand.volunteers
        ? [...errand.volunteers, volunteer]
        : [volunteer];
      const volunteerIDs = errand.volunteerIDs
        ? [...errand.volunteerIDs, volunteerId]
        : [volunteerId];
      await API.graphql(
        graphqlOperation(updateErrand, {
          input: {id: errand.id, volunteers, volunteerIDs},
        }),
      );
      Alert.alert(t('alert'), t('successVolunteer'));
    } catch (err) {
      Alert.alert(t('error'), t('failVolunteer'));
    } finally {
      getErrandDetail();
    }
  };

  const updateErrandActiveChat = async (
    errandId: string,
    hasActiveChat: boolean,
    helperId: string,
    chatId: string,
  ) => {
    try {
      if (!errand) {
        return;
      }
      await API.graphql(
        graphqlOperation(updateErrand, {
          input: {
            id: errandId,
            status: 'ACCEPTED',
            hasActiveChat,
            helperId,
            chatId,
          },
        }),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const updateErrandStatus = async (errandId: string, status: string) => {
    try {
      if (!errand) {
        return;
      }
      await API.graphql(
        graphqlOperation(updateErrand, {
          input: {
            id: errandId,
            status,
          },
        }),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const updateErrandCancelReasons = async (
    errandId: string,
    cancelReasons: string[],
  ) => {
    try {
      if (!errand) {
        return;
      }
      await API.graphql(
        graphqlOperation(updateErrand, {
          input: {
            id: errandId,
            cancelReasons,
          },
        }),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return {
    errand,
    isLoading,
    updateVolunteers,
    setNeedUpdate,
    updateErrandActiveChat,
    updateErrandStatus,
    updateErrandCancelReasons,
  };
};

export default useErrandDetail;
