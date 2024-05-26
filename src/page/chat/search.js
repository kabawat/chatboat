import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { IoSearchOutline } from "react-icons/io5";
import { RiUserAddLine } from "react-icons/ri";
import { Modal } from 'react-bootstrap'

import { add_new_contact, get_contact_list, udpate_contact_list } from '@/redux/slice/chat';
import { handalCurrentUser } from '@/redux/slice/user';
import { get_chat_message } from '@/redux/slice/message';
import { _add_new_chat } from '@/controllers/chat/add_new_chat';
import { get_userList } from '@/redux/slice/user/userList';

import endpoint from '@/api_endpoint';
import Cookies from 'js-cookie';
import Avatar from '@/components/comman/Avatar';

const Search = ({ getStart, setGetStart, setMyContact }) => {
    const contacts = useSelector(state => state.contact); // Get the contacts from the Redux store
    const user = useSelector(state => state.user_list); // Get the user list from the Redux store
    const [searchLocal, setSearchLocal] = useState("")
    const [searchValue, setSeachValue] = useState('');
    const token = Cookies.get('_x_a_t'); // Get the token from the cookies
    const dispatch = useDispatch(); // Get the dispatch function from Redux

    // user search 
    const handalChange = ({ target }) => {
        const { value } = target; // Get the value from the target
        setSeachValue(value); // Set the search value state variable
    }
    useEffect(() => {
        const timerId = setTimeout(() => {
            dispatch(get_userList({ token: token, query: searchValue }));
        }, 500);
        return () => {
            clearTimeout(timerId);
        };
    }, [searchValue, token, dispatch]);


    // Handle close modal
    const handalCloseModal = () => {
        setGetStart(false); // Hide the modal
        setSeachValue(''); // Clear the search value state variable
    }

    // Handle show user modal
    const handalShowUserModal = async () => {
        await dispatch(get_userList({ token })); // Get the user list from the API
        setGetStart(true); // Show the modal
    }
    // Handle select user
    const handalSelectUser = async (payload) => {
        setGetStart(false); // Hide the modal
        try {
            const data = { contact: payload?._id }; // Set up the data object with the contact ID
            const res = await _add_new_chat(data, token); // Add a new chat with the selected user
            let contact_data = {}; // Set up an empty object for the contact data

            // If the contact data is null, get the contact list from the API
            if (res?.contact == null) {
                await dispatch(get_contact_list({ token })).then(({ payload }) => {
                    contact_data = payload?.data[0];
                });
            } else {
                dispatch(add_new_contact(res?.contact)); // Add the new contact to the Redux store
            }

            // Get the chat messages for the selected user
            await dispatch(get_chat_message({ token, chat_id: contact_data?.chat_id, page: 1, clean: true }));
            await dispatch(handalCurrentUser(res?.contact)); // Set the current user to the selected user
        } catch (error) {
            console.log("error : ", error); // Log any errors
        }
    }

    function searchUsers(searchTerm) {
        return
    }

    const handleSearchMyContact = ({ target }) => {
        const searchTerm = target.value
        setSearchLocal(searchTerm)

        const newContacts = contacts.data.filter(user => {
            const { firstName, lastName, email } = user;
            const term = searchTerm.toLowerCase();

            return (
                firstName.toLowerCase().includes(term) ||
                lastName.toLowerCase().includes(term) ||
                email.toLowerCase().includes(term)
            );
        });
        setMyContact(newContacts)
    }

    return (
        <div className='postion-relative'>
            {/* contact list search  */}
            <div className="d-flex align-items-center">
                <div className="searchbar d-flex">
                    <div className="icon d-flex align-items-center justify-content-center">
                        <IoSearchOutline />
                    </div>
                    <div className="search_field">
                        <input type="text" placeholder="Search..." value={searchLocal} onChange={handleSearchMyContact} />
                    </div>
                </div>
                <button className='add_user' onClick={handalShowUserModal}>
                    <RiUserAddLine />
                </button>
            </div>

            {/* user search  */}
            <Modal show={getStart} onHide={handalCloseModal}>
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
