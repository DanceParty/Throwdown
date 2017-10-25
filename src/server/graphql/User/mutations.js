import { gql } from 'react-apollo'

export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    
    createUser(firstName: $firstName, lastName: $lastName, authProvider: { email: { email: $email, password: $password } }) {
      id
    }

    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  
  }
`

export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  
  }
`