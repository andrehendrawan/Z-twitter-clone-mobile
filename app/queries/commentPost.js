import { gql } from "@apollo/client";

export const COMMENT_POST = gql`
mutation Mutation($commentPostInput: CommentInput) {
  commentPost(commentPostInput: $commentPostInput) {
    content
    createdAt
    updatedAt
    username
  }
}
`