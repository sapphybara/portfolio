/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createCreditCard = /* GraphQL */ `mutation CreateCreditCard(
  $input: CreateCreditCardInput!
  $condition: ModelCreditCardConditionInput
) {
  createCreditCard(input: $input, condition: $condition) {
    id
    cardName
    paymentDate
    minimumPayment
    balance
    apr
    isEarningInterest
    lastInterestAmount
    score
    creditLimit
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCreditCardMutationVariables,
  APITypes.CreateCreditCardMutation
>;
export const updateCreditCard = /* GraphQL */ `mutation UpdateCreditCard(
  $input: UpdateCreditCardInput!
  $condition: ModelCreditCardConditionInput
) {
  updateCreditCard(input: $input, condition: $condition) {
    id
    cardName
    paymentDate
    minimumPayment
    balance
    apr
    isEarningInterest
    lastInterestAmount
    score
    creditLimit
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCreditCardMutationVariables,
  APITypes.UpdateCreditCardMutation
>;
export const deleteCreditCard = /* GraphQL */ `mutation DeleteCreditCard(
  $input: DeleteCreditCardInput!
  $condition: ModelCreditCardConditionInput
) {
  deleteCreditCard(input: $input, condition: $condition) {
    id
    cardName
    paymentDate
    minimumPayment
    balance
    apr
    isEarningInterest
    lastInterestAmount
    score
    creditLimit
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCreditCardMutationVariables,
  APITypes.DeleteCreditCardMutation
>;
export const createContactForm = /* GraphQL */ `mutation CreateContactForm(
  $input: CreateContactFormInput!
  $condition: ModelContactFormConditionInput
) {
  createContactForm(input: $input, condition: $condition) {
    id
    name
    email
    subject
    message
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateContactFormMutationVariables,
  APITypes.CreateContactFormMutation
>;
export const updateContactForm = /* GraphQL */ `mutation UpdateContactForm(
  $input: UpdateContactFormInput!
  $condition: ModelContactFormConditionInput
) {
  updateContactForm(input: $input, condition: $condition) {
    id
    name
    email
    subject
    message
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateContactFormMutationVariables,
  APITypes.UpdateContactFormMutation
>;
export const deleteContactForm = /* GraphQL */ `mutation DeleteContactForm(
  $input: DeleteContactFormInput!
  $condition: ModelContactFormConditionInput
) {
  deleteContactForm(input: $input, condition: $condition) {
    id
    name
    email
    subject
    message
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteContactFormMutationVariables,
  APITypes.DeleteContactFormMutation
>;
