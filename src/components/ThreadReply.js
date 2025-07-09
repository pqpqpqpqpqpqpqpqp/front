import { useNavigate } from "react-router-dom";
import { HiOutlineHeart, HiOutlineChat, HiOutlinePaperAirplane, HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiOutlineArrowPath } from "react-icons/hi2"
import 'css/thread_reply.css'

const ThreadReply = ({ thread }) => {
    const navigate = useNavigate();

    const moveProfile = (e) => {
        e.preventDefault();
        navigate('/profile');
    };

    return (
        <div className="thread-reply-container">
            <div className="thread-reply-card">
                <div className="thread-reply-user-img" onClick={moveProfile} />
                <div className="thread-reply-body">
                    <div className="thread-reply-header">
                        <div className="thread-reply-user-id" onClick={moveProfile}>{thread.user}</div>
                        {thread.hashtag && <div className="thread-reply-hashtag">&gt;&nbsp;{thread.hashtag}</div>}
                        <div className="thread-reply-date">{thread.createdAt}</div>
                        <HiOutlineDotsHorizontal />
                    </div>
                    <div className="thread-reply-content">{thread.content}</div>
                    <div className="thread-reply-actions">
                        <div className="thread-reply-actions-item">
                            <HiOutlineHeart />
                            <span>{thread.likes}</span>
                        </div>
                        <div className="thread-reply-actions-item">
                            <HiOutlineChat />
                            <span>{thread.replies}</span>
                        </div>
                        <div className="thread-reply-actions-item">
                            <HiOutlineArrowPath />
                        </div>
                        <div className="thread-reply-actions-item">
                            <HiOutlinePaperAirplane />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThreadReply;