import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { deleteStore, getValueFor } from "../helpers/secureStore";
import { USER_PROFILE } from "../queries/userProfile";
import { useMutation, useQuery } from "@apollo/client";
import { SEARCH_USER } from "../queries/search";
import { FOLLOW_USER } from "../queries/followUser";
import { GET_POSTS } from "../queries/getPost";

export default function UserProfile({ route, navigation }) {

    const authContext = useContext(AuthContext)
    const { loading, error, data } = useQuery(USER_PROFILE);
    console.log(data, '<<<<<<<<');

    const followersCount = data?.profileFollowUserLogin.follower?.length || 0;
    const followingsCount = data?.profileFollowUserLogin.following?.length || 0;


    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const { loading: searchLoading, error: searchError, data: dataSearched } = useQuery(SEARCH_USER, {
        variables: { searchQuery: searchQuery },
    });

    const handleSearch = () => {
        if (dataSearched) {
            console.log(dataSearched, '<<<<<');
            const filteredResults = dataSearched.searchUsers.filter(user =>
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setSearchResults(filteredResults);
        }
    };

    const [followUser, { loading: followLoading, error: followError, data: followData }] = useMutation(FOLLOW_USER, {
        refetchQueries: [
            USER_PROFILE
        ]
    })
    const handleFollow = (userId) => {
        if (!followLoading) {
            followUser({
                variables: {
                    followUserInput: { followingId: userId }
                }
            })
        }
        console.log(followLoading, followError, followData);
        console.log(`Follow user with ID: ${userId}`);
    };
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: "https://images.footballtransfers.com/?url=https://static.footballtransfers.com/resources/players/59349.png&h=200" }}
                style={styles.profileImage}
            />
            <Text style={styles.name}>{data?.profileFollowUserLogin.nameUserLogin}</Text>
            <Text style={styles.username}>@{data?.profileFollowUserLogin.usernameUserLogin}</Text>
            <Text style={styles.email}>{data?.profileFollowUserLogin.emailUserLogin}</Text>
            <View style={styles.followContainer}>
                <Button
                    title={`Followers: ${followersCount}`}
                    onPress={() => {
                        navigation.navigate("FollowersList", {
                            followers: data?.profileFollowUserLogin.follower || [],
                        });
                    }}
                />
                <Button
                    title={`Followings: ${followingsCount}`}
                    onPress={() => {
                        navigation.navigate("FollowingList", {
                            following: data?.profileFollowUserLogin.following || [],
                        });
                    }}
                />
            </View>

            {/* Search user */}

            <Text style={styles.sectionTitle}>Search User</Text>
            <TextInput
                style={styles.input}
                placeholder="Search users"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
                onSubmitEditing={handleSearch}
            />

            {searchLoading && <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
                <ActivityIndicator size="large" color="blue" />
            </View>
            }
            {searchError && <Text>Error: {error.message}</Text>}

            <FlatList
                data={searchResults}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => console.log('Navigate to follower profile')}>
                        <View style={styles.followerItem}>
                            <Image
                                source={{ uri: "https://awsimages.detik.net.id/visual/2021/05/10/han-so-hee_169.jpeg?w=480&q=90" }}
                                style={styles.followerImage}
                            />
                            <Text style={styles.followerName}>{item.username}</Text>
                            {console.log(item)}
                            <TouchableOpacity
                                style={styles.followButton}
                                onPress={() => handleFollow(item._id)}
                            >
                                <Text style={styles.followButtonText}>Follow</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                )}
            />

            <TouchableOpacity style={styles.logoutButton} onPress={() => {
                deleteStore('access_token')
                authContext.setIsSignedIn(false)
            }}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        marginTop: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    username: {
        fontSize: 18,
        color: 'gray',
    },
    email: {
        fontSize: 16,
        color: 'gray',
    },
    followContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75, // half of the width and height to make it a circle
        marginBottom: 20,
    },
    followerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        width: "100%", // Set the width to 80% of the container
        alignSelf: 'center', // Center the item horizontally,
    },
    followerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    followerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        width: "80%",
        borderRadius: 10
    },
    resultItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 8,
        width: "80%"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    followButton: {
        backgroundColor: 'blue',
        borderRadius: 5,
        padding: 8,
        marginLeft: 'auto',
    },
    followButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});