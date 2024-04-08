"use client"
import React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Provider } from 'react-redux'
import store from '@/redux';
const App = ({ children }) => {
    return (
        <Provider store={store}>
            <AppRouterCacheProvider options={{ key: 'css' }}>
                <ThemeProvider theme={theme}>
                    <div className="main">
                        {children}
                    </div>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </Provider>
    )
}

export default App
