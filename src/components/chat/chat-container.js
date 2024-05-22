import React, { useEffect, useRef, useState } from 'react';
import { BsPlusLg, BsFileEarmarkPdf } from 'react-icons/bs';
import { IoVideocamOutline } from 'react-icons/io5';
import { IoIosMusicalNotes } from 'react-icons/io';
import { BiImages } from 'react-icons/bi';
import { GrSend } from "react-icons/gr";
import { FileContainer, SelectButton, SelectFileBox, FileList, FileIcon, Label, Title } from './style';
import Header from './header';
import RightSideDrawer from './right-aside';
import Avatar from '../comman/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { add_new_message, get_chat_message } from '@/redux/slice/message';
import TextMessage from './msg/text';
import Cookies from 'js-cookie';
import { _scrollToEndSmoothly } from '@/controllers/comman/scroll_to_end';
import { udpate_contact_list } from '@/redux/slice/chat';
import ChatMsgContextMenu from './contaxt_menu/chat/chat_message';
import Image from 'next/image';
const mouseInit = {
    x: 0,
    y: 0
}
const ChatContainer = ({ mainRef }) => {
    // gloable state 
    const current_user = useSelector(state => state.current_user) // current chat user
    const { socket } = useSelector(state => state.socket) // socket information
    const profile = useSelector(state => state.profile) // logedin user information
    const chat = useSelector(state => state.chat) // current chat

    // local state 
    const [previousHeight, setPreviousHeight] = useState(0) // chat scroll height
    const [paddingBottom, setPaddingBottom] = useState(60)
    const [contextData, setContextData] = useState({})
    const [isProfile, setIsProfile] = useState(false) // right side user information
    const [showFile, setShowFile] = useState(false) // styled components
    const [mouse, setMouse] = useState(mouseInit) // mouse position
    const [textMSG, setTextMSG] = useState('') // store text message
    const [isContext, setIsContext] = useState(false)
    // References 
    const chatOperationRef = useRef(null);
    const inputRef = useRef(null); // input box reference

    const token = Cookies.get('_x_a_t')
    const dispatch = useDispatch()

    // input box 
    const setFocus = () => {
        inputRef.current.focus();
    };

    const handalChnage = (event) => {
        setTextMSG(event.target.innerText)
        if (chatOperationRef.current) {
            const height = chatOperationRef.current.offsetHeight;
            setPaddingBottom(height);
        }
    }

    // Reset the value of the file input field
    const handleFileChange = (event) => {
        event.target.value = '';
    };

    // send message handler 
    const handalSendMessage = () => {
        inputRef.current.innerHTML = ""
        const data = {
            text: textMSG,
            receiver: current_user?._id,
            sender: profile?.data?._id,
            chat_id: current_user?.chat_id
        }
        if (textMSG) {
            dispatch(add_new_message({ ...data, createdAt: new Date() }))
            socket.emit('send text', data)

            dispatch(udpate_contact_list(data)) // update last seen message 
            setTextMSG("")
            setTimeout(() => {
                _scrollToEndSmoothly(mainRef)
            }, 100)
        }
    }


    const scrollToFirstMessage = () => {
        const newHeight = mainRef.current.scrollHeight
        const scrollIncrease = newHeight - previousHeight
        mainRef.current.scrollTop = scrollIncrease
    };

    const handalScroll = () => {
        if (mainRef.current.scrollTop == 0) {
            if (chat?.page <= chat?.totalPages) {
                dispatch(get_chat_message({ token, chat_id: current_user?.chat_id, page: chat?.page, clean: false })).then(() => {
                    scrollToFirstMessage()
                })
            }
        }
        if (mainRef) {
            setPreviousHeight(mainRef.current.scrollHeight)
        }
    }

    const handleContextMenu = (event, payload) => {
        event.preventDefault()
        setContextData(payload)
        setMouse({
            x: event.pageX,
            y: event.pageY
        })
        setIsContext(false)
        setTimeout(() => {
            setIsContext(true)
        }, 100)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('click', () => {
                setTimeout(() => {
                    setIsContext(false)
                }, 100)
            })
        }
    })

    return (
        <div className={`${isProfile ? 'active' : ''} chat-container`}>
            <div className="chat_area">
                <Header setIsProfile={setIsProfile} />
                <div className="chat_main_container" style={{ '--pb': `${paddingBottom}px` }}>
                    <div className="chat_section" onClick={() => setIsProfile(false)}>
                        <div className="chat_section_area">
                            <div className="chat_inner_section" ref={mainRef} style={{ scrollBehavior: 'smooth' }} onScroll={handalScroll}>
                                {
                                    chat?.data?.map((it_chat, key) => {
                                        return <TextMessage it_chat={it_chat} key={key} handleContextMenu={handleContextMenu} keys={key} />
                                    })
                                }
                                {
                                    !chat?.data?.length ? <>
                                        <div className="no_chat_container">
                                            <div className="p-3 d-flex flex-column align-items-center">
                                                <Image width={300} height={300} src="/assets/no-chat.png" />
                                                <h3 className='text-center'>let's start chatting!</h3>
                                                <p className='text-center'>
                                                    How was starting your first chat with your friends
                                                </p>
                                            </div>
                                        </div>
                                    </> : <></>
                                }
                                {isContext ? <ChatMsgContextMenu mouse={mouse} payload={contextData} /> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat_operation" ref={chatOperationRef}>
                    <div className="d-flex align-items-end">
                        {/* file select sectin  */}
                        <div className="FileContainer">
                            <FileContainer>
                                <SelectButton type='button' x={showFile ? 45 : 0} onClick={() => setShowFile(!showFile)}>
                                    <BsPlusLg />
                                </SelectButton>
                                <SelectFileBox show={showFile ? 'visible' : 'hidden'}>
                                    <FileList type='button' show={showFile}>
                                        <input type="file" id='pdf' name='pdf' accept='application/pdf' disabled />
                                        <FileIcon>
                                            <BsFileEarmarkPdf />
                                            <Label htmlFor='pdf'></Label>
                                            <Title htmlFor='pdf'>PDF</Title>
                                        </FileIcon>
                                    </FileList>
                                    <FileList type='button' show={showFile}>
                                        <input type="file" id='picture' name="picture" accept='image/*' onChange={handleFileChange} />
                                        <FileIcon>
                                            <BiImages />
                                            <Label htmlFor='picture'></Label>
                                            <Title htmlFor='picture'>Image</Title>
                                        </FileIcon>
                                    </FileList>
                                    <FileList type='button' show={showFile}>
                                        <input type="file" id='video' name="video" accept='video/*' onChange={handleFileChange} />
                                        <FileIcon>
                                            <IoVideocamOutline />
                                            <Label htmlFor='video'></Label>
                                            <Title htmlFor='video'>Video</Title>
                                        </FileIcon>
                                    </FileList>
                                    <FileList type='button' show={showFile}>
                                        <input type="file" id='music' name="audio" accept=".mp3" onChange={handleFileChange} />
                                        <FileIcon>
                                            <IoIosMusicalNotes />
                                            <Label htmlFor='music'></Label>
                                            <Title htmlFor='music'>Music</Title>
                                        </FileIcon>
                                    </FileList>
                                </SelectFileBox>
                            </FileContainer>
                        </div>

                        {/* input section  */}
                        <div id="w-input-container" onClick={setFocus}>
                            <div className="w-input-text-group">
                                <div id="w-input-text" ref={inputRef} onInput={handalChnage} contentEditable></div>
                                <div className="w-placeholder">
                                    Type a message
                                </div>
                            </div>
                        </div>

                        {/* send button  */}
                        <div className="px-3">
                            <button className='send_btn' onClick={handalSendMessage}>
                                <span> Send </span>
                                <GrSend />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* right side  */}
            <RightSideDrawer />
        </div>
    );
};

export default ChatContainer;
