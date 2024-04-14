import Image from 'next/image'
import React, { useState } from 'react'

const Avatar = (props) => {
    const { size, src, alt, fontSize } = props
    const [isValidPath, setIsValidPath] = useState(true)
    const handleImageError = (error) => {
        setIsValidPath(false)
    }

    if (src && isValidPath) {
        return (
            <div style={{ '--size': `${size}px` }} className='avatar'>
                <Image alt={alt} style={{}} width={size} src={src} height={size} onError={handleImageError} />
            </div>
        )
    }
    if ((!isValidPath && alt) || (alt && !src)) {
        return (
            size < 100 ? <>
                <div style={{ '--size': `${size}px`, fontSize: `calc(${size}px - 2vmin)` }} className='avatar' >
                    {alt.slice(0, 1)}
                </div>
            </> : <>
                <div style={{ '--size': `${size}px`, fontSize: `calc(${size}px - 2vmin)` }} className='avatar' >
                    <div style={{ '--size': `${size - 40}px`, fontSize: `calc(${size - 40}px - 2vmin)` }}>
                        {alt.slice(0, 1)}
                    </div>
                </div>
            </>
        )
    }

    if ((!src && !alt) || (!isValidPath && !alt)) {
        return (
            <div style={{ '--size': `${size}px` }} className='avatar'>
                <Image alt={alt} style={{}} width={size} src={'/avatar/broken-image.png'} height={size} onError={handleImageError} />
            </div>
        )
    }
}

export default Avatar
