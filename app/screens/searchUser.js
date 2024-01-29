import { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { SEARCH_USER } from "../queries/search";
import { useQuery } from "@apollo/client";

export default function SearchUser({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const { loading, error, data } = useQuery(SEARCH_USER, {
        variables: { searchQuery: searchQuery },
    });

    const handleSearch = () => {
        if (data) {
            const filteredResults = data.searchUsers.filter(user =>
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setSearchResults(filteredResults);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search users"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
                onSubmitEditing={handleSearch}
            />

            {loading && <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
                <ActivityIndicator size="large" color="blue" />
            </View>
            }
            {error && <Text>Error: {error.message}</Text>}

            <FlatList
                data={searchResults}
                keyExtractor={item => item._id} // assuming your user object has an `_id` property
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ProfileSearch', { userProfile: data })
                    }}>
                        <View style={styles.resultItem}>
                            <Text>{item.username}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
    resultItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 8,
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
});