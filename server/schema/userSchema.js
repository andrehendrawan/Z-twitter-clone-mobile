const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String
        email: String
        password: String
    }

    type RegisterResponse {
        _id: ID
        name: String
        username: String
        email: String
    }

    input RegisterInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    type LoginResponse {
        access_token: String
        userProfile: User
    }

    input LoginInput {
        username: String
        password: String
    }


    type Query {
        getUser: [User]
        getUserbyId(id: ID!): User
        searchUsers(searchQuery: String): [User]
    }

    type Mutation {
        register(register: RegisterInput): RegisterResponse
        login(loginInput: LoginInput): LoginResponse
    }
`;


module.exports = typeDefs