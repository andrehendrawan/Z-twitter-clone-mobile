import { gql } from "@apollo/client";

export const LIKE_POST = gql`
mutation LikePost($likePostInput: LikeInput) {
  likePost(likePostInput: $likePostInput) {
    username
    createdAt
    updatedAt
  }
}
`