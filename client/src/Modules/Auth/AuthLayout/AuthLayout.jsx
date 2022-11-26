import React from 'react'
import { Outlet, Link } from "react-router-dom"

import { Logo } from '../../../Components/SVG'

import "./auth.scss"

const AuthLayout = () => {
    return (
        <div className='auth_layout'>
            <div className='auth_overlay'></div>
            <Link className='back_home' to="/">
                <Logo />
            </Link>
            <div className='auth_form'>
                <div className="auth_user">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout