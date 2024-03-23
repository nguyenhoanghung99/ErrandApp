import {Errand, User} from '../API';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthStackParam = {
  Step1: undefined;
  Step2: undefined;
  Step3: undefined;
  Login: undefined;
  EmailLogin: undefined;
  EmailSignUp: undefined;
  EmailSignUpFinal: {email: string; id: string};
};

export type ModalStackParam = {
  HelperIntro: undefined;
  HelperForm: undefined;
  HelperPhone: undefined;
  HelperComplete: undefined;
  HelperReview: undefined;
  HelperReject: undefined;
  HelperFormRetry: undefined;
  ErrandForm: {categoryId?: string};
  PolicyModal: {policy: string; title: string};
  ErrandMap: undefined;
  ErrandAddress: undefined;
  ErrandMapDetail: {errand?: Errand};
  ErrandCancel: {errandId: string; chatId: string};
  ErrandComplete: {errandId: string; chatId: string};
};

export type AppStackParam = {
  Root: undefined;
} & ModalStackParam;

export type HomeStackParam = {
  Home: undefined;
  Notification: undefined;
};

export type MapStackParam = {
  Map: undefined;
};

export type ErrandStackParam = {
  Errand: undefined;
  ErrandDetail: {id: string};
  MyErrandVolunteers: {id: string};
  MyErrandVolunteerProfile: {userId: string; errandId: string};
  MyErrandChatRoom: {
    clientId: string;
    helperInfo: User;
    errandId: string;
    headerName: string;
  };
  MyErrandVolunteerReviewList: {userId: string};
};

export type ChatStackParam = {
  Chat: undefined;
  ChatRoom: {
    chatId: string;
    chatRoomName: string;
  };
};

export type MyStackParam = {
  My: undefined;
  MyProfile: undefined;
  MyProfileEdit: undefined;
  MyErrand: undefined;
  MyErrandDetail: {id: string};
  MyErrandVolunteers: {id: string};
  MyErrandVolunteerProfile: {userId: string; errandId: string};
  MyErrandChatRoom: {
    clientId: string;
    helperInfo: User;
    errandId: string;
    headerName: string;
  };
  MyErrandVolunteerReviewList: {userId: string};
  MyVolunteers: undefined;
  MyHelperSetting: undefined;
  MyLanguage: undefined;
  MyNotice: undefined;
};

export type RootNavigationProps<T> = NativeStackNavigationProp<
  ModalStackParam & T
>;

export type BottomTabNavigateParams = {
  HomeTab: undefined | {screen?: string};
  MapTab: undefined | {screen?: string};
  ErrandTab: undefined | {screen?: string};
  ChatTab: undefined | {screen?: string};
  MyTab: undefined | {screen?: string};
};
