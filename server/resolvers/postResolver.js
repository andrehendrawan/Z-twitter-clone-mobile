const Post = require("../models/post");

const resolvers = {
    Query: {
        getPosts: async (_, __, contextValue) => {
            const user = contextValue.auth()
            console.log(user, '<<<<<<');
            const posts = await Post.getAllPosts();
            return posts;
        },
        getPostbyId: async (_, args, contextValue) => {
            console.log(args);
            const getPostbyId = await Post.getPostbyId(args.id)
            return getPostbyId;
        }
    },
    Mutation: {
        createPost: async (_, args, contextValue) => {
            console.log(args);
            const user = contextValue.auth()
            if (!user) {
                throw new Error('Authorization Failed')
            }
            const createdPost = {
                content: args.createPostInput.content,
                tags: args.createPostInput.tags,
                imgUrl: args.createPostInput.imgUrl,
                authorId: user.userId,
                comments: args.createPostInput.comments,
                likes: args.createPostInput.likes,
                createdAt: args.createPostInput.createdAt,
                updatedAt: args.createPostInput.updatedAt,
            };
            const result = await Post.createPost(createdPost)
            console.log(result);
            return createdPost;
        },

        commentPost: async (_, args, contextValue) => {
            console.log(args);
            const user = contextValue.auth()
            if (!user) {
                throw new Error('Authorization Failed')
            }
            const postId = args.commentPostInput.postId
            const inputComment = {
                content: args.commentPostInput.content,
                username: user.username,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const commentedPost = await Post.commentPost(inputComment, postId)
            return inputComment
        },

        likePost: async (_, args, contextValue) => {
            console.log(args);
            const user = contextValue.auth()
            if (!user) {
                throw new Error('Authorization Failed')
            }
            const postId = args.likePostInput.postId
            const inputLike = {
                username: user.username,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const likedPost = await Post.likePost(inputLike, postId)
            return inputLike
        }
    }
};

module.exports = resolvers
