import { RiDeleteBinLine } from 'react-icons/ri'
import { TbArrowBackUp, TbArrowForwardUp } from "react-icons/tb";
import { MdOutlineContentCopy, MdOutlineEmojiEmotions } from "react-icons/md";
import { HiOutlineStar } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import React from 'react'
import { _delete_messages_controller } from '@/controllers/message/delete_message';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { delete_message } from '@/redux/slice/message';
import { clear_chat_message, update_last_message } from '@/redux/slice/chat';
import { update_last_chat } from '@/redux/slice/user';

const ChatMsgContextMenu = ({ mouse, payload, setClipBoardReact }) => {
    const current_user = useSelector(state => state.current_user)
    const chat = useSelector(state => state.chat)
    const token = Cookies.get('_x_a_t')
    const dispatch = useDispatch()
    const handleDeleteMessage = async () => {
        const data = {
            msg_ids: [payload?._id]
        }
        const res = await _delete_messages_controller(data, token)
        dispatch(delete_message([payload?.id])) // delete from redux

        if (`${current_user.last_chat?._id}` === `${payload?._id}`) {
            if (chat?.data?.length == 1) {
                dispatch(clear_chat_message(current_user)) // contact list update
                dispatch(update_last_chat({})) // current chat update
            } else {
                dispatch(update_last_message({ current_user, chat: chat?.data[chat?.data?.length - 2] })) // contact list update
                dispatch(update_last_chat(chat?.data[chat?.data?.length - 2])) // current user update
            }
        }
    }

    const handleCopyMessage = async () => {
        await navigator.clipboard.writeText(payload.text)
        setClipBoardReact({
            id: payload?.id,
            msg: 'copied'
        })
        setTimeout(() => {
            setClipBoardReact(null)
        }, 1200)
    }
    return (
        <div className="contact_context_menu" style={{ '--left': `${mouse.x}px`, '--top': `${mouse.y}px` }}>
            <div className="contact_menu_inner">
                <button >
                    <TbArrowBackUp /> <span>Reply</span>
                </button>
            </div>
            <div className="contact_menu_inner">
                <button onClick={handleCopyMessage}>
                    <MdOutlineContentCopy /> <span>Copy</span>
                </button>
            </div>
            <div className="contact_menu_inner">
                <button >
                    <MdOutlineEmojiEmotions /> <span>React to message</span>
                </button>
            </div>
            <div className="contact_menu_inner">
                <button >
                    <TbArrowForwardUp /> <span>Forword</span>
                </button>
            </div>
            <div className="contact_menu_inner">
                <button >
                    <HiOutlineStar /> <span>Star</span>
                </button>
            </div>
            <div className="contact_menu_inner">
                <button onClick={handleDeleteMessage}>
                    <AiOutlineDelete /> <span>Delete</span>
                </button>
            </div>
        </div>
    )
}

export default ChatMsgContextMenu
