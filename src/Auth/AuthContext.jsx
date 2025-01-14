import React, { createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../State/Auth/Action';

const initialState = {
    isAuthenticated: localStorage.getItem('jwt') ? true : false,
};
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated);


    const register = () => {
        setIsAuthenticated(true);
    }

    const login = (jwt) => {
        setIsAuthenticated(true);
        localStorage.setItem('jwt', jwt);
        navigate("/");
        console.log("User logged in");
    };
    const logout = () => {
        console.log("logout click");
        if (document.documentElement.classList.contains('dark'))
            document.documentElement.classList.remove('dark');
        setIsAuthenticated(false);
        localStorage.clear();
        dispatch(logoutUser());
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
