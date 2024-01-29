import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import SearchUser from '../screens/searchUser';
import CreatePost from '../screens/createPost';
import UserProfile from '../screens/userProfile';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import MainStack from './mainStack';
import { Image } from 'react-native';


const Tab = createBottomTabNavigator();

export default function MainBottomTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Feeds"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" size={size} color={color} />
                    ),
                    tabBarShowLabel: false,
                    headerTitle: () => (
                        <Image
                            source={require('../assets/logoZ.png')}
                            style={{ width: 25, height: 25, marginBottom: 10 }}
                        />
                    ),
                }}
            />
            <Tab.Screen name="Search" component={SearchUser} options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="search" size={size} color={color} />
                ),
                tabBarShowLabel: false
            }} />
            <Tab.Screen name="New Post" component={CreatePost} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="create" size={size} color={color} />
                ),
                tabBarShowLabel: false
            }} />
            <Tab.Screen name="Profile" component={UserProfile} options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="user" size={size} color={color} />
                ),
                tabBarShowLabel: false
            }} />
        </Tab.Navigator>
    )
}