import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoutes() {
    const { user, isLogin } = useSelector((state) => state.login)
    
    return (
        isLogin && user ?<Outlet />  : <Navigate to="/auth" />
    )
}

export default PrivateRoutes