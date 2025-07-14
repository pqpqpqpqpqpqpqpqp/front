import { useNavigate } from 'react-router-dom';
import 'css/thread_user.css'
import React from 'react';

const ThreadUser = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className='thread_user_card' onClick={() => { navigate(`/profile/${user.userIdx}`) }}>
            <div className="thread_user_img" />
            <div className="thread_user_info">
                <div className="thread_user_id" >{user.userId}</div>
                <div className="thread_user_name" >{user.userName}</div>
            </div>
            <div className='thread_user_follow'>팔로우</div>
        </div>
    )
}

export default ThreadUser;