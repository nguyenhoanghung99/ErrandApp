/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  referralCode?: string | null,
  clientId?: string | null,
  helperId?: string | null,
  email?: string | null,
  profileImage?: string | null,
  nickname?: string | null,
  i18n?: string | null,
  languages?: Array< string | null > | null,
  isHelper?: boolean | null,
  helperProfileImage?: string | null,
  helperName?: string | null,
  helperBirthDate?: string | null,
  helperIdentityImage?: string | null,
  helperIdentityBackImage?: string | null,
  helperIdentityFaceImage?: string | null,
  helperPhone?: string | null,
  helperFacebook?: string | null,
  helperIdentityStatus?: string | null,
  helperPhoneStatus?: string | null,
  helperFacebookStatus?: string | null,
  helperScore?: number | null,
  helperCompletedCnt?: number | null,
  helperReviewList?: Array< string | null > | null,
  helperPhoneRejectReason?: string | null,
  helperFacebookRejectReason?: string | null,
  helperIdentityRejectReason?: string | null,
  fcmToken?: string | null,
};

export type ModelUserConditionInput = {
  referralCode?: ModelStringInput | null,
  clientId?: ModelStringInput | null,
  helperId?: ModelStringInput | null,
  email?: ModelStringInput | null,
  profileImage?: ModelStringInput | null,
  nickname?: ModelStringInput | null,
  i18n?: ModelStringInput | null,
  languages?: ModelStringInput | null,
  isHelper?: ModelBooleanInput | null,
  helperProfileImage?: ModelStringInput | null,
  helperName?: ModelStringInput | null,
  helperBirthDate?: ModelStringInput | null,
  helperIdentityImage?: ModelStringInput | null,
  helperIdentityBackImage?: ModelStringInput | null,
  helperIdentityFaceImage?: ModelStringInput | null,
  helperPhone?: ModelStringInput | null,
  helperFacebook?: ModelStringInput | null,
  helperIdentityStatus?: ModelStringInput | null,
  helperPhoneStatus?: ModelStringInput | null,
  helperFacebookStatus?: ModelStringInput | null,
  helperScore?: ModelIntInput | null,
  helperCompletedCnt?: ModelIntInput | null,
  helperReviewList?: ModelStringInput | null,
  helperPhoneRejectReason?: ModelStringInput | null,
  helperFacebookRejectReason?: ModelStringInput | null,
  helperIdentityRejectReason?: ModelStringInput | null,
  fcmToken?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  referralCode?: string | null,
  clientId?: string | null,
  helperId?: string | null,
  email?: string | null,
  profileImage?: string | null,
  nickname?: string | null,
  i18n?: string | null,
  languages?: Array< string | null > | null,
  isHelper?: boolean | null,
  helperProfileImage?: string | null,
  helperName?: string | null,
  helperBirthDate?: string | null,
  helperIdentityImage?: string | null,
  helperIdentityBackImage?: string | null,
  helperIdentityFaceImage?: string | null,
  helperPhone?: string | null,
  helperFacebook?: string | null,
  helperIdentityStatus?: string | null,
  helperPhoneStatus?: string | null,
  helperFacebookStatus?: string | null,
  helperScore?: number | null,
  helperCompletedCnt?: number | null,
  helperReviewList?: Array< string | null > | null,
  helperPhoneRejectReason?: string | null,
  helperFacebookRejectReason?: string | null,
  helperIdentityRejectReason?: string | null,
  fcmToken?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  referralCode?: string | null,
  clientId?: string | null,
  helperId?: string | null,
  email?: string | null,
  profileImage?: string | null,
  nickname?: string | null,
  i18n?: string | null,
  languages?: Array< string | null > | null,
  isHelper?: boolean | null,
  helperProfileImage?: string | null,
  helperName?: string | null,
  helperBirthDate?: string | null,
  helperIdentityImage?: string | null,
  helperIdentityBackImage?: string | null,
  helperIdentityFaceImage?: string | null,
  helperPhone?: string | null,
  helperFacebook?: string | null,
  helperIdentityStatus?: string | null,
  helperPhoneStatus?: string | null,
  helperFacebookStatus?: string | null,
  helperScore?: number | null,
  helperCompletedCnt?: number | null,
  helperReviewList?: Array< string | null > | null,
  helperPhoneRejectReason?: string | null,
  helperFacebookRejectReason?: string | null,
  helperIdentityRejectReason?: string | null,
  fcmToken?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateCategoryInput = {
  id?: string | null,
  name: string,
  nameEn?: string | null,
  nameKo?: string | null,
  nameVi?: string | null,
  imageUrl?: string | null,
  subCategories?: string | null,
};

export type ModelCategoryConditionInput = {
  name?: ModelStringInput | null,
  nameEn?: ModelStringInput | null,
  nameKo?: ModelStringInput | null,
  nameVi?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  subCategories?: ModelStringInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type Category = {
  __typename: "Category",
  id: string,
  name: string,
  nameEn?: string | null,
  nameKo?: string | null,
  nameVi?: string | null,
  imageUrl?: string | null,
  subCategories?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCategoryInput = {
  id: string,
  name?: string | null,
  nameEn?: string | null,
  nameKo?: string | null,
  nameVi?: string | null,
  imageUrl?: string | null,
  subCategories?: string | null,
};

export type DeleteCategoryInput = {
  id: string,
};

export type CreateErrandInput = {
  id?: string | null,
  clientId: string,
  helperId?: string | null,
  title?: string | null,
  description?: string | null,
  volunteerIDs?: Array< string | null > | null,
  volunteers?: Array< string | null > | null,
  categoryId: string,
  subCategoryId: string,
  startTime?: string | null,
  price?: number | null,
  latitude: number,
  longitude: number,
  address?: string | null,
  status?: string | null,
  cancelReasons?: Array< string | null > | null,
  views?: number | null,
  imageUrls?: Array< string | null > | null,
  hasActiveChat?: boolean | null,
  chatId?: string | null,
};

export type ModelErrandConditionInput = {
  clientId?: ModelStringInput | null,
  helperId?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  volunteerIDs?: ModelStringInput | null,
  volunteers?: ModelStringInput | null,
  categoryId?: ModelStringInput | null,
  subCategoryId?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  price?: ModelIntInput | null,
  latitude?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  address?: ModelStringInput | null,
  status?: ModelStringInput | null,
  cancelReasons?: ModelStringInput | null,
  views?: ModelIntInput | null,
  imageUrls?: ModelStringInput | null,
  hasActiveChat?: ModelBooleanInput | null,
  chatId?: ModelStringInput | null,
  and?: Array< ModelErrandConditionInput | null > | null,
  or?: Array< ModelErrandConditionInput | null > | null,
  not?: ModelErrandConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Errand = {
  __typename: "Errand",
  id: string,
  clientId: string,
  helperId?: string | null,
  title?: string | null,
  description?: string | null,
  volunteerIDs?: Array< string | null > | null,
  volunteers?: Array< string | null > | null,
  categoryId: string,
  subCategoryId: string,
  startTime?: string | null,
  price?: number | null,
  latitude: number,
  longitude: number,
  address?: string | null,
  status?: string | null,
  cancelReasons?: Array< string | null > | null,
  views?: number | null,
  imageUrls?: Array< string | null > | null,
  hasActiveChat?: boolean | null,
  chatId?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateErrandInput = {
  id: string,
  clientId?: string | null,
  helperId?: string | null,
  title?: string | null,
  description?: string | null,
  volunteerIDs?: Array< string | null > | null,
  volunteers?: Array< string | null > | null,
  categoryId?: string | null,
  subCategoryId?: string | null,
  startTime?: string | null,
  price?: number | null,
  latitude?: number | null,
  longitude?: number | null,
  address?: string | null,
  status?: string | null,
  cancelReasons?: Array< string | null > | null,
  views?: number | null,
  imageUrls?: Array< string | null > | null,
  hasActiveChat?: boolean | null,
  chatId?: string | null,
};

export type DeleteErrandInput = {
  id: string,
};

export type CreateChatInput = {
  id?: string | null,
  clientId: string,
  clientFcm?: string | null,
  clientName: string,
  clientImageUrl: string,
  helperId: string,
  helperFcm?: string | null,
  helperName: string,
  helperImageUrl: string,
  errandId: string,
  categoryId: string,
  messages?: Array< string | null > | null,
  status?: string | null,
};

export type ModelChatConditionInput = {
  clientId?: ModelStringInput | null,
  clientFcm?: ModelStringInput | null,
  clientName?: ModelStringInput | null,
  clientImageUrl?: ModelStringInput | null,
  helperId?: ModelStringInput | null,
  helperFcm?: ModelStringInput | null,
  helperName?: ModelStringInput | null,
  helperImageUrl?: ModelStringInput | null,
  errandId?: ModelStringInput | null,
  categoryId?: ModelStringInput | null,
  messages?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelChatConditionInput | null > | null,
  or?: Array< ModelChatConditionInput | null > | null,
  not?: ModelChatConditionInput | null,
};

export type Chat = {
  __typename: "Chat",
  id: string,
  clientId: string,
  clientFcm?: string | null,
  clientName: string,
  clientImageUrl: string,
  helperId: string,
  helperFcm?: string | null,
  helperName: string,
  helperImageUrl: string,
  errandId: string,
  categoryId: string,
  messages?: Array< string | null > | null,
  status?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateChatInput = {
  id: string,
  clientId?: string | null,
  clientFcm?: string | null,
  clientName?: string | null,
  clientImageUrl?: string | null,
  helperId?: string | null,
  helperFcm?: string | null,
  helperName?: string | null,
  helperImageUrl?: string | null,
  errandId?: string | null,
  categoryId?: string | null,
  messages?: Array< string | null > | null,
  status?: string | null,
};

export type DeleteChatInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  referralCode?: ModelStringInput | null,
  clientId?: ModelStringInput | null,
  helperId?: ModelStringInput | null,
  email?: ModelStringInput | null,
  profileImage?: ModelStringInput | null,
  nickname?: ModelStringInput | null,
  i18n?: ModelStringInput | null,
  languages?: ModelStringInput | null,
  isHelper?: ModelBooleanInput | null,
  helperProfileImage?: ModelStringInput | null,
  helperName?: ModelStringInput | null,
  helperBirthDate?: ModelStringInput | null,
  helperIdentityImage?: ModelStringInput | null,
  helperIdentityBackImage?: ModelStringInput | null,
  helperIdentityFaceImage?: ModelStringInput | null,
  helperPhone?: ModelStringInput | null,
  helperFacebook?: ModelStringInput | null,
  helperIdentityStatus?: ModelStringInput | null,
  helperPhoneStatus?: ModelStringInput | null,
  helperFacebookStatus?: ModelStringInput | null,
  helperScore?: ModelIntInput | null,
  helperCompletedCnt?: ModelIntInput | null,
  helperReviewList?: ModelStringInput | null,
  helperPhoneRejectReason?: ModelStringInput | null,
  helperFacebookRejectReason?: ModelStringInput | null,
  helperIdentityRejectReason?: ModelStringInput | null,
  fcmToken?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  nameEn?: ModelStringInput | null,
  nameKo?: ModelStringInput | null,
  nameVi?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  subCategories?: ModelStringInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
};

export type ModelErrandFilterInput = {
  id?: ModelIDInput | null,
  clientId?: ModelStringInput | null,
  helperId?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  volunteerIDs?: ModelStringInput | null,
  volunteers?: ModelStringInput | null,
  categoryId?: ModelStringInput | null,
  subCategoryId?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  price?: ModelIntInput | null,
  latitude?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  address?: ModelStringInput | null,
  status?: ModelStringInput | null,
  cancelReasons?: ModelStringInput | null,
  views?: ModelIntInput | null,
  imageUrls?: ModelStringInput | null,
  hasActiveChat?: ModelBooleanInput | null,
  chatId?: ModelStringInput | null,
  and?: Array< ModelErrandFilterInput | null > | null,
  or?: Array< ModelErrandFilterInput | null > | null,
  not?: ModelErrandFilterInput | null,
};

export type ModelErrandConnection = {
  __typename: "ModelErrandConnection",
  items:  Array<Errand | null >,
  nextToken?: string | null,
};

export type ModelChatFilterInput = {
  id?: ModelIDInput | null,
  clientId?: ModelStringInput | null,
  clientFcm?: ModelStringInput | null,
  clientName?: ModelStringInput | null,
  clientImageUrl?: ModelStringInput | null,
  helperId?: ModelStringInput | null,
  helperFcm?: ModelStringInput | null,
  helperName?: ModelStringInput | null,
  helperImageUrl?: ModelStringInput | null,
  errandId?: ModelStringInput | null,
  categoryId?: ModelStringInput | null,
  messages?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelChatFilterInput | null > | null,
  or?: Array< ModelChatFilterInput | null > | null,
  not?: ModelChatFilterInput | null,
};

export type ModelChatConnection = {
  __typename: "ModelChatConnection",
  items:  Array<Chat | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  referralCode?: ModelSubscriptionStringInput | null,
  clientId?: ModelSubscriptionStringInput | null,
  helperId?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  profileImage?: ModelSubscriptionStringInput | null,
  nickname?: ModelSubscriptionStringInput | null,
  i18n?: ModelSubscriptionStringInput | null,
  languages?: ModelSubscriptionStringInput | null,
  isHelper?: ModelSubscriptionBooleanInput | null,
  helperProfileImage?: ModelSubscriptionStringInput | null,
  helperName?: ModelSubscriptionStringInput | null,
  helperBirthDate?: ModelSubscriptionStringInput | null,
  helperIdentityImage?: ModelSubscriptionStringInput | null,
  helperIdentityBackImage?: ModelSubscriptionStringInput | null,
  helperIdentityFaceImage?: ModelSubscriptionStringInput | null,
  helperPhone?: ModelSubscriptionStringInput | null,
  helperFacebook?: ModelSubscriptionStringInput | null,
  helperIdentityStatus?: ModelSubscriptionStringInput | null,
  helperPhoneStatus?: ModelSubscriptionStringInput | null,
  helperFacebookStatus?: ModelSubscriptionStringInput | null,
  helperScore?: ModelSubscriptionIntInput | null,
  helperCompletedCnt?: ModelSubscriptionIntInput | null,
  helperReviewList?: ModelSubscriptionStringInput | null,
  helperPhoneRejectReason?: ModelSubscriptionStringInput | null,
  helperFacebookRejectReason?: ModelSubscriptionStringInput | null,
  helperIdentityRejectReason?: ModelSubscriptionStringInput | null,
  fcmToken?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionCategoryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  nameEn?: ModelSubscriptionStringInput | null,
  nameKo?: ModelSubscriptionStringInput | null,
  nameVi?: ModelSubscriptionStringInput | null,
  imageUrl?: ModelSubscriptionStringInput | null,
  subCategories?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCategoryFilterInput | null > | null,
  or?: Array< ModelSubscriptionCategoryFilterInput | null > | null,
};

export type ModelSubscriptionErrandFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  clientId?: ModelSubscriptionStringInput | null,
  helperId?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  volunteerIDs?: ModelSubscriptionStringInput | null,
  volunteers?: ModelSubscriptionStringInput | null,
  categoryId?: ModelSubscriptionStringInput | null,
  subCategoryId?: ModelSubscriptionStringInput | null,
  startTime?: ModelSubscriptionStringInput | null,
  price?: ModelSubscriptionIntInput | null,
  latitude?: ModelSubscriptionFloatInput | null,
  longitude?: ModelSubscriptionFloatInput | null,
  address?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  cancelReasons?: ModelSubscriptionStringInput | null,
  views?: ModelSubscriptionIntInput | null,
  imageUrls?: ModelSubscriptionStringInput | null,
  hasActiveChat?: ModelSubscriptionBooleanInput | null,
  chatId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionErrandFilterInput | null > | null,
  or?: Array< ModelSubscriptionErrandFilterInput | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionChatFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  clientId?: ModelSubscriptionStringInput | null,
  clientFcm?: ModelSubscriptionStringInput | null,
  clientName?: ModelSubscriptionStringInput | null,
  clientImageUrl?: ModelSubscriptionStringInput | null,
  helperId?: ModelSubscriptionStringInput | null,
  helperFcm?: ModelSubscriptionStringInput | null,
  helperName?: ModelSubscriptionStringInput | null,
  helperImageUrl?: ModelSubscriptionStringInput | null,
  errandId?: ModelSubscriptionStringInput | null,
  categoryId?: ModelSubscriptionStringInput | null,
  messages?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionChatFilterInput | null > | null,
  or?: Array< ModelSubscriptionChatFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    referralCode?: string | null,
    clientId?: string | null,
    helperId?: string | null,
    email?: string | null,
    profileImage?: string | null,
    nickname?: string | null,
    i18n?: string | null,
    languages?: Array< string | null > | null,
    isHelper?: boolean | null,
    helperProfileImage?: string | null,
    helperName?: string | null,
    helperBirthDate?: string | null,
    helperIdentityImage?: string | null,
    helperIdentityBackImage?: string | null,
    helperIdentityFaceImage?: string | null,
    helperPhone?: string | null,
    helperFacebook?: string | null,
    helperIdentityStatus?: string | null,
    helperPhoneStatus?: string | null,
    helperFacebookStatus?: string | null,
    helperScore?: number | null,
    helperCompletedCnt?: number | null,
    helperReviewList?: Array< string | null > | null,
    helperPhoneRejectReason?: string | null,
    helperFacebookRejectReason?: string | null,
    helperIdentityRejectReason?: string | null,
    fcmToken?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    referralCode?: string | null,
    clientId?: string | null,
    helperId?: string | null,
    email?: string | null,
    profileImage?: string | null,
    nickname?: string | null,
    i18n?: string | null,
    languages?: Array< string | null > | null,
    isHelper?: boolean | null,
    helperProfileImage?: string | null,
    helperName?: string | null,
    helperBirthDate?: string | null,
    helperIdentityImage?: string | null,
    helperIdentityBackImage?: string | null,
    helperIdentityFaceImage?: string | null,
    helperPhone?: string | null,
    helperFacebook?: string | null,
    helperIdentityStatus?: string | null,
    helperPhoneStatus?: string | null,
    helperFacebookStatus?: string | null,
    helperScore?: number | null,
    helperCompletedCnt?: number | null,
    helperReviewList?: Array< string | null > | null,
    helperPhoneRejectReason?: string | null,
    helperFacebookRejectReason?: string | null,
    helperIdentityRejectReason?: string | null,
    fcmToken?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    referralCode?: string | null,
    clientId?: string | null,
    helperId?: string | null,
    email?: string | null,
    profileImage?: string | null,
    nickname?: string | null,
    i18n?: string | null,
    languages?: Array< string | null > | null,
    isHelper?: boolean | null,
    helperProfileImage?: string | null,
    helperName?: string | null,
    helperBirthDate?: string | null,
    helperIdentityImage?: string | null,
    helperIdentityBackImage?: string | null,
    helperIdentityFaceImage?: string | null,
    helperPhone?: string | null,
    helperFacebook?: string | null,
    helperIdentityStatus?: string | null,
    helperPhoneStatus?: string | null,
    helperFacebookStatus?: string | null,
    helperScore?: number | null,
    helperCompletedCnt?: number | null,
    helperReviewList?: Array< string | null > | null,
    helperPhoneRejectReason?: string | null,
    helperFacebookRejectReason?: string | null,
    helperIdentityRejectReason?: string | null,
    fcmToken?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    nameEn?: string | null,
    nameKo?: string | null,
    nameVi?: string | null,
    imageUrl?: string | null,
    subCategories?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    nameEn?: string | null,
    nameKo?: string | null,
    nameVi?: string | null,
    imageUrl?: string | null,
    subCategories?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    nameEn?: string | null,
    nameKo?: string | null,
    nameVi?: string | null,
    imageUrl?: string | null,
    subCategories?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateErrandMutationVariables = {
  input: CreateErrandInput,
  condition?: ModelErrandConditionInput | null,
};

export type CreateErrandMutation = {
  createErrand?:  {
    __typename: "Errand",
    id: string,
    clientId: string,
    helperId?: string | null,
    title?: string | null,
    description?: string | null,
    volunteerIDs?: Array< string | null > | null,
    volunteers?: Array< string | null > | null,
    categoryId: string,
    subCategoryId: string,
    startTime?: string | null,
    price?: number | null,
    latitude: number,
    longitude: number,
    address?: string | null,
    status?: string | null,
    cancelReasons?: Array< string | null > | null,
    views?: number | null,
    imageUrls?: Array< string | null > | null,
    hasActiveChat?: boolean | null,
    chatId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateErrandMutationVariables = {
  input: UpdateErrandInput,
  condition?: ModelErrandConditionInput | null,
};

export type UpdateErrandMutation = {
  updateErrand?:  {
    __typename: "Errand",
    id: string,
    clientId: string,
    helperId?: string | null,
    title?: string | null,
    description?: string | null,
    volunteerIDs?: Array< string | null > | null,
    volunteers?: Array< string | null > | null,
    categoryId: string,
    subCategoryId: string,
    startTime?: string | null,
    price?: number | null,
    latitude: number,
    longitude: number,
    address?: string | null,
    status?: string | null,
    cancelReasons?: Array< string | null > | null,
    views?: number | null,
    imageUrls?: Array< string | null > | null,
    hasActiveChat?: boolean | null,
    chatId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteErrandMutationVariables = {
  input: DeleteErrandInput,
  condition?: ModelErrandConditionInput | null,
};

export type DeleteErrandMutation = {
  deleteErrand?:  {
    __typename: "Errand",
    id: string,
    clientId: string,
    helperId?: string | null,
    title?: string | null,
    description?: string | null,
    volunteerIDs?: Array< string | null > | null,
    volunteers?: Array< string | null > | null,
    categoryId: string,
    subCategoryId: string,
    startTime?: string | null,
    price?: number | null,
    latitude: number,
    longitude: number,
    address?: string | null,
    status?: string | null,
    cancelReasons?: Array< string | null > | null,
    views?: number | null,
    imageUrls?: Array< string | null > | null,
    hasActiveChat?: boolean | null,
    chatId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateChatMutationVariables = {
  input: CreateChatInput,
  condition?: ModelChatConditionInput | null,
};

export type CreateChatMutation = {
  createChat?:  {
    __typename: "Chat",
    id: string,
    clientId: string,
    clientFcm?: string | null,
    clientName: string,
    clientImageUrl: string,
    helperId: string,
    helperFcm?: string | null,
    helperName: string,
    helperImageUrl: string,
    errandId: string,
    categoryId: string,
    messages?: Array< string | null > | null,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateChatMutationVariables = {
  input: UpdateChatInput,
  condition?: ModelChatConditionInput | null,
};

export type UpdateChatMutation = {
  updateChat?:  {
    __typename: "Chat",
    id: string,
    clientId: string,
    clientFcm?: string | null,
    clientName: string,
    clientImageUrl: string,
    helperId: string,
    helperFcm?: string | null,
    helperName: string,
    helperImageUrl: string,
    errandId: string,
    categoryId: string,
    messages?: Array< string | null > | null,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteChatMutationVariables = {
  input: DeleteChatInput,
  condition?: ModelChatConditionInput | null,
};

export type DeleteChatMutation = {
  deleteChat?:  {
    __typename: "Chat",
    id: string,
    clientId: string,
    clientFcm?: string | null,
    clientName: string,
    clientImageUrl: string,
    helperId: string,
    helperFcm?: string | null,
    helperName: string,
    helperImageUrl: string,
    errandId: string,
    categoryId: string,
    messages?: Array< string | null > | null,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    referralCode?: string | null,
    clientId?: string | null,
    helperId?: string | null,
    email?: string | null,
    profileImage?: string | null,
    nickname?: string | null,
    i18n?: string | null,
    languages?: Array< string | null > | null,
    isHelper?: boolean | null,
    helperProfileImage?: string | null,
    helperName?: string | null,
    helperBirthDate?: string | null,
    helperIdentityImage?: string | null,
    helperIdentityBackImage?: string | null,
    helperIdentityFaceImage?: string | null,
    helperPhone?: string | null,
    helperFacebook?: string | null,
    helperIdentityStatus?: string | null,
    helperPhoneStatus?: string | null,
    helperFacebookStatus?: string | null,
    helperScore?: number | null,
    helperCompletedCnt?: number | null,
    helperReviewList?: Array< string | null > | null,
    helperPhoneRejectReason?: string | null,
    helperFacebookRejectReason?: string | null,
    helperIdentityRejectReason?: string | null,
    fcmToken?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      referralCode?: string | null,
      clientId?: string | null,
      helperId?: string | null,
      email?: string | null,
      profileImage?: string | null,
      nickname?: string | null,
      i18n?: string | null,
      languages?: Array< string | null > | null,
      isHelper?: boolean | null,
      helperProfileImage?: string | null,
      helperName?: string | null,
      helperBirthDate?: string | null,
      helperIdentityImage?: string | null,
      helperIdentityBackImage?: string | null,
      helperIdentityFaceImage?: string | null,
      helperPhone?: string | null,
      helperFacebook?: string | null,
      helperIdentityStatus?: string | null,
      helperPhoneStatus?: string | null,
      helperFacebookStatus?: string | null,
      helperScore?: number | null,
      helperCompletedCnt?: number | null,
      helperReviewList?: Array< string | null > | null,
      helperPhoneRejectReason?: string | null,
      helperFacebookRejectReason?: string | null,
      helperIdentityRejectReason?: string | null,
      fcmToken?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCategoryQueryVariables = {
  id: string,
};

export type GetCategoryQuery = {
  getCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    nameEn?: string | null,
    nameKo?: string | null,
    nameVi?: string | null,
    imageUrl?: string | null,
    subCategories?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategoriesQueryVariables = {
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategoriesQuery = {
  listCategories?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      name: string,
      nameEn?: string | null,
      nameKo?: string | null,
      nameVi?: string | null,
      imageUrl?: string | null,
      subCategories?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetErrandQueryVariables = {
  id: string,
};

export type GetErrandQuery = {
  getErrand?:  {
    __typename: "Errand",
    id: string,
    clientId: string,
    helperId?: string | null,
    title?: string | null,
    description?: string | null,
    volunteerIDs?: Array< string | null > | null,
    volunteers?: Array< string | null > | null,
    categoryId: string,
    subCategoryId: string,
    startTime?: string | null,
    price?: number | null,
    latitude: number,
    longitude: number,
    address?: string | null,
    status?: string | null,
    cancelReasons?: Array< string | null > | null,
    views?: number | null,
    imageUrls?: Array< string | null > | null,
    hasActiveChat?: boolean | null,
    chatId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListErrandsQueryVariables = {
  filter?: ModelErrandFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListErrandsQuery = {
  listErrands?:  {
    __typename: "ModelErrandConnection",
    items:  Array< {
      __typename: "Errand",
      id: string,
      clientId: string,
      helperId?: string | null,
      title?: string | null,
      description?: string | null,
      volunteerIDs?: Array< string | null > | null,
      volunteers?: Array< string | null > | null,
      categoryId: string,
      subCategoryId: string,
      startTime?: string | null,
      price?: number | null,
      latitude: number,
      longitude: number,
      address?: string | null,
      status?: string | null,
      cancelReasons?: Array< string | null > | null,
      views?: number | null,
      imageUrls?: Array< string | null > | null,
      hasActiveChat?: boolean | null,
      chatId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetChatQueryVariables = {
  id: string,
};

export type GetChatQuery = {
  getChat?:  {
    __typename: "Chat",
    id: string,
    clientId: string,
    clientFcm?: string | null,
    clientName: string,
    clientImageUrl: string,
    helperId: string,
    helperFcm?: string | null,
    helperName: string,
    helperImageUrl: string,
    errandId: string,
    categoryId: string,
    messages?: Array< string | null > | null,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListChatsQueryVariables = {
  filter?: ModelChatFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatsQuery = {
  listChats?:  {
    __typename: "ModelChatConnection",
    items:  Array< {
      __typename: "Chat",
      id: string,
      clientId: string,
      clientFcm?: string | null,
      clientName: string,
      clientImageUrl: string,
      helperId: string,
      helperFcm?: string | null,
      helperName: string,
      helperImageUrl: string,
      errandId: string,
      categoryId: string,
      messages?: Array< string | null > | null,
      status?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    referralCode?: string | null,
    clientId?: string | null,
    helperId?: string | null,
    email?: string | null,
    profileImage?: string | null,
    nickname?: string | null,
    i18n?: string | null,
    languages?: Array< string | null > | null,
    isHelper?: boolean | null,
    helperProfileImage?: string | null,
    helperName?: string | null,
    helperBirthDate?: string | null,
    helperIdentityImage?: string | null,
    helperIdentityBackImage?: string | null,
    helperIdentityFaceImage?: string | null,
    helperPhone?: string | null,
    helperFacebook?: string | null,
    helperIdentityStatus?: string | null,
    helperPhoneStatus?: string | null,
    helperFacebookStatus?: string | null,
    helperScore?: number | null,
    helperCompletedCnt?: number | null,
    helperReviewList?: Array< string | null > | null,
    helperPhoneRejectReason?: string | null,
    helperFacebookRejectReason?: string | null,
    helperIdentityRejectReason?: string | null,
    fcmToken?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    referralCode?: string | null,
    clientId?: string | null,
    helperId?: string | null,
    email?: string | null,
    profileImage?: string | null,
    nickname?: string | null,
    i18n?: string | null,
    languages?: Array< string | null > | null,
    isHelper?: boolean | null,
    helperProfileImage?: string | null,
    helperName?: string | null,
    helperBirthDate?: string | null,
    helperIdentityImage?: string | null,
    helperIdentityBackImage?: string | null,
    helperIdentityFaceImage?: string | null,
    helperPhone?: string | null,
    helperFacebook?: string | null,
    helperIdentityStatus?: string | null,
    helperPhoneStatus?: string | null,
    helperFacebookStatus?: string | null,
    helperScore?: number | null,
    helperCompletedCnt?: number | null,
    helperReviewList?: Array< string | null > | null,
    helperPhoneRejectReason?: string | null,
    helperFacebookRejectReason?: string | null,
    helperIdentityRejectReason?: string | null,
    fcmToken?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    referralCode?: string | null,
    clientId?: string | null,
    helperId?: string | null,
    email?: string | null,
    profileImage?: string | null,
    nickname?: string | null,
    i18n?: string | null,
    languages?: Array< string | null > | null,
    isHelper?: boolean | null,
    helperProfileImage?: string | null,
    helperName?: string | null,
    helperBirthDate?: string | null,
    helperIdentityImage?: string | null,
    helperIdentityBackImage?: string | null,
    helperIdentityFaceImage?: string | null,
    helperPhone?: string | null,
    helperFacebook?: string | null,
    helperIdentityStatus?: string | null,
    helperPhoneStatus?: string | null,
    helperFacebookStatus?: string | null,
    helperScore?: number | null,
    helperCompletedCnt?: number | null,
    helperReviewList?: Array< string | null > | null,
    helperPhoneRejectReason?: string | null,
    helperFacebookRejectReason?: string | null,
    helperIdentityRejectReason?: string | null,
    fcmToken?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    nameEn?: string | null,
    nameKo?: string | null,
    nameVi?: string | null,
    imageUrl?: string | null,
    subCategories?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    nameEn?: string | null,
    nameKo?: string | null,
    nameVi?: string | null,
    imageUrl?: string | null,
    subCategories?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    nameEn?: string | null,
    nameKo?: string | null,
    nameVi?: string | null,
    imageUrl?: string | null,
    subCategories?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateErrandSubscriptionVariables = {
  filter?: ModelSubscriptionErrandFilterInput | null,
};

export type OnCreateErrandSubscription = {
  onCreateErrand?:  {
    __typename: "Errand",
    id: string,
    clientId: string,
    helperId?: string | null,
    title?: string | null,
    description?: string | null,
    volunteerIDs?: Array< string | null > | null,
    volunteers?: Array< string | null > | null,
    categoryId: string,
    subCategoryId: string,
    startTime?: string | null,
    price?: number | null,
    latitude: number,
    longitude: number,
    address?: string | null,
    status?: string | null,
    cancelReasons?: Array< string | null > | null,
    views?: number | null,
    imageUrls?: Array< string | null > | null,
    hasActiveChat?: boolean | null,
    chatId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateErrandSubscriptionVariables = {
  filter?: ModelSubscriptionErrandFilterInput | null,
};

export type OnUpdateErrandSubscription = {
  onUpdateErrand?:  {
    __typename: "Errand",
    id: string,
    clientId: string,
    helperId?: string | null,
    title?: string | null,
    description?: string | null,
    volunteerIDs?: Array< string | null > | null,
    volunteers?: Array< string | null > | null,
    categoryId: string,
    subCategoryId: string,
    startTime?: string | null,
    price?: number | null,
    latitude: number,
    longitude: number,
    address?: string | null,
    status?: string | null,
    cancelReasons?: Array< string | null > | null,
    views?: number | null,
    imageUrls?: Array< string | null > | null,
    hasActiveChat?: boolean | null,
    chatId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteErrandSubscriptionVariables = {
  filter?: ModelSubscriptionErrandFilterInput | null,
};

export type OnDeleteErrandSubscription = {
  onDeleteErrand?:  {
    __typename: "Errand",
    id: string,
    clientId: string,
    helperId?: string | null,
    title?: string | null,
    description?: string | null,
    volunteerIDs?: Array< string | null > | null,
    volunteers?: Array< string | null > | null,
    categoryId: string,
    subCategoryId: string,
    startTime?: string | null,
    price?: number | null,
    latitude: number,
    longitude: number,
    address?: string | null,
    status?: string | null,
    cancelReasons?: Array< string | null > | null,
    views?: number | null,
    imageUrls?: Array< string | null > | null,
    hasActiveChat?: boolean | null,
    chatId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
};

export type OnCreateChatSubscription = {
  onCreateChat?:  {
    __typename: "Chat",
    id: string,
    clientId: string,
    clientFcm?: string | null,
    clientName: string,
    clientImageUrl: string,
    helperId: string,
    helperFcm?: string | null,
    helperName: string,
    helperImageUrl: string,
    errandId: string,
    categoryId: string,
    messages?: Array< string | null > | null,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
};

export type OnUpdateChatSubscription = {
  onUpdateChat?:  {
    __typename: "Chat",
    id: string,
    clientId: string,
    clientFcm?: string | null,
    clientName: string,
    clientImageUrl: string,
    helperId: string,
    helperFcm?: string | null,
    helperName: string,
    helperImageUrl: string,
    errandId: string,
    categoryId: string,
    messages?: Array< string | null > | null,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
};

export type OnDeleteChatSubscription = {
  onDeleteChat?:  {
    __typename: "Chat",
    id: string,
    clientId: string,
    clientFcm?: string | null,
    clientName: string,
    clientImageUrl: string,
    helperId: string,
    helperFcm?: string | null,
    helperName: string,
    helperImageUrl: string,
    errandId: string,
    categoryId: string,
    messages?: Array< string | null > | null,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
