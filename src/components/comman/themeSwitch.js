"use client"
import { changeTheme } from '@/redux/slice/theme'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckBoxACheck } from './checkBox'
import { Typography } from "@mui/material";
const ThemeSwitch = () => {
    const theme = useSelector(state => state.theme)
    const [defaultTheme, setDefaultTheme] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const dispatch = useDispatch()
    const handalToggleTheme = ({ target }) => {
        const { checked } = target
        if (!defaultTheme) {
            dispatch(changeTheme(checked ? 'dark' : 'light'))
        }
    }
    const HandalDefaultTheme = ({ target }) => {
        const { checked } = target
        if (checked) {
            const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            dispatch(changeTheme('default'))
        }
        setDefaultTheme(checked)
    }
    return (
        <>
            <div className='theme_switch'>
                <input id="switch" type="checkbox" readOnly={defaultTheme} onChange={handalToggleTheme} checked={theme == 'light' ? false : true} />
                <div class="app">
                    <div class="content">
                        <div class="circle">
                            <div class="crescent"></div>
                        </div>
                        <label for="switch">
                            <div class="toggle"></div>
                            <div class="names">
                                <p class="light">Light</p>
                                <p class="dark">Dark</p>
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
