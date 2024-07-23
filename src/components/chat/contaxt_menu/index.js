import { block_user_contact, clear_chat_message, get_contact_list } from '@/redux/slice/chat'
import { handalCurrentUser, update_current_user } from '@/redux/slice/user'
import { _delete_messages_controller } from '@/controllers/message/delete_message'
import { useDispatch, useSelector } from 'react-redux'
import { _delete_contact_chat } from '@/controllers/chat/delete_chat'
import { get_chat_message } from '@/redux/slice/message'
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineClear } from 'react-icons/ai'
import { useSocket } from '@/app/(chat)/layout'
import { ImBlocked } from "react-icons/im";
import { BsPin } from 'react-icons/bs'
import React from 'react'

const ContaxtMenu = ({ data, mouse }) => {
    const current_user = useSelector(state => state.current_user)
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const socket = useSocket()
    // delete chat 
    const payload = {
        chat_id: data?.chat_id
    }
    const handleDelete = async () => {
        try {
            await _delete_contact_chat(payload)
            dispatch(get_contact_list())
            if (data?.chat_id == current_user?.chat_id) {
                dispatch(handalCurrentUser(null))
            }
        } catch (error) { }
    }

    // clear message 
    const handleClearMessage = async () => {
        try {
            await _delete_messages_controller(payload)
            dispatch(clear_chat_message(data))
            if (current_user?.chat_id == payload?.chat_id) {
                dispatch(get_chat_message({ chat_id: current_user?.chat_id, page: 1, clean: true }))
            }
        } catch (error) { }
    }

    //Block/unblock contact
    //@param {boolean} block - Whether to block or unblock
    const handleBlockContact = async (block) => {
        const payload = {
            chat_id: data?.chat_id,
            is_block: block,
            blocked_by: profile?.data?._id,
            blocked_user: data?._id
        }
        dispatch(block_user_contact(payload))
        socket.emit("block user", payload)

        // current user update 
        if (current_user.chat_id == data?.chat_id) {
            let currentUser = {}
            if (block) {
                currentUser = {
                    ...current_user,
                    blocked_by: [...current_user.blocked_by, profile?.data?._id]
                }
            } else {
                const blocked_by = current_user.blocked_by.filter(item => `${item}` != `${profile?.data?._id}`)
                currentUser = {
                    ...current_user,
                    blocked_by: blocked_by
                }
            }
            currentUser = {
                ...currentUser,
                is_block: currentUser?.blocked_by?.length ? true : false,
            }
            dispatch(update_current_user(currentUser))
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
            {
                data?.blocked_by?.includes(`${profile?.data?._id}`) ? <>
                    <div className="contact_menu_inner">
                        <button onClick={() => handleBlockContact(false)}>
                            <ImBlocked /> <span>Unblock User</span>
                        </button>
                    </div>
                </> : <>
                    <div className="contact_menu_inner">
                        <button onClick={() => handleBlockContact(true)}>
                            <ImBlocked /> <span>Block User</span>
                        </button>
                    </div>
                </>
            }

        </div>
    )
}

export default ContaxtMenu
