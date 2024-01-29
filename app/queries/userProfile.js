import { gql } from "@apollo/client";

export const USER_PROFILE = gql`
query ProfileFollowUserLogin {
  profileFollowUserLogin {
    idUserLogin
    usernameUserLogin
    following {
      _id
      followingId
      followerId
      createdAt
      updatedAt
      userInfo {
        _id
        name
        username
        email
        password
      }
    }
    follower {
      _id
      followingId
      followerId
      createdAt
      updatedAt
      userInfo {
        _id
        name
        username
        email
        password
      }
    }
    emailUserLogin
    nameUserLogin
  }
}
`