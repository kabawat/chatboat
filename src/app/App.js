"use client"
import React, { useEffect } from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from '@/redux';
import { changeTheme } from '@/redux/slice/theme';
const App = ({ children }) => {
    return (
        <Provider store={store}>
            <Main children={children} />
        </Provider>
    )
}

export default App

function Main({ children }) {
    const th = useSelector(state => state.theme)
    const dispatch = useDispatch()
    useEffect(() => {
        const theme = localStorage.getItem('theme')
        dispatch(changeTheme(theme))
    }, [th])
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
