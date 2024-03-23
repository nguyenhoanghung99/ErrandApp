/* tslint:disable */

// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const vnpayUrlPayment = /* GraphQL */ `mutation VnpayUrlPayment($amount: Int!, $user: String!, $errandId: String!) {
  vnpayUrlPayment(amount: $amount, user: $user, errandId: $errandId)
}
` as GeneratedMutation<
  APITypes.VnpayUrlPaymentMutationVariables,
  APITypes.VnpayUrlPaymentMutation
>;
export const createPaymentDetail = /* GraphQL */ `mutation CreatePaymentDetail(
  $input: CreatePaymentDetailInput!
  $condition: ModelPaymentDetailConditionInput
) {
  createPaymentDetail(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePaymentDetailMutationVariables,
  APITypes.CreatePaymentDetailMutation
>;
export const updatePaymentDetail = /* GraphQL */ `mutation UpdatePaymentDetail(
  $input: UpdatePaymentDetailInput!
  $condition: ModelPaymentDetailConditionInput
) {
  updatePaymentDetail(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePaymentDetailMutationVariables,
  APITypes.UpdatePaymentDetailMutation
>;
export const deletePaymentDetail = /* GraphQL */ `mutation DeletePaymentDetail(
  $input: DeletePaymentDetailInput!
  $condition: ModelPaymentDetailConditionInput
) {
  deletePaymentDetail(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePaymentDetailMutationVariables,
  APITypes.DeletePaymentDetailMutation
>;
export const createPayment = /* GraphQL */ `mutation CreatePayment(
  $input: CreatePaymentInput!
  $condition: ModelPaymentConditionInput
) {
  createPayment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePaymentMutationVariables,
  APITypes.CreatePaymentMutation
>;
export const updatePayment = /* GraphQL */ `mutation UpdatePayment(
  $input: UpdatePaymentInput!
  $condition: ModelPaymentConditionInput
) {
  updatePayment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePaymentMutationVariables,
  APITypes.UpdatePaymentMutation
>;
export const deletePayment = /* GraphQL */ `mutation DeletePayment(
  $input: DeletePaymentInput!
  $condition: ModelPaymentConditionInput
) {
  deletePayment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePaymentMutationVariables,
  APITypes.DeletePaymentMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createCategory = /* GraphQL */ `mutation CreateCategory(
  $input: CreateCategoryInput!
  $condition: ModelCategoryConditionInput
) {
  createCategory(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCategoryMutationVariables,
  APITypes.CreateCategoryMutation
>;
export const updateCategory = /* GraphQL */ `mutation UpdateCategory(
  $input: UpdateCategoryInput!
  $condition: ModelCategoryConditionInput
) {
  updateCategory(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCategoryMutationVariables,
  APITypes.UpdateCategoryMutation
>;
export const deleteCategory = /* GraphQL */ `mutation DeleteCategory(
  $input: DeleteCategoryInput!
  $condition: ModelCategoryConditionInput
) {
  deleteCategory(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCategoryMutationVariables,
  APITypes.DeleteCategoryMutation
>;
export const createErrand = /* GraphQL */ `mutation CreateErrand(
  $input: CreateErrandInput!
  $condition: ModelErrandConditionInput
) {
  createErrand(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateErrandMutationVariables,
  APITypes.CreateErrandMutation
>;
export const updateErrand = /* GraphQL */ `mutation UpdateErrand(
  $input: UpdateErrandInput!
  $condition: ModelErrandConditionInput
) {
  updateErrand(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateErrandMutationVariables,
  APITypes.UpdateErrandMutation
>;
export const deleteErrand = /* GraphQL */ `mutation DeleteErrand(
  $input: DeleteErrandInput!
  $condition: ModelErrandConditionInput
) {
  deleteErrand(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteErrandMutationVariables,
  APITypes.DeleteErrandMutation
>;
export const createChat = /* GraphQL */ `mutation CreateChat(
  $input: CreateChatInput!
  $condition: ModelChatConditionInput
) {
  createChat(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateChatMutationVariables,
  APITypes.CreateChatMutation
>;
export const updateChat = /* GraphQL */ `mutation UpdateChat(
  $input: UpdateChatInput!
  $condition: ModelChatConditionInput
) {
  updateChat(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateChatMutationVariables,
  APITypes.UpdateChatMutation
>;
export const deleteChat = /* GraphQL */ `mutation DeleteChat(
  $input: DeleteChatInput!
  $condition: ModelChatConditionInput
) {
  deleteChat(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteChatMutationVariables,
  APITypes.DeleteChatMutation
>;
