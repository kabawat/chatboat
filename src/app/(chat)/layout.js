"use client"

import Cookies from "js-cookie"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_profile } from "@/redux/slice/profile"
import { get_userList } from "@/redux/slice/user/userList"

export default function ChatLayout({ children }) {
    const profile = useSelector(state => state.profile)
    const { socket } = useSelector(state => state.socket)
    const userList = useSelector(state => state.user_list)
    const token = Cookies.get('_x_a_t')
    const dispatch = useDispatch()
    console.log("socket::::::::::::", socket.id)
    useEffect(() => {
        // user profile 
        if (!profile.status && !profile?.loading) {
            dispatch(get_profile({ token: token })).then(saved => {
                const { data } = saved?.payload
                console.log("socket ========> : ", socket.id)
                console.log("data ========> : ", data)
                socket.emit('login', {
                    username: data?.username,
                    _id: data?._id
                })
            })
        }
        // user list
        if (!userList?.status && !userList?.loading) {
            dispatch(get_userList({ token }))
        }
    }, [profile, userList])
    return children
}