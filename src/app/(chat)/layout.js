"use client"

import Cookies from "js-cookie"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_profile } from "@/redux/slice/profile"

export default function ChatLayout({ children }) {
    const profile = useSelector(state => state.profile)
    const token = Cookies.get('_x_a_t')
    const dispatch = useDispatch()
    useEffect(() => {
        if (!profile.status) {
            dispatch(get_profile({ token }))
        }

    }, [profile])
    return children
}