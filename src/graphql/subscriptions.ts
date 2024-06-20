/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateCreditCard = /* GraphQL */ `subscription OnCreateCreditCard(
  $filter: ModelSubscriptionCreditCardFilterInput
) {
  onCreateCreditCard(filter: $filter) {
    apr
    balance
    cardName
    creditLimit
    id
    isEarningInterest
    lastInterestAmount
    minimumPayment
    owner
    paymentDate
    score
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCreditCardSubscriptionVariables,
  APITypes.OnCreateCreditCardSubscription
>;
export const onUpdateCreditCard = /* GraphQL */ `subscription OnUpdateCreditCard(
  $filter: ModelSubscriptionCreditCardFilterInput
) {
  onUpdateCreditCard(filter: $filter) {
    apr
    balance
    cardName
    creditLimit
    id
    isEarningInterest
    lastInterestAmount
    minimumPayment
    owner
    paymentDate
    score
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCreditCardSubscriptionVariables,
  APITypes.OnUpdateCreditCardSubscription
>;
export const onDeleteCreditCard = /* GraphQL */ `subscription OnDeleteCreditCard(
  $filter: ModelSubscriptionCreditCardFilterInput
) {
  onDeleteCreditCard(filter: $filter) {
    apr
    balance
    cardName
    creditLimit
    id
    isEarningInterest
    lastInterestAmount
    minimumPayment
    owner
    paymentDate
    score
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCreditCardSubscriptionVariables,
  APITypes.OnDeleteCreditCardSubscription
>;
export const onCreateContactForm = /* GraphQL */ `subscription OnCreateContactForm(
  $filter: ModelSubscriptionContactFormFilterInput
) {
  onCreateContactForm(filter: $filter) {
    email
    id
    message
    name
    subject
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateContactFormSubscriptionVariables,
  APITypes.OnCreateContactFormSubscription
>;
export const onUpdateContactForm = /* GraphQL */ `subscription OnUpdateContactForm(
  $filter: ModelSubscriptionContactFormFilterInput
) {
  onUpdateContactForm(filter: $filter) {
    email
    id
    message
    name
    subject
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateContactFormSubscriptionVariables,
  APITypes.OnUpdateContactFormSubscription
>;
export const onDeleteContactForm = /* GraphQL */ `subscription OnDeleteContactForm(
  $filter: ModelSubscriptionContactFormFilterInput
) {
  onDeleteContactForm(filter: $filter) {
    email
    id
    message
    name
    subject
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteContactFormSubscriptionVariables,
  APITypes.OnDeleteContactFormSubscription
>;
