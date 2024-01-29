import { ActivityIndicator, Button, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CardFeeds from "../components/cardFeeds";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from "../queries/getPost";
import { useState } from "react";



export default function Home({ navigation }) {
    const { loading, error, data, refetch } = useQuery(GET_POSTS)
    console.log(loading, error, data);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await refetch();
        } catch (error) {
            console.error('Error while refreshing:', error.message);
        } finally {
            setRefreshing(false);
        }
    };


    if (error) {
        return (
            <Text>An Error Occured</Text>
        )
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {
                    loading &&
                    <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
                        <ActivityIndicator size="large" color="blue" />
                    </View>
                }
                {
                    !loading &&
                    <FlatList
                        data={data.getPosts}
                        renderItem={({ item }) => {
                            return (
                                <CardFeeds item={item} />
                            )
                        }}
                        keyExtractor={(element) => element._id}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    />
                }
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        flex: 1
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