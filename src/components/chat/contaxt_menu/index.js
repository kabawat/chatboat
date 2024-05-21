import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineClear } from 'react-icons/ai'
import { BsPin } from 'react-icons/bs'
import React from 'react'
import { _delete_contact_chat } from '@/controllers/chat/delete_chat'
import Cookies from 'js-cookie'
import { get_contact_list } from '@/redux/slice/chat/chat_contact'
import { useDispatch, useSelector } from 'react-redux'
import { handalCurrentUser } from '@/redux/slice/user'

const ContaxtMenu = ({ data, mouse }) => {
    const current_user = useSelector(state => state.current_user)
    const token = Cookies.get('_x_a_t')
    const dispatch = useDispatch()
    // delete chat 
    const handleDelete = async () => {
        const payload = {
            chat_id: data?.chat_id
        }
        const res = await _delete_contact_chat(payload, token)
        dispatch(get_contact_list({ token }))
        if (data?.chat_id == current_user?.chat_id) {
            dispatch(handalCurrentUser(null))
        }
    }

    // clear message 
    const handleClearMessage = () => { }

    // pin to top 
    const pinToTop = () => { }

    return (
        <div className="contact_context_menu" style={{ '--left': `${mouse.x}px`, '--top': `${mouse.y}px` }}>
            <div className="contact_menu_inner">
                <button onClick={pinToTop}>
                    <BsPin /> <span>Pin to top</span>
                </button>
            </div>

            <div className="contact_menu_inner">
                <button onClick={handleDelete}>
                    <RiDeleteBinLine /> <span>Delete</span>
                </button>
            </div>

            <div className="contact_menu_inner">
                <button>
                    <AiOutlineClear /> <span>Clear message</span>
                </button>
            </div>
        </div>
    )
}

export default ContaxtMenu
