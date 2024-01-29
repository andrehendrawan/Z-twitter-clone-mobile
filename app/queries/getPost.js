import { gql } from "@apollo/client";

export const GET_POSTS = gql`
query Query {
  getPosts {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    author {
      _id
      name
      username
      email
    }
  }
}
`