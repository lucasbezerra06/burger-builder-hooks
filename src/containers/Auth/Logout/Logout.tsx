import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';

const Logout = () => {
    const authLogout = useAuthStore((state) => state.authLogout);

    useEffect(() => {
        authLogout();
    }, [authLogout]);

    return <Redirect to="/" />
}

export default Logout;