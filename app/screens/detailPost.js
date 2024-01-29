import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_POST } from "../queries/likePost";
import { GET_POSTS } from "../queries/getPost";
import { FontAwesome } from '@expo/vector-icons';
import { COMMENT_POST } from "../queries/commentPost";
import { formatUnixTimestamp } from "../helpers/formattedDate";

export default function DetailPost({ route, navigation }) {
    const { post } = route.params

    console.log(post);

    const countLikes = post.likes ? post.likes.length : 0;
    const countComments = post.comments ? post.comments.length : 0;

    const [isLiked, setIsLiked] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [commentText, setCommentText] = useState('');

    //Modal for comments
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [commentPost, { loading: commentLoading, error: commentError, data: commentData }] = useMutation(COMMENT_POST, {
        refetchQueries: [
            GET_POSTS
        ]
    });

    const { data: postsData, refetch: refetchPosts } = useQuery(GET_POSTS);

    const handleCommentSubmit = async () => {
        try {
            if (!commentLoading) {
                await commentPost({
                    variables: {
                        commentPostInput: {
                            postId: post._id,
                            content: commentText
                        }
                    }
                });
                refetchPosts();
                toggleModal();
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };


    const [likePost, { loading: likeLoading, error: likeError, data: likeData }] = useMutation(LIKE_POST, {
        refetchQueries: [
            GET_POSTS
        ]
    });

    const handleLike = () => {
        if (!likeLoading) {
            likePost({
                variables: {
                    likePostInput: {
                        postId: post._id,
                        username: ""
                    },
                }
            });
            setIsLiked(!isLiked);
        }
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: "https://placekitten.com/50/50" }} // Placeholder image
                        style={styles.profileImage}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.userName}>{post.author.username}</Text>
                        <Text style={styles.postTime}>{formatUnixTimestamp(post.createdAt)}</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.postContent}>{post.content}</Text>

                    <Text style={styles.tags}>{post.tags.join(', ')}</Text>

                    <Image source={{ uri: post.imgUrl }} style={styles.image} />

                    <View style={styles.likeCommentContainer}>
                        <TouchableOpacity onPress={handleLike}>
                            <Text style={[styles.likeCommentText, { color: 'black' }]}>
                                {countLikes} <FontAwesome name={isLiked ? 'heart' : 'heart-o'} size={14} color={isLiked ? "red" : "black"} />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={styles.likeCommentText}>{countComments} Comments</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={toggleModal}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.commentInput}
                                    placeholder="Write a comment..."
                                    multiline
                                    numberOfLines={4}
                                    value={commentText}
                                    onChangeText={(text) => setCommentText(text)}
                                />
                                <TouchableOpacity style={styles.postButton} onPress={handleCommentSubmit}>
                                    <Text style={styles.postButtonText}>Post</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Text style={styles.sectionTitle}>Comments</Text>
                    <FlatList
                        data={post.comments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <>
                                <View style={styles.userInfo}>
                                    <Image
                                        source={{ uri: "https://m.media-amazon.com/images/M/MV5BNzg1NWE2NzAtNDY2Yi00NWUwLWJlMWYtZWZhYjRmMGYwZDIzXkEyXkFqcGdeQXVyMTI1OTY3MzM3._V1_.jpg" }} // Placeholder image
                                        style={styles.profileImage}
                                    />
                                    <View style={styles.commentContainer}>
                                        <Text style={styles.userNameComment}>{post.author.username}</Text>
                                        <Text style={styles.commentText}> {item.content}</Text>
                                        <Text style={styles.postTimeComment}>{formatUnixTimestamp(post.createdAt)}</Text>
                                    </View>
                                </View>
                            </>
                        )}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 6,
    },
    postContent: {
        fontSize: 18,
        marginBottom: 16,
    },
    tags: {
        color: '#777',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    likeCommentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    likeCommentText: {
        color: '#555',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    commentContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 8,
        width: "85%"
    },
    commentText: {
        fontSize: 14,
        paddingVertical: 5
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: "column",
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    userNameComment: {
        fontSize: 14,
        fontWeight: "bold",
    },
    postTime: {
        color: "#777",
    },
    postTimeComment: {
        color: "#777",
        fontSize: 12,
        textAlign: "right"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    commentInput: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        borderRadius: 10,
        width: '100%',
    },
    postButton: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        width: '100%',
    },
    postButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
