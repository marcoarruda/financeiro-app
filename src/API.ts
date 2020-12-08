/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRegistroInput = {
  id?: string | null,
  tipo: string,
  valor: number,
  descricao: string,
  data: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelRegistroConditionInput = {
  tipo?: ModelStringInput | null,
  valor?: ModelFloatInput | null,
  descricao?: ModelStringInput | null,
  data?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelRegistroConditionInput | null > | null,
  or?: Array< ModelRegistroConditionInput | null > | null,
  not?: ModelRegistroConditionInput | null,
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

export type UpdateRegistroInput = {
  id: string,
  tipo?: string | null,
  valor?: number | null,
  descricao?: string | null,
  data?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteRegistroInput = {
  id?: string | null,
};

export type ModelRegistroFilterInput = {
  id?: ModelIDInput | null,
  tipo?: ModelStringInput | null,
  valor?: ModelFloatInput | null,
  descricao?: ModelStringInput | null,
  data?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelRegistroFilterInput | null > | null,
  or?: Array< ModelRegistroFilterInput | null > | null,
  not?: ModelRegistroFilterInput | null,
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

export type CreateRegistroMutationVariables = {
  input: CreateRegistroInput,
  condition?: ModelRegistroConditionInput | null,
};

export type CreateRegistroMutation = {
  createRegistro:  {
    __typename: "Registro",
    id: string,
    tipo: string,
    valor: number,
    descricao: string,
    data: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateRegistroMutationVariables = {
  input: UpdateRegistroInput,
  condition?: ModelRegistroConditionInput | null,
};

export type UpdateRegistroMutation = {
  updateRegistro:  {
    __typename: "Registro",
    id: string,
    tipo: string,
    valor: number,
    descricao: string,
    data: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteRegistroMutationVariables = {
  input: DeleteRegistroInput,
  condition?: ModelRegistroConditionInput | null,
};

export type DeleteRegistroMutation = {
  deleteRegistro:  {
    __typename: "Registro",
    id: string,
    tipo: string,
    valor: number,
    descricao: string,
    data: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type GetRegistroQueryVariables = {
  id: string,
};

export type GetRegistroQuery = {
  getRegistro:  {
    __typename: "Registro",
    id: string,
    tipo: string,
    valor: number,
    descricao: string,
    data: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListRegistrosQueryVariables = {
  filter?: ModelRegistroFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRegistrosQuery = {
  listRegistros:  {
    __typename: "ModelRegistroConnection",
    items:  Array< {
      __typename: "Registro",
      id: string,
      tipo: string,
      valor: number,
      descricao: string,
      data: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateRegistroSubscriptionVariables = {
  owner: string,
};

export type OnCreateRegistroSubscription = {
  onCreateRegistro:  {
    __typename: "Registro",
    id: string,
    tipo: string,
    valor: number,
    descricao: string,
    data: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateRegistroSubscriptionVariables = {
  owner: string,
};

export type OnUpdateRegistroSubscription = {
  onUpdateRegistro:  {
    __typename: "Registro",
    id: string,
    tipo: string,
    valor: number,
    descricao: string,
    data: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteRegistroSubscriptionVariables = {
  owner: string,
};

export type OnDeleteRegistroSubscription = {
  onDeleteRegistro:  {
    __typename: "Registro",
    id: string,
    tipo: string,
    valor: number,
    descricao: string,
    data: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};
