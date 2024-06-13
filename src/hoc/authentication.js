import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuthStore from '../store/useAuthStore';

export const withAuthentication = (Component) => (props) => {
    const { isLoggedIn } = useAuthStore();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return <Component {...props} />;
};

export const withoutAuthentication = (Component) => (props) => {
    const { isLoggedIn } = useAuthStore();

    if (isLoggedIn) {
        const redirectPath = props.location.state?.from?.pathname || '/home';
        return <Navigate to={redirectPath} />;
    }

    return <Component {...props} />;
};
