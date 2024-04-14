"use client"

import Cookies from "js-cookie"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_profile } from "@/redux/slice/profile"
import socket from "@/socket"
import { get_userList } from "@/redux/slice/user/userList"

export default function ChatLayout({ children }) {
    const profile = useSelector(state => state.profile)
    const userList = useSelector(state => state.user_list)
    const token = Cookies.get('_x_a_t')
    const dispatch = useDispatch()

    useEffect(() => {
        // user profile 
        if (!profile.status && !profile?.loading) {
            dispatch(get_profile({ token }))
        }
        // user list
        if (!userList?.status && !userList?.loading) {
            dispatch(get_userList({ token }))
        }
    }, [profile, userList])
    return children
}