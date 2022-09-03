import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../page/login/Login';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// receives component and any other props represented by ...rest
export const ProtectedRoutes = ({ children }) => {
    const location = useLocation();
    const pathname = location.pathname;
    const token = cookies.get('TOKEN');
    if (!token) {
        alert('You must login');
        // user is not authenticated
        return <Login prePath={pathname} />;
    }
    return children;
};
