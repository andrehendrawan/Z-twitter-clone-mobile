import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FollowerList({ route }) {
    const followers = route.params.followers;
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>All Followers</Text>
            <FlatList
                data={followers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.followerItem}>
                        <Image
                            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn7NjCM1P84ZsdEY6nNRFFF8mcs0Fsw6nFEw&usqp=CAU" }}
                            style={styles.followerImage}
                        />
                        <View>
                            <Text style={styles.followerUsername}>{item.userInfo.username}</Text>
                            <Text style={styles.followerName}>{item.userInfo.name}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => console.log('remove')}
                        >
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        marginLeft: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    followerItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        width: "100%",
        justifyContent: "space-between",
    },
    followerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    followerUsername: {
        fontSize: 16,
        fontWeight: "bold",
    },
    followerName: {
        fontSize: 14,
        color: "gray",
    },
    removeButton: {
        backgroundColor: "red",
        borderRadius: 5,
        padding: 8,
        marginRight: 20,
    },
    removeButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
});