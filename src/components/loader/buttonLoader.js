import React from 'react'

const ButtonLoader = ({ count = 3 }) => {
    return (
        <div class="btn-loader">
            <div class="circle">
                <div class="dot"></div>
                <div class="outline"></div>
            </div>
            <div class="circle">
                <div class="dot"></div>
                <div class="outline"></div>
            </div>
            <div class="circle">
                <div class="dot"></div>
                <div class="outline"></div>
            </div>
        </div>
    )
}

export default ButtonLoader

export const ButtonWave = () => {
    return (
        <div class="loadingWave">
            <svg height="48px" width="64px">
                <polyline id="back" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"></polyline>
                <polyline id="front" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"></polyline>
            </svg>
        </div>
    )
}

export const CircleWave = () => {
    return (
        <div class="loader-circle" style={{ '--size': '30px' }}></div>
    )
}
