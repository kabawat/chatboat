"use client"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_profile } from "@/redux/slice/profile"
import { get_userList } from "@/redux/slice/user/userList"

export default function ChatLayout({ children }) {
    const userList = useSelector(state => state.user_list)
    const { socket } = useSelector(state => state.socket)
    const profile = useSelector(state => state.profile)
    
    const token = Cookies.get('_x_a_t')
    const dispatch = useDispatch()
    useEffect(() => {
        // user profile 
        if (!profile.status && !profile?.loading && socket.id) {
            dispatch(get_profile({ token: token })).then(saved => {
                const { data } = saved?.payload
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
    }, [profile, userList, socket.id])
    return children
}