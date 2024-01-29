import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
mutation Mutation($register: RegisterInput) {
  register(register: $register) {
    _id
    name
    username
    email
  }
}
`