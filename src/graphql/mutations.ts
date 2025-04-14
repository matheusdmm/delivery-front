import { gql } from '@apollo/client';

// Mutation para login
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

// Mutation para criar um pedido
export const CREATE_ORDER = gql`
  mutation CreateOrder($product: String!, $quantity: Int!) {
    createOrder(product: $product, quantity: $quantity) {
      id
      status
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password)
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($item: String!) {
    createOrder(item: $item) {
      id
      customer
      item
      status
      created_at
    }
  }
`;
