import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
export const AuthContext= createContext(null);
const auth= getAuth(app);
const AuthProviders = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(false);
    const provider = new GoogleAuthProvider();
    const createUser=(email,password)=>{
        setLoading(false);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const updateNamePhoto = async (displayName, photoURL) => {
        try {
            await updateProfile(auth.currentUser, { displayName, photoURL });
            setUser(auth.currentUser);
            return auth.currentUser;
        } catch (error) {
            console.log(error);
        }
    };
    const login=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logout=()=>{
        setLoading(true);
        return signOut(auth);
    }
    const googleSign=()=>{
        setLoading(true);
        return signInWithPopup(auth, provider);

    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (CurrentUser) => {
            setUser(CurrentUser);
            setLoading(false);
        });
        return ()=>{
            return unsubscribe();
        }
    
    })
    const AuthInfo={
        createUser,
        user,
        loading,
        logout,
        login,
        updateNamePhoto,
        googleSign
    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;