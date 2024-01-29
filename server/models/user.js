const { ObjectId } = require('mongodb')
const { connectDb } = require('../config/mongodb')
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require('../helpers/jwt');
const jwt = require('jsonwebtoken');



class User {
    static async register(user) {
        user.password = hashPassword(user.password)
        if (user.username.length < 5) {
            throw new Error('Username must be at least 5 characters long');
        }

        const existingUser = await connectDb().collection('Users').findOne({ username: user.username });
        if (existingUser) {
            throw new Error('Username is already taken');
        }

        const registeredUser = await connectDb().collection('Users').insertOne(user)
        return {
            ...user,
            _id: registeredUser.insertedId
        }
    }

    static async login(loginInput) {
        const { username, password } = loginInput
        const user = await connectDb().collection('Users').findOne({
            username
        })
        if (!user) {
            throw new Error('Failed to log in, User Not Exist')
        }

        const checkPassword = comparePassword(password, user.password)
        if (!checkPassword) {
            throw new Error('Invalid Email/Password')
        }
        const access_token = jwt.sign({ username, userId: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET)
        console.log(access_token);
        return {
            access_token,
            userProfile: user
        }
    }

    static async getAllUser() {
        const users = await connectDb().collection('Users').find().toArray()
        return users
    }

    static async getUserbyId(id) {
        const user = await connectDb().collection('Users').findOne({
            _id: new ObjectId(id),
        })
        return user
    }

    static async searchUsers(searchQuery) {
        const users = await connectDb().collection('Users').find(
            {
                username: { $regex: new RegExp(searchQuery, 'i') }
            }
        ).toArray();

        return users
    }
}

module.exports = User