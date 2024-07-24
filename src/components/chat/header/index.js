import { HiOutlineDotsVertical } from "react-icons/hi";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ContaxtMenu from '@/components/chat/contaxt_menu';
import Avatar from '@/components/comman/Avatar';
import { formatTimeDifference } from "@/helper/timeCal";
const mousePos = {
    x: 0,
    y: 0
}
const Header = ({ setIsProfile, data }) => {
    const currentUser = useSelector(state => state.current_user)
    const [isContext, setIsContext] = useState()
    const [lastSeen, setLastSeen] = useState('Online')
    const [mouse, setMouse] = useState(mousePos)
    
    const handleModal = (event) => {
        setMouse({
            x: event.pageX - 150,
            y: event.pageY + 10
        })
        setIsContext(false)
        setTimeout(() => {
            setIsContext(true)
        }, 100)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('click', () => {
                setIsContext(false)
            })
        }
    })

    useEffect(() => {
        const status = currentUser?.isOnline ? 'Online' : formatTimeDifference(new Date(currentUser?.lastSeen))
        setLastSeen(status)
    }, [currentUser])
    return (
        <div className="chat_navbar d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center active_user" onClick={() => setIsProfile(true)}>
                <Avatar alt={currentUser?.firstName} src={currentUser?.picture} size={42} />
                <div className='px-2'>
                    <div className="avatar_heading">
                        <b> {currentUser?.firstName} {currentUser?.lastName}</b>
                    </div>
                    <div className="avatar_title text-success">
                        {lastSeen}
                    </div>
                </div>
            </div>
            <div>
                <button className="" onClick={handleModal} >
                    <HiOutlineDotsVertical />
                </button>
            </div>
            {isContext ? <ContaxtMenu data={data} mouse={mouse} /> : <></>}
        </div >
    )
}

export default Header
