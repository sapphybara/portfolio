/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCreditCardInput = {
  id?: string | null,
  cardName: string,
  paymentDate: string,
  minimumPayment: number,
  balance: number,
  apr: number,
  isEarningInterest: boolean,
  lastInterestAmount: number,
};

export type ModelCreditCardConditionInput = {
  cardName?: ModelStringInput | null,
  paymentDate?: ModelStringInput | null,
  minimumPayment?: ModelFloatInput | null,
  balance?: ModelFloatInput | null,
  apr?: ModelFloatInput | null,
  isEarningInterest?: ModelBooleanInput | null,
  lastInterestAmount?: ModelFloatInput | null,
  and?: Array< ModelCreditCardConditionInput | null > | null,
  or?: Array< ModelCreditCardConditionInput | null > | null,
  not?: ModelCreditCardConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
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

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type CreditCard = {
  __typename: "CreditCard",
  id: string,
  cardName: string,
  paymentDate: string,
  minimumPayment: number,
  balance: number,
  apr: number,
  isEarningInterest: boolean,
  lastInterestAmount: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCreditCardInput = {
  id: string,
  cardName?: string | null,
  paymentDate?: string | null,
  minimumPayment?: number | null,
  balance?: number | null,
  apr?: number | null,
  isEarningInterest?: boolean | null,
  lastInterestAmount?: number | null,
};

export type DeleteCreditCardInput = {
  id: string,
};

export type ModelCreditCardFilterInput = {
  id?: ModelIDInput | null,
  cardName?: ModelStringInput | null,
  paymentDate?: ModelStringInput | null,
  minimumPayment?: ModelFloatInput | null,
  balance?: ModelFloatInput | null,
  apr?: ModelFloatInput | null,
  isEarningInterest?: ModelBooleanInput | null,
  lastInterestAmount?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCreditCardFilterInput | null > | null,
  or?: Array< ModelCreditCardFilterInput | null > | null,
  not?: ModelCreditCardFilterInput | null,
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

export type ModelCreditCardConnection = {
  __typename: "ModelCreditCardConnection",
  items:  Array<CreditCard | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionCreditCardFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  cardName?: ModelSubscriptionStringInput | null,
  paymentDate?: ModelSubscriptionStringInput | null,
  minimumPayment?: ModelSubscriptionFloatInput | null,
  balance?: ModelSubscriptionFloatInput | null,
  apr?: ModelSubscriptionFloatInput | null,
  isEarningInterest?: ModelSubscriptionBooleanInput | null,
  lastInterestAmount?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCreditCardFilterInput | null > | null,
  or?: Array< ModelSubscriptionCreditCardFilterInput | null > | null,
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

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type CreateCreditCardMutationVariables = {
  input: CreateCreditCardInput,
  condition?: ModelCreditCardConditionInput | null,
};

export type CreateCreditCardMutation = {
  createCreditCard?:  {
    __typename: "CreditCard",
    id: string,
    cardName: string,
    paymentDate: string,
    minimumPayment: number,
    balance: number,
    apr: number,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCreditCardMutationVariables = {
  input: UpdateCreditCardInput,
  condition?: ModelCreditCardConditionInput | null,
};

export type UpdateCreditCardMutation = {
  updateCreditCard?:  {
    __typename: "CreditCard",
    id: string,
    cardName: string,
    paymentDate: string,
    minimumPayment: number,
    balance: number,
    apr: number,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCreditCardMutationVariables = {
  input: DeleteCreditCardInput,
  condition?: ModelCreditCardConditionInput | null,
};

export type DeleteCreditCardMutation = {
  deleteCreditCard?:  {
    __typename: "CreditCard",
    id: string,
    cardName: string,
    paymentDate: string,
    minimumPayment: number,
    balance: number,
    apr: number,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetCreditCardQueryVariables = {
  id: string,
};

export type GetCreditCardQuery = {
  getCreditCard?:  {
    __typename: "CreditCard",
    id: string,
    cardName: string,
    paymentDate: string,
    minimumPayment: number,
    balance: number,
    apr: number,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCreditCardsQueryVariables = {
  filter?: ModelCreditCardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCreditCardsQuery = {
  listCreditCards?:  {
    __typename: "ModelCreditCardConnection",
    items:  Array< {
      __typename: "CreditCard",
      id: string,
      cardName: string,
      paymentDate: string,
      minimumPayment: number,
      balance: number,
      apr: number,
      isEarningInterest: boolean,
      lastInterestAmount: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCreditCardSubscriptionVariables = {
  filter?: ModelSubscriptionCreditCardFilterInput | null,
};

export type OnCreateCreditCardSubscription = {
  onCreateCreditCard?:  {
    __typename: "CreditCard",
    id: string,
    cardName: string,
    paymentDate: string,
    minimumPayment: number,
    balance: number,
    apr: number,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCreditCardSubscriptionVariables = {
  filter?: ModelSubscriptionCreditCardFilterInput | null,
};

export type OnUpdateCreditCardSubscription = {
  onUpdateCreditCard?:  {
    __typename: "CreditCard",
    id: string,
    cardName: string,
    paymentDate: string,
    minimumPayment: number,
    balance: number,
    apr: number,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCreditCardSubscriptionVariables = {
  filter?: ModelSubscriptionCreditCardFilterInput | null,
};

export type OnDeleteCreditCardSubscription = {
  onDeleteCreditCard?:  {
    __typename: "CreditCard",
    id: string,
    cardName: string,
    paymentDate: string,
    minimumPayment: number,
    balance: number,
    apr: number,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
