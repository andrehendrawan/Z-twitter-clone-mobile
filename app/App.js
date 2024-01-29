import CreatePost from './screens/createPost';
import Login from './screens/login';
import Register from './screens/register';
import { View } from 'react-native';
import SearchUser from './screens/searchUser';
import UserProfile from './screens/userProfile';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './navigations/mainStack';
import MainBottomTab from './navigations/mainBottomTab';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './context/AuthContext';
import client from './config/apolloClient';
import { ApolloProvider, gql } from '@apollo/client';

export default function App() {

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            {/* <MainBottomTab /> */}
            <MainStack />
          </SafeAreaProvider>
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
    // <Login />
    // <Register />
    // <Home />
    // <CreatePost />
    // <DetailPost />
    // <SearchUser />
    // <UserProfile />
  );
}