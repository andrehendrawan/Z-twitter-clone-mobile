const { ObjectId } = require('mongodb')
const { connectDb } = require('../config/mongodb')
const redis = require('../config/redis')

class Post {
    static async createPost(post) {
        post.authorId = new ObjectId(post.authorId)
        post.createdAt = new Date()
        post.updatedAt = new Date()
        post.comments = []
        post.likes = []
        const createdPost = await connectDb().collection('Posts').insertOne(post)
        //delete cache
        // await redis.del('posts')
        return createdPost
    }

    static async getAllPosts() {

        const agg = [
            {
                '$lookup': {
                    'from': 'Users',
                    'localField': 'authorId',
                    'foreignField': '_id',
                    'as': 'author'
                }
            }, {
                '$unwind': {
                    'path': '$author',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$sort': {
                    'createdAt': -1
                }
            }
        ];

        const posts = await connectDb().collection('Posts').aggregate(agg).toArray()
        // const postsCache = await redis.get("posts")
        console.log(posts);

        // if (postsCache) {
        //     const postsParse = JSON.parse(postsCache)
        //     return postsParse
        // } else {
        //     await redis.set("posts", JSON.stringify(posts));
        return posts
        // }
    }

    static async getPostbyId(id) {
        const agg = [
            {
                '$match': {
                    '_id': new ObjectId(id)
                }
            }, {
                '$lookup': {
                    'from': 'Users',
                    'localField': 'authorId',
                    'foreignField': '_id',
                    'as': 'author'
                }
            }, {
                '$unwind': {
                    'path': '$author',
                    'preserveNullAndEmptyArrays': true
                }
            }
        ];

        const post = await connectDb().collection('Posts').aggregate(agg).toArray()
        return post[0];
    }

    static async commentPost(input, postId) {
        try {
            const newComment = await connectDb().collection('Posts').updateOne(
                { _id: new ObjectId(postId) },
                { $push: { comments: input } }
            )
            await redis.del('posts')

            return newComment
        } catch (error) {
            console.log(error);
        }
    }

    static async likePost(input, postId) {
        try {
            const post = await connectDb().collection('Posts').findOne({ _id: new ObjectId(postId) });

            if (!post) {
                throw new Error('Post not found');
            }

            // Check if the user has already liked the post
            const userHasLiked = post.likes.some((like) => like.username === input.username);

            if (userHasLiked) {
                throw new Error('User has already liked this post');
            }
            const newLike = await connectDb().collection('Posts').updateOne(
                { _id: new ObjectId(postId) },
                { $push: { likes: input } }
            )
            await redis.del('posts')

            return newLike
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Post