/* tslint:disable */

// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getPaymentDetail = /* GraphQL */ `query GetPaymentDetail($id: ID!) {
  getPaymentDetail(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetPaymentDetailQueryVariables,
  APITypes.GetPaymentDetailQuery
>;
export const listPaymentDetails = /* GraphQL */ `query ListPaymentDetails(
  $filter: ModelPaymentDetailFilterInput
  $limit: Int
  $nextToken: String
) {
  listPaymentDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPaymentDetailsQueryVariables,
  APITypes.ListPaymentDetailsQuery
>;
export const getPayment = /* GraphQL */ `query GetPayment($id: ID!) {
  getPayment(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetPaymentQueryVariables,
  APITypes.GetPaymentQuery
>;
export const listPayments = /* GraphQL */ `query ListPayments(
  $filter: ModelPaymentFilterInput
  $limit: Int
  $nextToken: String
) {
  listPayments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPaymentsQueryVariables,
  APITypes.ListPaymentsQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getCategory = /* GraphQL */ `query GetCategory($id: ID!) {
  getCategory(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCategoryQueryVariables,
  APITypes.GetCategoryQuery
>;
export const listCategories = /* GraphQL */ `query ListCategories(
  $filter: ModelCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCategoriesQueryVariables,
  APITypes.ListCategoriesQuery
>;
export const getErrand = /* GraphQL */ `query GetErrand($id: ID!) {
  getErrand(id: $id) {
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
` as GeneratedQuery<APITypes.GetErrandQueryVariables, APITypes.GetErrandQuery>;
export const listErrands = /* GraphQL */ `query ListErrands(
  $filter: ModelErrandFilterInput
  $limit: Int
  $nextToken: String
) {
  listErrands(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListErrandsQueryVariables,
  APITypes.ListErrandsQuery
>;
export const getChat = /* GraphQL */ `query GetChat($id: ID!) {
  getChat(id: $id) {
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
` as GeneratedQuery<APITypes.GetChatQueryVariables, APITypes.GetChatQuery>;
export const listChats = /* GraphQL */ `query ListChats(
  $filter: ModelChatFilterInput
  $limit: Int
  $nextToken: String
) {
  listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListChatsQueryVariables, APITypes.ListChatsQuery>;
