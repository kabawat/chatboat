import React from 'react'

const SiderButton = ({ handalClick, title, endIcon, startIcon }) => {
    return (
        <button className="button-one text-center" onClick={handalClick}>
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