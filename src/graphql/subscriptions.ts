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
    id
    cardName
    paymentDate
    minimumPayment
    balance
    apr
    isEarningInterest
    lastInterestAmount
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
    id
    cardName
    paymentDate
    minimumPayment
    balance
    apr
    isEarningInterest
    lastInterestAmount
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
    id
    cardName
    paymentDate
    minimumPayment
    balance
    apr
    isEarningInterest
    lastInterestAmount
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCreditCardSubscriptionVariables,
  APITypes.OnDeleteCreditCardSubscription
>;
