import React from 'react';
import {GetUserQuery, User} from '../../API';
import {API, graphqlOperation} from 'aws-amplify';
import {getUser} from '../../graphql/queries';
import {GraphQLResult} from '@aws-amplify/api';
import {ReviewItem} from '../../types/user';
import {deleteUser, updateUser} from '../../graphql/mutations';

const useUser = (id: string) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setLoading] = React.useState(false);
  const [needUpdate, setNeedUpdate] = React.useState(false);

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const usr = (await API.graphql(
        graphqlOperation(getUser, {id}),
      )) as GraphQLResult<GetUserQuery>;
      usr.data?.getUser && setUser(usr.data.getUser);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!id) {
      return;
    }
    getUserInfo();
  }, [id]);

  React.useEffect(() => {
    if (!user?.id) {
      return;
    }
    if (needUpdate) {
      getUserInfo();
      setNeedUpdate(false);
    }
  }, [needUpdate]);

  const updateHelperReview = async (reviewItem: ReviewItem, score: number) => {
    if (!user?.id) {
      return;
    }
    const {helperReviewList} = user;
    const newReviewItem = JSON.stringify(reviewItem);
    const newHelperReviewList = helperReviewList
      ? [...helperReviewList, newReviewItem]
      : [newReviewItem];
    const newScore = (user?.helperScore || 0) + score;
    try {
      await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: user.id,
            helperReviewList: newHelperReviewList,
            helperScore: newScore,
            helperCompletedCnt: (user?.helperCompletedCnt || 0) + 1,
          },
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updateHelperProfileImage = async (profileImageUrl: string) => {
    setLoading(true);
    if (!user?.id) {
      return;
    }
    try {
      await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: user.id,
            helperProfileImage: profileImageUrl,
          },
        }),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfileEdit = async (params: {
    profileImageUrl?: string;
    nickname: string;
    languages: string[];
  }) => {
    if (!user?.id) {
      return;
    }
    try {
      await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: user.id,
            nickname: params.nickname,
            languages: params.languages,
            ...(params.profileImageUrl && {
              profileImage: params.profileImageUrl,
            }),
          },
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updateI18n = async (language: string) => {
    if (!user?.id) {
      return;
    }
    try {
      await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: user.id,
            i18n: language,
          },
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUserInfo = async () => {
    if (!user?.id) {
      return;
    }
    try {
      await API.graphql(
        graphqlOperation(deleteUser, {
          input: {
            id: user.id,
          },
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return {
    user,
    isLoading,
    setLoading,
    updateHelperReview,
    updateUserProfileEdit,
    setNeedUpdate,
    updateI18n,
    updateHelperProfileImage,
    deleteUserInfo,
  };
};

export default useUser;
