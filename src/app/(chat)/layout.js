"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_profile } from "@/redux/slice/profile"
import { get_userList } from "@/redux/slice/user/userList"
import SECRETS from "@/configs/env.configs"

const SocketContext = createContext(null)

import Cookies from "js-cookie"
import io from 'socket.io-client'

const environment = SECRETS.ENVIRONMENT
const fetchBaseURL = () => {
    if (environment == "development") {
        return SECRETS.LOCAL_SOCKET_URL
    }
    if (environment == "production") {
        return SECRETS.PRODUCTION_SOCKET_URL
    }
}

export default function ChatLayout({ children }) {
    const userList = useSelector(state => state.user_list)
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()

    const [socketIO, setSocketIO] = useState(null)
    useEffect(() => {
        const token = Cookies.get('_x_s_t')
        const query = `token=${token}`
        const baseURL = fetchBaseURL()
        const socket = io(baseURL, { query });
        setSocketIO(socket)
        function onConnect() {
            socket.on('token', res_token => {
                Cookies.set('_x_s_t', res_token, { expires: 30 })
            })
        }

        function onDisconnect() {
            console.log(socket.id)
        }
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, [])

    useEffect(() => {
        // user profile 
        if (!profile.status && !profile?.loading && socketIO) {
            dispatch(get_profile()).then(saved => {
                const { data } = saved?.payload
                socketIO.emit('login', {
                    username: data?.username,
                    _id: data?._id
                })
            })
        }
        // user list
        if (!userList?.status && !userList?.loading) {
            dispatch(get_userList({}))
        }
    }, [profile, userList, socketIO])
    if (socketIO && profile) {
        return (
            <SocketContext.Provider value={socketIO}>
                {children}
            </SocketContext.Provider>
        )
    } else {
        return (
            <div className="loading_page">
                <div className="d-flex flex-column justify-content-center align-items-center inner_page">
                    <div className="circal">
                        <div className="spinner-border text-primary" role="status"></div>
                        <div className="ps-2 mt-2">Loading...</div>
                    </div>
                </div>
            </div>
        )
    }
}


// export context API 
export function useSocket() {
    return useContext(SocketContext)
}