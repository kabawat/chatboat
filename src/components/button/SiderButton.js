import React from 'react'

const SiderButton = ({ handalClick, title, endIcon, startIcon, bgColor = "#675c9c", color = "#fff" }) => {
    return (
        <button style={{ background: bgColor, color: color }} className="button-one text-center" onClick={handalClick}>
            {
                startIcon ? startIcon : ''
            }
            {title}
            {
                endIcon ? endIcon : ''
            }
        </button>
    )
}

export default SiderButton