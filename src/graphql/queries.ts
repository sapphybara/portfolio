/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCreditCard = /* GraphQL */ `query GetCreditCard($id: ID!) {
  getCreditCard(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCreditCardQueryVariables,
  APITypes.GetCreditCardQuery
>;
export const listCreditCards = /* GraphQL */ `query ListCreditCards(
  $filter: ModelCreditCardFilterInput
  $limit: Int
  $nextToken: String
) {
  listCreditCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCreditCardsQueryVariables,
  APITypes.ListCreditCardsQuery
>;
export const getContactForm = /* GraphQL */ `query GetContactForm($id: ID!) {
  getContactForm(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetContactFormQueryVariables,
  APITypes.GetContactFormQuery
>;
export const listContactForms = /* GraphQL */ `query ListContactForms(
  $filter: ModelContactFormFilterInput
  $limit: Int
  $nextToken: String
) {
  listContactForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      email
      id
      message
      name
      subject
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListContactFormsQueryVariables,
  APITypes.ListContactFormsQuery
>;
