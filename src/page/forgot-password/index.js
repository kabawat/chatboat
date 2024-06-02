"use client"
import React, { useState } from 'react'
import SendOtpSection from './Email'
import ChangePassword from './password'

const ForgotPasswordPage = () => {
    const [change, setChange] = useState(false)
    return change ? <ChangePassword /> : <SendOtpSection setChange={setChange} />
}

export default ForgotPasswordPage
