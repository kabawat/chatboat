import React from 'react'

const ButtonLoader = ({ count = 3 }) => {
    return (
        <div className="btn-loader">
            <div className="circle">
                <div className="dot"></div>
                <div className="outline"></div>
            </div>
            <div className="circle">
                <div className="dot"></div>
                <div className="outline"></div>
            </div>
            <div className="circle">
                <div className="dot"></div>
                <div className="outline"></div>
            </div>
        </div>
    )
}

export default ButtonLoader

export const ButtonWave = () => {
    return (
        <div className="loadingWave">
            <svg height="48px" width="64px">
                <polyline id="back" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"></polyline>
                <polyline id="front" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"></polyline>
            </svg>
        </div>
    )
}

export const CircleWave = () => {
    return (
        <div className="loader-circle" style={{ '--size': '30px' }}></div>
    )
}
