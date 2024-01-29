import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import DetailPost from '../screens/detailPost';
import Login from '../screens/login';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import MainBottomTab from './mainBottomTab';
import { getValueFor } from '../helpers/secureStore';
import Register from '../screens/register';
import UserProfile from '../screens/userProfile';
import FollowerList from '../screens/followerList';
import FollowingList from '../screens/followingList';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        getValueFor('access_token')
            .then(result => {
                // console.log(result, '<<<');
                if (result) {
                    authContext.setIsSignedIn(true)
                }
            })
    }, [])

    return (
        <Stack.Navigator>
            {
                authContext.isSignedIn ? <>
                    <Stack.Screen name="Home" component={MainBottomTab} options={{ headerShown: false }} />
                    <Stack.Screen name="Details" component={DetailPost} options={{ headerShown: false }} />
                    <Stack.Screen name="User" component={UserProfile} options={{ headerShown: false }} />
                    <Stack.Screen name="FollowersList" component={FollowerList} options={{ headerShown: false }} />
                    <Stack.Screen name="FollowingList" component={FollowingList} options={{ headerShown: false }} />
                </> : <>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                </>
            }
        </Stack.Navigator>
    )
}