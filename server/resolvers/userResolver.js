const User = require("../models/user");


const resolvers = {
    Query: {
        getUser: async (_, __, contextValue) => {
            const users = await User.getAllUser();
            return users;
        },
        getUserbyId: async (_, args) => {
            console.log(args);
            // const getUserbyId = user.find((el) => el.id === Number(args.id));
            const getUserbyId = await User.getUserbyId(args.id)
            return getUserbyId;
        },
        searchUsers: async (_, { searchQuery }) => {
            try {
                const matchingUsers = await User.searchUsers(searchQuery);
                return matchingUsers;
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },
    Mutation: {
        register: async (_, args) => {
            console.log(args);

            const register = await User.register(args.register)
            console.log(register);
            return register;
        },
        login: async (_, args) => {
            console.log(args);
            const result = await User.login(args.loginInput)
            return result
        }
    }
};

module.exports = resolvers