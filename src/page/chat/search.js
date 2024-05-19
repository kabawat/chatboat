import endpoint from '@/api_endpoint';
import Avatar from '@/components/comman/Avatar';
import { _add_new_contact } from '@/controllers/message';
import { get_chat } from '@/redux/slice/chat';
import { get_contact_list } from '@/redux/slice/chat/chat_contact';
import { handalCurrentUser } from '@/redux/slice/user';
import { get_userList } from '@/redux/slice/user/userList';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { IoSearchOutline } from "react-icons/io5";
import { RiUserAddLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
const Search = () => {
    const contacts = useSelector(state => state.contact)
    const user = useSelector(state => state.user_list)
    const [searchValue, setSeachValue] = useState('')
    const [show, setShow] = useState(false);
    const token = Cookies.get('_x_a_t')
    const dispatch = useDispatch()
    // handal change 
    const handalChange = ({ target }) => {
        setShow(true)
        const { value } = target
        setSeachValue(value)
    }
    // handal close modal
    const handalCloseModal = () => {
        setShow(false)
        setSeachValue('')
    }


    const handalShowUserModal = async () => {
        await dispatch(get_userList({ token })) // get user 
        setShow(true) // show user modal after fetch users
    }
    // handal select user
    const handalSelectUser = async (payload) => {
        setShow(false)
        try {
            const data = { contact: payload?._id }
            const res = await _add_new_contact(data, token) // add new contact 
            let contact_data = {}
            await dispatch(get_contact_list({ token })).then(({ payload }) => {
                contact_data = payload?.data[0]
            })
            await dispatch(get_chat({ token, chat_id: contact_data?.chat_id, page: 1, clean: true }))
            await dispatch(handalCurrentUser(contact_data))
        } catch (error) {
            console.log("error : ", error)
        }
    }

    return (
        <div className='postion-relative'>
            <div className="d-flex align-items-center">
                <div className="searchbar d-flex">
                    <div className="icon d-flex align-items-center justify-content-center">
                        <IoSearchOutline />
                    </div>
                    <div className="search_field">
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>
                <button className='add_user' onClick={handalShowUserModal}>
                    <RiUserAddLine />
                </button>
            </div>

            <Modal show={show} onHide={handalCloseModal}>
                <div className="seach_list">
                    <div className="search_outer">
                        <div className="searchbar d-flex">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <IoSearchOutline />
                            </div>
                            <div className="search_field">
                                <input type="text" placeholder="Search..." onChange={handalChange} value={searchValue} />
                            </div>
                        </div>
                    </div>
                    <div className="search_list_menu">
                        {
                            user?.data?.map((contect, key) => {
                                return (
                                    <div className="d-flex align-items-center profile_main" key={key} onClick={() => handalSelectUser(contect)}>
                                        <Avatar alt="" src={contect?.profilePicture?.secure_url || '/'} size={40} />
                                        <div className='px-2'>
                                            <div className="avatar_heading">
                                                <b>{contect?.firstName} {contect?.lastName}</b>
                                            </div>
                                            <div className="avatar_title">
                                                {contect?.about}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default Search
