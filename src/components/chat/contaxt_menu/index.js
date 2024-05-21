import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineClear } from 'react-icons/ai'
import { BsPin } from 'react-icons/bs'
import React from 'react'
import Cookies from 'js-cookie'
import { clear_chat_message, get_contact_list } from '@/redux/slice/chat'
import { useDispatch, useSelector } from 'react-redux'
import { handalCurrentUser } from '@/redux/slice/user'
import { _delete_contact_chat } from '@/controllers/chat/delete_chat'
import { _delete_messages } from '@/controllers/message/delete_message'
import { get_chat_message } from '@/redux/slice/message'

const ContaxtMenu = ({ data, mouse }) => {
    const current_user = useSelector(state => state.current_user)
    const token = Cookies.get('_x_a_t')
    const dispatch = useDispatch()
    // delete chat 
    const payload = {
        chat_id: data?.chat_id
    }

    const handleDelete = async () => {
        const res = await _delete_contact_chat(payload, token)
        dispatch(get_contact_list({ token }))
        if (data?.chat_id == current_user?.chat_id) {
            dispatch(handalCurrentUser(null))
        }
    }

    // clear message 
    const handleClearMessage = async () => {
        const res = await _delete_messages(payload, token)
        dispatch(clear_chat_message(data))
        if (current_user?.chat_id == payload?.chat_id) {
            dispatch(get_chat_message({ token, chat_id: current_user?.chat_id, page: 1, clean: true }))
        }
    }

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
                <button onClick={handleClearMessage}>
                    <AiOutlineClear /> <span>Clear message</span>
                </button>
            </div>
        </div>
    )
}

export default ContaxtMenu
