"use client"
import Navigate from '@/components/aside/navigate'
import React, { useState } from 'react'
const StoryPage = () => {
    const [isDarkMode, setDarkMode] = useState(false)
    return (
        <div className={`chat_containner ${isDarkMode ? 'dark_mode' : ''}`}>
            <aside>
                <div className="aside">

                </div>

                {/* aside navigate  */}
                <Navigate />
            </aside>
            <main>

            </main>
        </div>
    )
}

export default StoryPage
