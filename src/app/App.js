"use client"
import React, { useEffect } from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
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
    const dispatch = useDispatch()
    useEffect(() => {
        if (theme_switch == 'default') {
            const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            dispatch(changeTheme(prefersDarkMode ? 'dark' : 'light'))
        } else {
            dispatch(changeTheme(theme_switch ? theme_switch : 'light'))
        }
    }, [])
    return (
        <AppRouterCacheProvider options={{ key: 'css' }}>
            <ThemeProvider theme={theme}>
                <div className="main">
                    {children}
                </div>
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}
