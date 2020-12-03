/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRegistro = /* GraphQL */ `
  mutation CreateRegistro(
    $input: CreateRegistroInput!
    $condition: ModelRegistroConditionInput
  ) {
    createRegistro(input: $input, condition: $condition) {
      id
      tipo
      valor
      descricao
      data
      createdAt
      updatedAt
    }
  }
`;
export const updateRegistro = /* GraphQL */ `
  mutation UpdateRegistro(
    $input: UpdateRegistroInput!
    $condition: ModelRegistroConditionInput
  ) {
    updateRegistro(input: $input, condition: $condition) {
      id
      tipo
      valor
      descricao
      data
      createdAt
      updatedAt
    }
  }
`;
export const deleteRegistro = /* GraphQL */ `
  mutation DeleteRegistro(
    $input: DeleteRegistroInput!
    $condition: ModelRegistroConditionInput
  ) {
    deleteRegistro(input: $input, condition: $condition) {
      id
      tipo
      valor
      descricao
      data
      createdAt
      updatedAt
    }
  }
`;
