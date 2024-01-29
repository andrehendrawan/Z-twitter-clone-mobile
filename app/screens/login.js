import { useContext, useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { gql, useMutation } from '@apollo/client';
import { getValueFor, save } from '../helpers/secureStore';
import { useNavigation } from '@react-navigation/native';
import { LOGIN_USER } from '../queries/login';


export default function Login() {
    const authContext = useContext(AuthContext)
    const [login, { loading, error, data }] = useMutation(LOGIN_USER)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation()
    console.log(loading, error, data, '<<<<<<<');
    const handleLogin = () => {
        if (!loading) {
            login({
                variables: {
                    loginInput: { username, password }
                }
            })
        }
    };

    useEffect(() => {
        if (data && !error) {
            save('access_token', data.login.access_token)
            save('_id', data.login.userProfile._id.toString())
                .then(() => {
                    authContext.setIsSignedIn(true)
                });
        }
    }, [data])

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Image source={require('../assets/logoZ.png')} style={{ width: 60, height: 60, marginBottom: 20 }} />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin} >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerButton} onPress={() => {
                    navigation.navigate('Register')
                }}>
                    <Text style={styles.registerButtonText}>Don't have an account? Register</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>


    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        borderRadius: 10
    },
    button: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    registerButton: {
        padding: 10,
        alignItems: 'center',
        marginTop: 5,
    },
    registerButtonText: {
        color: 'black',
        fontSize: 14,
    },

});
