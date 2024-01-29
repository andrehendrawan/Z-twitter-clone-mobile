const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

const signToken = (user) => {
    const { username, userId } = user
    return jwt.sign({ username, userId: user._id }, JWT_SECRET)
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    signToken,
    verifyToken
}