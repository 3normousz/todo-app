import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './authContext'

export default function PrivateRoutes({ component: Component, ...rest }) {
    const { currentUser } = useAuth();

    return (
        currentUser ? <Outlet /> : <Navigate to='/' />
    )
}
