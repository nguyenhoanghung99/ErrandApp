/* tslint:disable */

// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreatePaymentDetail = /* GraphQL */ `subscription OnCreatePaymentDetail(
  $filter: ModelSubscriptionPaymentDetailFilterInput
) {
  onCreatePaymentDetail(filter: $filter) {
    tmnCode
    amount
    bankCode
    bankTranNo
    cardType
    payDate
    info
    tranNo
    responseCode
    tranStatus
    secureHash
    payment
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePaymentDetailSubscriptionVariables,
  APITypes.OnCreatePaymentDetailSubscription
>;
export const onUpdatePaymentDetail = /* GraphQL */ `subscription OnUpdatePaymentDetail(
  $filter: ModelSubscriptionPaymentDetailFilterInput
) {
  onUpdatePaymentDetail(filter: $filter) {
    tmnCode
    amount
    bankCode
    bankTranNo
    cardType
    payDate
    info
    tranNo
    responseCode
    tranStatus
    secureHash
    payment
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePaymentDetailSubscriptionVariables,
  APITypes.OnUpdatePaymentDetailSubscription
>;
export const onDeletePaymentDetail = /* GraphQL */ `subscription OnDeletePaymentDetail(
  $filter: ModelSubscriptionPaymentDetailFilterInput
) {
  onDeletePaymentDetail(filter: $filter) {
    tmnCode
    amount
    bankCode
    bankTranNo
    cardType
    payDate
    info
    tranNo
    responseCode
    tranStatus
    secureHash
    payment
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePaymentDetailSubscriptionVariables,
  APITypes.OnDeletePaymentDetailSubscription
>;
export const onCreatePayment = /* GraphQL */ `subscription OnCreatePayment($filter: ModelSubscriptionPaymentFilterInput) {
  onCreatePayment(filter: $filter) {
    id
    user
    errandId
    txnRef
    detail
    isDeleted
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePaymentSubscriptionVariables,
  APITypes.OnCreatePaymentSubscription
>;
export const onUpdatePayment = /* GraphQL */ `subscription OnUpdatePayment($filter: ModelSubscriptionPaymentFilterInput) {
  onUpdatePayment(filter: $filter) {
    id
    user
    errandId
    txnRef
    detail
    isDeleted
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePaymentSubscriptionVariables,
  APITypes.OnUpdatePaymentSubscription
>;
export const onDeletePayment = /* GraphQL */ `subscription OnDeletePayment($filter: ModelSubscriptionPaymentFilterInput) {
  onDeletePayment(filter: $filter) {
    id
    user
    errandId
    txnRef
    detail
    isDeleted
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePaymentSubscriptionVariables,
  APITypes.OnDeletePaymentSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
    id
    referralCode
    clientId
    helperId
    email
    profileImage
    nickname
    i18n
    languages
    isHelper
    helperProfileImage
    helperName
    helperBirthDate
    helperIdentityImage
    helperIdentityBackImage
    helperIdentityFaceImage
    helperPhone
    helperFacebook
    helperIdentityStatus
    helperPhoneStatus
    helperFacebookStatus
    helperScore
    helperCompletedCnt
    helperReviewList
    helperPhoneRejectReason
    helperFacebookRejectReason
    helperIdentityRejectReason
    fcmToken
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
    id
    referralCode
    clientId
    helperId
    email
    profileImage
    nickname
    i18n
    languages
    isHelper
    helperProfileImage
    helperName
    helperBirthDate
    helperIdentityImage
    helperIdentityBackImage
    helperIdentityFaceImage
    helperPhone
    helperFacebook
    helperIdentityStatus
    helperPhoneStatus
    helperFacebookStatus
    helperScore
    helperCompletedCnt
    helperReviewList
    helperPhoneRejectReason
    helperFacebookRejectReason
    helperIdentityRejectReason
    fcmToken
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
    id
    referralCode
    clientId
    helperId
    email
    profileImage
    nickname
    i18n
    languages
    isHelper
    helperProfileImage
    helperName
    helperBirthDate
    helperIdentityImage
    helperIdentityBackImage
    helperIdentityFaceImage
    helperPhone
    helperFacebook
    helperIdentityStatus
    helperPhoneStatus
    helperFacebookStatus
    helperScore
    helperCompletedCnt
    helperReviewList
    helperPhoneRejectReason
    helperFacebookRejectReason
    helperIdentityRejectReason
    fcmToken
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateCategory = /* GraphQL */ `subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
  onCreateCategory(filter: $filter) {
    id
    name
    nameEn
    nameKo
    nameVi
    imageUrl
    subCategories
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCategorySubscriptionVariables,
  APITypes.OnCreateCategorySubscription
>;
export const onUpdateCategory = /* GraphQL */ `subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
  onUpdateCategory(filter: $filter) {
    id
    name
    nameEn
    nameKo
    nameVi
    imageUrl
    subCategories
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCategorySubscriptionVariables,
  APITypes.OnUpdateCategorySubscription
>;
export const onDeleteCategory = /* GraphQL */ `subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
  onDeleteCategory(filter: $filter) {
    id
    name
    nameEn
    nameKo
    nameVi
    imageUrl
    subCategories
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCategorySubscriptionVariables,
  APITypes.OnDeleteCategorySubscription
>;
export const onCreateErrand = /* GraphQL */ `subscription OnCreateErrand($filter: ModelSubscriptionErrandFilterInput) {
  onCreateErrand(filter: $filter) {
    id
    clientId
    helperId
    title
    description
    volunteerIDs
    volunteers
    categoryId
    subCategoryId
    startTime
    price
    latitude
    longitude
    address
    status
    cancelReasons
    views
    imageUrls
    hasActiveChat
    chatId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateErrandSubscriptionVariables,
  APITypes.OnCreateErrandSubscription
>;
export const onUpdateErrand = /* GraphQL */ `subscription OnUpdateErrand($filter: ModelSubscriptionErrandFilterInput) {
  onUpdateErrand(filter: $filter) {
    id
    clientId
    helperId
    title
    description
    volunteerIDs
    volunteers
    categoryId
    subCategoryId
    startTime
    price
    latitude
    longitude
    address
    status
    cancelReasons
    views
    imageUrls
    hasActiveChat
    chatId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateErrandSubscriptionVariables,
  APITypes.OnUpdateErrandSubscription
>;
export const onDeleteErrand = /* GraphQL */ `subscription OnDeleteErrand($filter: ModelSubscriptionErrandFilterInput) {
  onDeleteErrand(filter: $filter) {
    id
    clientId
    helperId
    title
    description
    volunteerIDs
    volunteers
    categoryId
    subCategoryId
    startTime
    price
    latitude
    longitude
    address
    status
    cancelReasons
    views
    imageUrls
    hasActiveChat
    chatId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteErrandSubscriptionVariables,
  APITypes.OnDeleteErrandSubscription
>;
export const onCreateChat = /* GraphQL */ `subscription OnCreateChat($filter: ModelSubscriptionChatFilterInput) {
  onCreateChat(filter: $filter) {
    id
    clientId
    clientFcm
    clientName
    clientImageUrl
    helperId
    helperFcm
    helperName
    helperImageUrl
    errandId
    categoryId
    messages
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateChatSubscriptionVariables,
  APITypes.OnCreateChatSubscription
>;
export const onUpdateChat = /* GraphQL */ `subscription OnUpdateChat($filter: ModelSubscriptionChatFilterInput) {
  onUpdateChat(filter: $filter) {
    id
    clientId
    clientFcm
    clientName
    clientImageUrl
    helperId
    helperFcm
    helperName
    helperImageUrl
    errandId
    categoryId
    messages
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateChatSubscriptionVariables,
  APITypes.OnUpdateChatSubscription
>;
export const onDeleteChat = /* GraphQL */ `subscription OnDeleteChat($filter: ModelSubscriptionChatFilterInput) {
  onDeleteChat(filter: $filter) {
    id
    clientId
    clientFcm
    clientName
    clientImageUrl
    helperId
    helperFcm
    helperName
    helperImageUrl
    errandId
    categoryId
    messages
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteChatSubscriptionVariables,
  APITypes.OnDeleteChatSubscription
>;
