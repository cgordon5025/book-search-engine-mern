import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
        bookCount
        savedBooks {
          image
          authors
          bookId
          description
          link
          title
        }
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation SaveBook($userId: ID!, $book: String!) {
    saveBook(userId: $userId, book: $book) {
      email
      savedBooks {
        _id
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($savedBooks: String!) {
    removeBook(savedBooks: $savedBooks) {
      savedBooks {
        title
      }
    }
  }
`;