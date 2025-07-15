import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "context/AuthContext";
import { useWrite } from "context/WriteContext";
import { HiOutlineHeart, HiOutlineChat, HiOutlinePaperAirplane, HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiOutlineArrowPath } from "react-icons/hi2";
import ThreadReply from "./ThreadReply";
import 'css/thread_detail.css';

const ThreadDetail = () => {
    const { isLoggedIn } = useAuth();
    const { openWrite } = useWrite();
    const navigate = useNavigate();
    const { idx } = useParams();

    const [thread, setThread] = useState(null);
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/thread/page/detail?threadIdx=${idx}`, {
                    method: "POST"
                });

                const data = await res.json();
                if (data.code === 200) {
                    setThread(data.data.thread);
                    setReplies(data.data.replies);
                } else {
                    toast.error(`스레드 불러오기 실패: ${data.message}`);
                }
            } catch (err) {
                toast.error(`서버 오류: ${err.message}`);
            }
        };

        fetchDetail();
    }, [idx]);

    const moveProfile = (e) => {
        e.preventDefault();
        navigate(`/profile/${thread.userIdx}`);
    };

    if (!thread) return <div className="thread-detail-loading">로딩 중...</div>;

    return (
        <div className="thread-detail-title">
            <h3>{idx}번 스레드 상세 페이지</h3>
            <div className="thread-detail-container">
                <div className="thread-detail-card">
                    <div className="thread-detail-header">
                        <div className="thread-detail-user-img" onClick={moveProfile}>
                            {thread.profileImage && (
                                <img
                                    src={`http://localhost:8080${thread.profileImage}`}
                                    alt="프로필"
                                    className="thread-profile-img"
                                />
                            )}
                        </div>
                        <div className="thread-detail-user-id" onClick={moveProfile}>{thread.userId}</div>
                        {thread.hashtag && <div className="thread-detail-hashtag">&gt;&nbsp;{thread.hashtag}</div>}
                        <div className="thread-detail-date"> {/* createdAt 생략 */}</div>
                        <HiOutlineDotsHorizontal />
                    </div>
                    <div className="thread-detail-content">{thread.content}</div>
                    {thread.fileUrls && (
                        <div className="thread-detail-image">
                            <img src={`http://localhost:8080${thread.fileUrls}`} alt="본문 이미지" />
                        </div>
                    )}
                    <div className="thread-detail-actions">
                        <div className="thread-detail-actions-item">
                            <HiOutlineHeart />
                            <span>{thread.likeCount}</span>
                        </div>
                        <div className="thread-detail-actions-item">
                            <HiOutlineChat />
                            <span>{thread.commentCount}</span>
                        </div>
                        <div className="thread-detail-actions-item">
                            <HiOutlineArrowPath />
                        </div>
                        <div className="thread-detail-actions-item">
                            <HiOutlinePaperAirplane />
                        </div>
                    </div>
                </div>

                <div className="thread-detail-reply-post"
                    onClick={() => {
                        if (!isLoggedIn) {
                            toast.warn('로그인이 필요합니다');
                            return;
                        }
                        openWrite();
                    }}>
                    <input type="text" placeholder="답글을 작성해보세요" readOnly />
                    <div className="thread-detail-reply-post-btn" title="작성">
                        작성
                    </div>
                </div>

                <ul className="thread-reply-list">
                    {replies.map((reply) => (
                        <li key={reply.threadIdx}>
                            <ThreadReply thread={reply} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ThreadDetail;