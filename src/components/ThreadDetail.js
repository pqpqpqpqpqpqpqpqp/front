import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineHeart, HiOutlineChat, HiOutlinePaperAirplane, HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiOutlineArrowPath } from "react-icons/hi2"
import ThreadReply from "./ThreadReply";
import 'css/thread_detail.css'

const ThreadDetail = () => {
    const navigate = useNavigate();
    const { idx } = useParams();

    const thread = {
        threadIdx: 1,
        userId: 'requestfield',
        userIdx: 1,
        content: '4단 쓰레드',
        createdAt: '2025-07-01',
        likes: 6,
        replies: 3,
        parentId: null,
    };

    const threadReplyList = [{
        threadIdx: 2,
        userId: 'requestfield',
        userIdx: 1,
        content: '5단 쓰레드',
        createdAt: '2025-07-02',
        likes: 3,
        replies: 1,
        parentId: 1
    }, {
        threadIdx: 3,
        userId: 'requestfield',
        userIdx: 1,
        content: '6단 쓰레드',
        createdAt: '2025-07-03',
        likes: 1,
        replies: 0,
        parentId: 2,
    }, {
        threadIdx: 4,
        userId: 'requestfield',
        userIdx: 1,
        content: '4.1단 쓰레드',
        createdAt: '2025-07-03',
        likes: 1,
        replies: 0,
        parentId: 1,
    }];

    const moveProfile = (e) => {
        e.preventDefault();
        navigate(`/profile/${thread.userIdx}`);
    };

    return (
        <div className="thread-detail-title">
            <h3>{idx}번 스레드 상세 페이지</h3>
            <div className="thread-detail-container">
                <div className="thread-detail-card">
                    <div className="thread-detail-header">
                        <div className="thread-detail-user-img" onClick={moveProfile} />
                        <div className="thread-detail-user-id" onClick={moveProfile}>{thread.userId}</div>
                        {thread.hashtag && <div className="thread-detail-hashtag">&gt;&nbsp;{thread.hashtag}</div>}
                        <div className="thread-detail-date">{thread.createdAt}</div>
                        <HiOutlineDotsHorizontal />
                    </div>
                    <div className="thread-detail-content">{thread.content}</div>
                    <div className="thread-detail-actions">
                        <div className="thread-detail-actions-item">
                            <HiOutlineHeart />
                            <span>{thread.likes}</span>
                        </div>
                        <div className="thread-detail-actions-item">
                            <HiOutlineChat />
                            <span>{thread.replies}</span>
                        </div>
                        <div className="thread-detail-actions-item">
                            <HiOutlineArrowPath />
                        </div>
                        <div className="thread-detail-actions-item">
                            <HiOutlinePaperAirplane />
                        </div>
                    </div>
                </div>
                <ul className="thread-reply-list">
                    {threadReplyList.map((thread) => (
                        <li key={thread.threadIdx}>
                            <ThreadReply thread={thread} />
                        </li>
                    ))}
                </ul>
            </div >
        </div>
    );
}

export default ThreadDetail;