"use client"
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React from 'react'

const Auth = ({ children }) => {
    const router = useRouter()
    const token = Cookies.get('token')
    if (!token) {
        router.push('/login')
    } else {
        return <section>{children}</section>
    }
}

export default Auth