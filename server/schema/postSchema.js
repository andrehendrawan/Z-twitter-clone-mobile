const typeDefs = `#graphql
type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: String
    comments: [Comments]
    likes: [Likes]
    createdAt: String
    updatedAt: String
    author: Author
}

type Author {
    _id: ID
    name: String
    username: String
    email: String
}

type Comments {
    content: String
    username: String
    createdAt: String
    updatedAt: String
}

type Likes {
    username: String
    createdAt: String
    updatedAt: String
}

input PostInput {
    content: String!
    tags: [String]
    imgUrl: String
    authorId: String
    comments: [CommentInput]
    likes: [LikeInput]
    createdAt: String
    updatedAt: String
}

input CommentInput {
    postId: ID!
    content: String!
    username: String
    createdAt: String
    updatedAt: String
}

input LikeInput {
    postId: ID
    username: String!
    createdAt: String
    updatedAt: String
}

type Query {
    getPosts: [Post]
    getPostbyId(id: ID!): Post
}

type Mutation {
    createPost(createPostInput: PostInput): Post
    commentPost(commentPostInput: CommentInput): Comments
    likePost(likePostInput: LikeInput): Likes
}
`;


module.exports = typeDefs