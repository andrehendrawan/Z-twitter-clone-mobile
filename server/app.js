if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone');
const userTypeDefs = require('./schema/userSchema')
const postTypeDefs = require('./schema/postSchema')
const followTypeDefs = require('./schema/followSchema')
const userResolver = require('./resolvers/userResolver');
const postResolver = require('./resolvers/postResolver');
const followResolver = require('./resolvers/followResolver');
const { connect } = require('./config/mongodb');
const jwt = require('jsonwebtoken');

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
    resolvers: [userResolver, postResolver, followResolver],
    introspection: true
});

connect().
    then((database) => {
        console.log('connect to mongodb');
        return startStandaloneServer(server, {
            context: async ({ req, res }) => {
                return {
                    auth: () => {
                        console.log(req.headers.authorization);
                        const access_token = req.headers.authorization.split(" ")[1]
                        const decodedToken = jwt.verify(access_token, process.env.JWT_SECRET)
                        console.log(decodedToken);
                        return decodedToken
                    }
                }
            },
            listen: { port: process.env.PORT || 3000 },
        })
    }).then(({ url }) => {
        console.log(`🚀  Server ready at: ${url}`);
    })
    .catch(error => console.log(error))



