import { gql } from "@apollo/client";

export const SEARCH_USER = gql`
query Query($searchQuery: String!) {
  searchUsers(searchQuery: $searchQuery) {
    _id
    name
    username
    email
  }
}
`