"use client"
import { changeTheme } from '@/redux/slice/theme'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckBoxACheck } from './checkBox'
import { Typography } from "@mui/material";
import Cookies from 'js-cookie'
const ThemeSwitch = () => {
    const theme = useSelector(state => state.theme)
    const [defaultTheme, setDefaultTheme] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const [systemTheme, setSystemTheme] = useState('')
    const dispatch = useDispatch()
    const handalToggleTheme = ({ target }) => {
        const { checked } = target
        if (!defaultTheme) {
            dispatch(changeTheme(checked ? 'dark' : 'light'))
            Cookies.set('theme', checked ? 'dark' : 'light')
        }
    }
    const HandalDefaultTheme = ({ target }) => {
        const { checked } = target
        if (checked) {
            const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            dispatch(changeTheme(prefersDarkMode ? 'dark' : 'light'))
        }
        setDefaultTheme(checked)
    }
    return (
        <>
            <div className='theme_switch'>
                <input id="switch" type="checkbox" readOnly={defaultTheme} onChange={handalToggleTheme} checked={theme == 'light' ? false : true} />
                <div className="app">
                    <div className="content">
                        <div className="circle">
                            <div className="crescent"></div>
                        </div>
                        <label for="switch">
                            <div className="toggle"></div>
                            <div className="names">
                                <p className="light">Light</p>
                                <p className="dark">Dark</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <label htmlFor="pwd" className="d-inline-flex align-items-center">
                    <CheckBoxACheck id={'pwd'} checked={defaultTheme} onChange={HandalDefaultTheme} />
                    <Typography sx={{ fontSize: 14, textAlign: 'center', padding: '0px 6px' }} color="text.secondary" >
                        Default System
                    </Typography>
                </label>
            </div>
        </>
    )
}

export default ThemeSwitch
