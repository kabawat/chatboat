"use client"
import React, { useEffect } from 'react'
import theme from '../theme';
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from '@/redux';
import { changeTheme } from '@/redux/slice/theme';
import Cookies from 'js-cookie';
const App = ({ children }) => {
    return (
        <Provider store={store}>
            <Main children={children} />
        </Provider>
    )
}
export default App

function Main({ children }) {
    const theme_switch = Cookies.get('theme')
    const th = useSelector(state => state.theme)
    const profile = useSelector(state => state.profile)
    const { socket } = useSelector(state => state.socket)
    const dispatch = useDispatch()
    useEffect(() => {
        function onConnect() {
            if (profile?.status) {
                socket.emit('login', {
                    username: profile?.data?.username,
                    _id: profile?.data?._id
                })
            }
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
    }, []);
    useEffect(() => {
        if (theme_switch == 'default') {
            const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            dispatch(changeTheme(prefersDarkMode ? 'dark' : 'light'))
        } else {
            dispatch(changeTheme(theme_switch ? theme_switch : 'light'))
        }
    }, [theme_switch])
    return (
        <div className="main">
            {children}
        </div>
    )
}
