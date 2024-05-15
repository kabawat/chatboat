import { Badge } from '@mui/base/Badge';
import React, { useEffect, useRef, useState } from 'react';
import { BsPlusLg, BsFileEarmarkPdf } from 'react-icons/bs';
import { IoSendSharp, IoVideocamOutline } from 'react-icons/io5';
import { IoIosMusicalNotes } from 'react-icons/io';
import { BiImages } from 'react-icons/bi';
import { GrSend } from "react-icons/gr";
import { FileContainer, SelectButton, SelectFileBox, FileList, FileIcon, Label, Title } from './style';
import Header from './header';
import RightSideDrawer from './right-aside';
import Avatar from '../comman/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { add_new_chat } from '@/redux/slice/chat';
import TextMessage from './msg/text';
const ChatContainer = () => {
    const { socket } = useSelector(state => state.socket)
    const current_user = useSelector(state => state.current_user)
    const profile = useSelector(state => state.profile)
    const chat = useSelector(state => state.chat)
    const dispatch = useDispatch()
    const inputRef = useRef(null);
    const chatOperationRef = useRef(null);
    const [isProfile, setIsProfile] = useState(false) // right side user information
    const [paddingBottom, setPaddingBottom] = useState(60)
    const [showFile, setShowFile] = useState(false)
    const setFocus = () => {
        inputRef.current.focus();
    };

    const [textMSG, setTextMSG] = useState('')
    useEffect(() => {
        const handalSendMessage = (data) => {
            if (`${current_user?.contact_id}` == `${data?.chat_id}`) {
                dispatch(add_new_chat(data))
            }
        }
        socket.on("received text", handalSendMessage)
        return () => {
            socket.off("received text", handalSendMessage)
        };
    }, [current_user])
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
            receiver: current_user?.user_id,
            sender: profile?.data?._id,
            chat_id: current_user?.contact_id
        }
        dispatch(add_new_chat({ ...data, createdAt: new Date() }))
        socket.emit('send text', data)
        setTextMSG("")
    }

    return (
        <div className={`${isProfile ? 'active' : ''} chat-container`}>
            <div className="chat_area">
                <Header setIsProfile={setIsProfile} />
                <div className="chat_main_container" style={{ '--pb': `${paddingBottom}px` }}>
                    <div className="chat_section" onClick={() => setIsProfile(false)}>
                        <div className="chat_section_area">
                            <div className="chat_inner_section">
                                {
                                    chat?.data?.map((it_chat, key) => {
                                        return < TextMessage it_chat={it_chat} key={key} />
                                    })
                                }
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
