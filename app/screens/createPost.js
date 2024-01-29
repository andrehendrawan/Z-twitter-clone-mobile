import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CREATE_POST } from "../queries/createPost";
import { GET_POSTS } from "../queries/getPost";



export default function CreatePost() {
    const [content, setPostContent] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [tags, setTags] = useState('');
    const navigation = useNavigation()

    const [createPost, { loading, error, data }] = useMutation(CREATE_POST, {
        refetchQueries: [
            GET_POSTS
        ]
    })
    console.log(loading, error, data);
    const handleCreatePost = () => {
        if (!loading) {
            createPost({
                variables: {
                    createPostInput: { content, imgUrl, tags }
                }
            })
        }
    };

    useEffect(() => {
        if (!error && !loading && data) {
            navigation.goBack()
        }
    }, [loading, error, data])
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.buttonPosition}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleCreatePost} >
                        <Text style={styles.loginButtonText}>Create Post</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="What's on your mind?"
                    multiline
                    numberOfLines={4}
                    value={content}
                    onChangeText={(text) => setPostContent(text)}
                />
                <TextInput
                    style={styles.inputImgTags}
                    placeholder="Image URL"
                    value={imgUrl}
                    onChangeText={(text) => setImgUrl(text)}
                />
                <TextInput
                    style={styles.inputImgTags}
                    placeholder="Tags"
                    value={tags}
                    onChangeText={(text) => setTags(text)}
                />
            </SafeAreaView>
        </SafeAreaProvider>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 20,
    },
    input: {
        height: 150,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        fontSize: 16,
        borderRadius: 8
    },
    inputImgTags: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        fontSize: 16,
        borderRadius: 8
    },
    buttonPosition: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: "center", // Align items to the top
    },
    buttonContainer: {
        flex: 1, // Equal width for both buttons
        marginRight: 8, // Adjust spacing between buttons
        marginBottom: 12
    },
    loginButton: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
