const { connectDb } = require('../config/mongodb')
const { ObjectId } = require('mongodb')

class Follow {
    static async followUser(input) {
        input.followingId = new ObjectId(input.followingId)
        input.followerId = new ObjectId(input.followerId)
        const newFollow = await connectDb().collection('Follows').insertOne(input)
        return newFollow
    }

    static async profileFollowUser(userLogin) {
        const followingAgg = [
            {
                '$match': {
                    'followerId': new ObjectId(userLogin.userId)
                }
            }, {
                '$lookup': {
                    'from': 'Users',
                    'localField': 'followingId',
                    'foreignField': '_id',
                    'as': 'userInfo'
                }
            }, {
                '$unwind': {
                    'path': '$userInfo',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'userInfo.password': 0
                }
            }
        ];
        const followerAgg = [
            {
                '$match': {
                    'followerId': new ObjectId(userLogin.userId)
                }
            }, {
                '$lookup': {
                    'from': 'Users',
                    'localField': 'followerId',
                    'foreignField': '_id',
                    'as': 'userInfo'
                }
            }, {
                '$unwind': {
                    'path': '$userInfo',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'userInfo.password': 0
                }
            }
        ];

        let following = await connectDb().collection('Follows').aggregate(followingAgg).toArray()
        let follower = await connectDb().collection('Follows').aggregate(followerAgg).toArray()
        console.log(userLogin, '<<<<<<<');
        let result = {
            idUserLogin: new ObjectId(userLogin.userId),
            usernameUserLogin: userLogin.username,
            emailUserLogin: userLogin.email,
            nameUserLogin: userLogin.name,
            following: following,
            follower: follower
        }
        return result
    }
}


module.exports = Follow
