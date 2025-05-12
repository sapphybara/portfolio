/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ResumeDataInput = {
  isSandboxMode: boolean,
  jobTitle: string,
  selectedSkills: Array< string >,
  skillLines: number,
  experience: Array< ExperienceInput >,
  education: Array< EducationInput >,
};

export type ExperienceInput = {
  title: string,
  subheader: string,
  data: Array< string >,
  dateRange: DateRange,
};

export type DateRange = {
  end?: string | null,
  start: string,
};

export type EducationInput = {
  title: string,
  subheader: string,
  dateRange: DateRange,
};

export type GeneratePDFResponse = {
  __typename: "GeneratePDFResponse",
  url: string,
};

export type CreateCreditCardInput = {
  apr: number,
  balance: number,
  cardName: string,
  creditLimit: number,
  id?: string | null,
  isEarningInterest: boolean,
  lastInterestAmount: number,
  minimumPayment: number,
  owner: Owner,
  paymentDate: string,
  score?: number | null,
};

export enum Owner {
  SAPPHY = "SAPPHY",
  HEIDI = "HEIDI",
}


export type ModelCreditCardConditionInput = {
  apr?: ModelFloatInput | null,
  balance?: ModelFloatInput | null,
  cardName?: ModelStringInput | null,
  creditLimit?: ModelFloatInput | null,
  isEarningInterest?: ModelBooleanInput | null,
  lastInterestAmount?: ModelFloatInput | null,
  minimumPayment?: ModelFloatInput | null,
  owner?: ModelOwnerInput | null,
  paymentDate?: ModelStringInput | null,
  score?: ModelFloatInput | null,
  and?: Array< ModelCreditCardConditionInput | null > | null,
  or?: Array< ModelCreditCardConditionInput | null > | null,
  not?: ModelCreditCardConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
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

export type ModelOwnerInput = {
  eq?: Owner | null,
  ne?: Owner | null,
};

export type CreditCard = {
  __typename: "CreditCard",
  apr: number,
  balance: number,
  cardName: string,
  creditLimit: number,
  id: string,
  isEarningInterest: boolean,
  lastInterestAmount: number,
  minimumPayment: number,
  owner: Owner,
  paymentDate: string,
  score?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCreditCardInput = {
  apr?: number | null,
  balance?: number | null,
  cardName?: string | null,
  creditLimit?: number | null,
  id: string,
  isEarningInterest?: boolean | null,
  lastInterestAmount?: number | null,
  minimumPayment?: number | null,
  owner?: Owner | null,
  paymentDate?: string | null,
  score?: number | null,
};

export type DeleteCreditCardInput = {
  id: string,
};

export type CreateContactFormInput = {
  email: string,
  id?: string | null,
  message?: string | null,
  name: string,
  subject: string,
};

export type ModelContactFormConditionInput = {
  email?: ModelStringInput | null,
  message?: ModelStringInput | null,
  name?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  and?: Array< ModelContactFormConditionInput | null > | null,
  or?: Array< ModelContactFormConditionInput | null > | null,
  not?: ModelContactFormConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ContactForm = {
  __typename: "ContactForm",
  email: string,
  id: string,
  message?: string | null,
  name: string,
  subject: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateContactFormInput = {
  email?: string | null,
  id: string,
  message?: string | null,
  name?: string | null,
  subject?: string | null,
};

export type DeleteContactFormInput = {
  id: string,
};

export type ModelCreditCardFilterInput = {
  apr?: ModelFloatInput | null,
  balance?: ModelFloatInput | null,
  cardName?: ModelStringInput | null,
  creditLimit?: ModelFloatInput | null,
  id?: ModelIDInput | null,
  isEarningInterest?: ModelBooleanInput | null,
  lastInterestAmount?: ModelFloatInput | null,
  minimumPayment?: ModelFloatInput | null,
  owner?: ModelOwnerInput | null,
  paymentDate?: ModelStringInput | null,
  score?: ModelFloatInput | null,
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

export type ModelContactFormFilterInput = {
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  message?: ModelStringInput | null,
  name?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelContactFormFilterInput | null > | null,
  or?: Array< ModelContactFormFilterInput | null > | null,
  not?: ModelContactFormFilterInput | null,
};

export type ModelContactFormConnection = {
  __typename: "ModelContactFormConnection",
  items:  Array<ContactForm | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionCreditCardFilterInput = {
  apr?: ModelSubscriptionFloatInput | null,
  balance?: ModelSubscriptionFloatInput | null,
  cardName?: ModelSubscriptionStringInput | null,
  creditLimit?: ModelSubscriptionFloatInput | null,
  id?: ModelSubscriptionIDInput | null,
  isEarningInterest?: ModelSubscriptionBooleanInput | null,
  lastInterestAmount?: ModelSubscriptionFloatInput | null,
  minimumPayment?: ModelSubscriptionFloatInput | null,
  owner?: ModelSubscriptionStringInput | null,
  paymentDate?: ModelSubscriptionStringInput | null,
  score?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCreditCardFilterInput | null > | null,
  or?: Array< ModelSubscriptionCreditCardFilterInput | null > | null,
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

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionContactFormFilterInput = {
  email?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  message?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  subject?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionContactFormFilterInput | null > | null,
  or?: Array< ModelSubscriptionContactFormFilterInput | null > | null,
};

export type GeneratePDFMutationVariables = {
  data: ResumeDataInput,
};

export type GeneratePDFMutation = {
  generatePDF?:  {
    __typename: "GeneratePDFResponse",
    url: string,
  } | null,
};

export type CreateCreditCardMutationVariables = {
  input: CreateCreditCardInput,
  condition?: ModelCreditCardConditionInput | null,
};

export type CreateCreditCardMutation = {
  createCreditCard?:  {
    __typename: "CreditCard",
    apr: number,
    balance: number,
    cardName: string,
    creditLimit: number,
    id: string,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    minimumPayment: number,
    owner: Owner,
    paymentDate: string,
    score?: number | null,
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
    apr: number,
    balance: number,
    cardName: string,
    creditLimit: number,
    id: string,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    minimumPayment: number,
    owner: Owner,
    paymentDate: string,
    score?: number | null,
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
    apr: number,
    balance: number,
    cardName: string,
    creditLimit: number,
    id: string,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    minimumPayment: number,
    owner: Owner,
    paymentDate: string,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateContactFormMutationVariables = {
  input: CreateContactFormInput,
  condition?: ModelContactFormConditionInput | null,
};

export type CreateContactFormMutation = {
  createContactForm?:  {
    __typename: "ContactForm",
    email: string,
    id: string,
    message?: string | null,
    name: string,
    subject: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateContactFormMutationVariables = {
  input: UpdateContactFormInput,
  condition?: ModelContactFormConditionInput | null,
};

export type UpdateContactFormMutation = {
  updateContactForm?:  {
    __typename: "ContactForm",
    email: string,
    id: string,
    message?: string | null,
    name: string,
    subject: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteContactFormMutationVariables = {
  input: DeleteContactFormInput,
  condition?: ModelContactFormConditionInput | null,
};

export type DeleteContactFormMutation = {
  deleteContactForm?:  {
    __typename: "ContactForm",
    email: string,
    id: string,
    message?: string | null,
    name: string,
    subject: string,
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
    apr: number,
    balance: number,
    cardName: string,
    creditLimit: number,
    id: string,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    minimumPayment: number,
    owner: Owner,
    paymentDate: string,
    score?: number | null,
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
      apr: number,
      balance: number,
      cardName: string,
      creditLimit: number,
      id: string,
      isEarningInterest: boolean,
      lastInterestAmount: number,
      minimumPayment: number,
      owner: Owner,
      paymentDate: string,
      score?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetContactFormQueryVariables = {
  id: string,
};

export type GetContactFormQuery = {
  getContactForm?:  {
    __typename: "ContactForm",
    email: string,
    id: string,
    message?: string | null,
    name: string,
    subject: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListContactFormsQueryVariables = {
  filter?: ModelContactFormFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListContactFormsQuery = {
  listContactForms?:  {
    __typename: "ModelContactFormConnection",
    items:  Array< {
      __typename: "ContactForm",
      email: string,
      id: string,
      message?: string | null,
      name: string,
      subject: string,
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
    apr: number,
    balance: number,
    cardName: string,
    creditLimit: number,
    id: string,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    minimumPayment: number,
    owner: Owner,
    paymentDate: string,
    score?: number | null,
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
    apr: number,
    balance: number,
    cardName: string,
    creditLimit: number,
    id: string,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    minimumPayment: number,
    owner: Owner,
    paymentDate: string,
    score?: number | null,
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
    apr: number,
    balance: number,
    cardName: string,
    creditLimit: number,
    id: string,
    isEarningInterest: boolean,
    lastInterestAmount: number,
    minimumPayment: number,
    owner: Owner,
    paymentDate: string,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateContactFormSubscriptionVariables = {
  filter?: ModelSubscriptionContactFormFilterInput | null,
};

export type OnCreateContactFormSubscription = {
  onCreateContactForm?:  {
    __typename: "ContactForm",
    email: string,
    id: string,
    message?: string | null,
    name: string,
    subject: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateContactFormSubscriptionVariables = {
  filter?: ModelSubscriptionContactFormFilterInput | null,
};

export type OnUpdateContactFormSubscription = {
  onUpdateContactForm?:  {
    __typename: "ContactForm",
    email: string,
    id: string,
    message?: string | null,
    name: string,
    subject: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteContactFormSubscriptionVariables = {
  filter?: ModelSubscriptionContactFormFilterInput | null,
};

export type OnDeleteContactFormSubscription = {
  onDeleteContactForm?:  {
    __typename: "ContactForm",
    email: string,
    id: string,
    message?: string | null,
    name: string,
    subject: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
