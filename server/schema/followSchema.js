const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
        userInfo: User
    }

    input FollowInput {
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    type ProfileFollowInfo {
        idUserLogin: ID
        usernameUserLogin: String!
        emailUserLogin: String!
        nameUserLogin: String!
        following: [Follow]
        follower: [Follow]
    }

    type Mutation {
    followUser(followUserInput: FollowInput): Follow
}

    type Query {
        profileFollowUserLogin: ProfileFollowInfo
    }
`;


module.exports = typeDefs