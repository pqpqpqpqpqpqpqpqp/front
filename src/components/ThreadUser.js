import { useNavigate } from 'react-router-dom';
import 'css/thread_user.css'
import React from 'react';

const ThreadUser = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className='thread_user_card' onClick={() => { navigate(`/profile/${user.idx}`) }}>
            <div className="thread_user_img" />
            <div className="thread_user_info">
                <div className="thread_user_id" >{user.id}</div>
                <div className="thread_user_name" >{user.name}</div>
            </div>
        </div>
    )
}

export default ThreadUser;