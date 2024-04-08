import { Badge } from '@mui/base/Badge';
import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Typography } from "@mui/material";
import { BsPlusLg, BsFileEarmarkPdf } from 'react-icons/bs';
import { IoSendSharp, IoVideocamOutline } from 'react-icons/io5';
import { IoIosMusicalNotes } from 'react-icons/io';
import { BiImages } from 'react-icons/bi';
import { GrSend } from "react-icons/gr";
import { FileContainer, SelectButton, SelectFileBox, FileList, FileIcon, Label, Title } from './style';
const ChatContainer = () => {
    const inputRef = useRef(null);
    const chatOperationRef = useRef(null);
    const [isProfile, setIsProfile] = useState(false)
    const [paddingBottom, setPaddingBottom] = useState(60)
    const [showFile, setShowFile] = useState(false)
    const setFocus = () => {
        console.log('Focus function called');
        inputRef.current.focus();
    };

    const handalChnage = () => {
        if (chatOperationRef.current) {
            const height = chatOperationRef.current.offsetHeight;
            setPaddingBottom(height);
        }
    }

    const handleFileChange = event => {
        // Reset the value of the file input field
        event.target.value = '';
    };

    return (
        <div className={`chat-container ${isProfile && 'active'}`}>
            <div className="chat_area">
                <div className="chat_navbar d-flex align-items-center">
                    <div className="d-flex align-items-center active_user" onClick={() => setIsProfile(!isProfile)}>
                        <Avatar alt="" src="/static/images/avatar/1.jpg" sx={{ width: 42, height: 42 }} />
                        <div className='px-2'>
                            <div className="avatar_heading">
                                <b> Ms Rajputana</b>
                            </div>
                            <div className="avatar_title">
                                Full stack dev
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat_main_container" style={{ '--pb': `${paddingBottom}px` }}>
                    <div className="chat_section" onClick={() => setIsProfile(false)}>
                        <div className="chat_section_area">
                            <div className="chat_inner_section">
                                {
                                    Array.from({ length: 10 }).map((_, key) => {
                                        if (key % 2 == 0) {
                                            return (
                                                <div className="msg left-msg">
                                                    <div className="msg-img">
                                                        <Avatar alt="" src="/static/images/avatar/1.jpg" sx={{ width: 45, height: 45 }} />
                                                    </div>

                                                    <div className="msg-bubble">
                                                        <div className="msg-info">
                                                            <div className="msg-info-name">BOT</div>
                                                            <div className="msg-info-time">12:45</div>
                                                        </div>

                                                        <div className="msg-text">
                                                            Hi, welcome to SimpleChat! Go ahead and send me a message. 😄 ,
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className="msg right-msg">
                                                    <div className="msg-img">
                                                        <Avatar alt="" src="/static/images/avatar/1.jpg" sx={{ width: 45, height: 45 }} />
                                                    </div>

                                                    <div className="msg-bubble">
                                                        <div className="msg-info">
                                                            <div className="msg-info-name">Sajad</div>
                                                            <div className="msg-info-time">12:46</div>
                                                        </div>

                                                        <div className="msg-text">
                                                            You can change your name in JS section!
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
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
                            <button className='send_btn'>
                                <span> Sign up </span>
                                <GrSend />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* right side  */}
            <div className="user_profile_section" he>
                <div className="profile_detaile">
                    <div className="profile_avator d-flex justify-content-center">
                        <Avatar alt="" src="/static/images/avatar/1.jpg" sx={{ width: 160, height: 160 }} />
                    </div>
                    <div className="text-center profile_heading">
                        Ms Rajputana
                    </div>
                    <Typography sx={{ fontSize: 14, textAlign: 'center', width: '50%', margin: 'auto' }} color="text.secondary" gutterBottom>
                        Full Stack Developer
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default ChatContainer;
