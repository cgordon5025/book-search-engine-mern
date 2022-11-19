import { gql } from '@apollo/client';

export const GET_ME = gql`
query findUser{
    me {
      _id
      email
      username
      savedBooks {
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