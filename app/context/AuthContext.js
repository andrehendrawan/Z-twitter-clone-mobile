import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export default function AuthProvider(props) {
    const [isSignedIn, setIsSignedIn] = useState(false)

    return <AuthContext.Provider value={{
        isSignedIn, setIsSignedIn
    }}>
        {
            props.children
        }

    </AuthContext.Provider>
}