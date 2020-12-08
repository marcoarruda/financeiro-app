/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRegistro = /* GraphQL */ `
  query GetRegistro($id: ID!) {
    getRegistro(id: $id) {
      id
      tipo
      valor
      descricao
      data
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listRegistros = /* GraphQL */ `
  query ListRegistros(
    $filter: ModelRegistroFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRegistros(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tipo
        valor
        descricao
        data
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
