"use client"
import Navigate from '@/components/aside/navigate'
import React, { useState } from 'react'
const StoryPage = () => {
    const [isDarkMode, setDarkMode] = useState(false)
    return (
        <div className={`chat_containner ${isDarkMode ? 'dark_mode' : ''}`}>
            <div id='aside'>
                <div className="aside">

                </div>

                {/* aside navigate  */}
                <Navigate />
            </div>
            <main>

            </main>
        </div>
    )
}

export default StoryPage
