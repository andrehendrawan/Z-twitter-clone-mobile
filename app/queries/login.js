import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation Mutation($loginInput: LoginInput) {
  login(loginInput: $loginInput) {
    access_token
    userProfile {
      _id
      name
      username
      email
    }
  }
}
`