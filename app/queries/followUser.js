import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
mutation Mutation($followUserInput: FollowInput) {
  followUser(followUserInput: $followUserInput) {
    _id
    followingId
    followerId
    createdAt
    updatedAt
  }
}
`