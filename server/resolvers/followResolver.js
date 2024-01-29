const Follow = require("../models/follow")

const resolvers = {
    Mutation: {
        followUser: async (_, args, contextValue) => {
            const user = contextValue.auth()
            if (!user) {
                throw new Error('Authorization Failed')
            }
            const inputFollow = {
                followingId: args.followUserInput.followingId,
                followerId: user.userId,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const newFollow = await Follow.followUser(inputFollow)
            return inputFollow
        }
    },
    Query: {
        profileFollowUserLogin: async (_, args, contextValue) => {
            const userLogin = contextValue.auth()
            if (!userLogin) {
                throw new Error('Authorization Failed')
            }
            let result = await Follow.profileFollowUser(userLogin)
            return result
        }
    }
}

module.exports = resolvers