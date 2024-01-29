import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { REGISTER_USER } from '../queries/register';


export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const navigation = useNavigation()
    const [register, { loading, error, data }] = useMutation(REGISTER_USER)



    console.log(loading, error, data);
    const handleRegister = () => {
        // You can implement registration logic here
        if (!loading) {
            register({
                variables: {
                    register: { email, password, username, name }
                }
            })
        }
        navigation.navigate('Login')
    };
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Image source={require('../assets/logoZ.png')} style={{ width: 60, height: 60, marginBottom: 20 }} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister} >
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={() => {
                    navigation.navigate('Login')
                }}>
                    <Text style={styles.loginButtonText}>Already have an account? Login</Text>
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
        borderRadius: 10,
    },
    registerButton: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    registerButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    loginButton: {
        padding: 10,
        alignItems: 'center',
        marginTop: 5,
    },
    loginButtonText: {
        color: 'black',
        fontSize: 14,
    },
});