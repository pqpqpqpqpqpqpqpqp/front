import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "context/AuthContext";
import { useWrite } from "context/WriteContext";
import { HiOutlineHeart, HiOutlineChat, HiOutlinePaperAirplane, HiOutlineX } from "react-icons/hi";
import { HiOutlineArrowPath } from "react-icons/hi2";
import ThreadReply from "./ThreadReply";
import 'css/thread_detail.css';

const ThreadDetail = () => {
    const { isLoggedIn, userIdx } = useAuth();
    const { openWrite } = useWrite();
    const navigate = useNavigate();
    const { idx } = useParams();

    const [thread, setThread] = useState(null);
    const [replies, setReplies] = useState([]);
    const [liked, setLiked] = useState(false);

    const moveProfile = (e) => {
        e.preventDefault();
        navigate(`/profile/${thread.userIdx}`);
    };

    const handleDelete = async () => {
        if (!window.confirm("이 스레드를 삭제할까요?")) return;

        try {
            const res = await fetch(`http://localhost:8080/api/thread/delete`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ threadIdx: idx, userIdx: userIdx }),
            });

            const data = await res.json();
            if (data.code === 200) {
                toast.success("삭제 완료");
                navigate(-1); // 이전 페이지로 이동
            } else {
                toast.error(`삭제 실패: ${data.message}`);
            }
        } catch (err) {
            toast.error(`서버 오류: ${err.message}`);
        }
    };

    const handleLike = async () => {
        if (!isLoggedIn) {
            toast.warn("로그인이 필요합니다");
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/api/like/regist`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ threadIdx: idx, userIdx: userIdx }),
            });
            const data = await res.json();
            if (data.code === 200) {
                setThread(prev => ({ ...prev, likeCount: prev.likeCount + 1 }));
                setLiked(true);
            } else {
                toast.error("좋아요 실패");
            }
        } catch (err) {
            toast.error("서버 오류");
        }
    };

    const handleLikeCancel = async () => {
        if (!isLoggedIn) {
            toast.warn("로그인이 필요합니다");
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/api/like/cancel`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ threadIdx: idx, userIdx: userIdx }),
            });
            const data = await res.json();
            if (data.code === 200) {
                setThread(prev => ({ ...prev, likeCount: prev.likeCount - 1 }));
                setLiked(false);
            } else {
                toast.error("좋아요 취소 실패");
            }
        } catch (err) {
            toast.error("서버 오류");
        }
    };

    const handleShare = () => {
        if (!isLoggedIn) {
            toast.warn("로그인이 필요합니다");
            return;
        }
        openWrite(`${thread.userId}님의 글\n${thread.content}`);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => toast.success("링크가 복사되었습니다!"))
            .catch((err) => toast.error("복사 실패:", err.message));
    }

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/thread/page/detail?threadIdx=${idx}`);
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

    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/thread/page/replies?parentIdx=${idx}`);
                const data = await res.json();

                if (data.code === 200) {
                    setReplies(data.data);
                } else {
                    toast.error(`답글 로딩 실패: ${data.message}`);
                }
            } catch (err) {
                toast.error(`서버 오류: ${err.message}`);
            }
        };

        if (idx) fetchReplies();
    }, [idx]);

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
                        <HiOutlineX onClick={handleDelete} title="삭제" style={{ cursor: 'pointer' }} />
                    </div>
                    <div className="thread-detail-content">{thread.content}</div>
                    {thread.fileUrls && (
                        <div className="thread-detail-image">
                            <img src={`http://localhost:8080${thread.fileUrls}`} alt="본문 이미지" />
                        </div>
                    )}
                    <div className="thread-detail-actions">
                        <div className="thread-detail-actions-item" onClick={liked ? handleLikeCancel : handleLike}>
                            <HiOutlineHeart style={{ color: liked ? "red" : "black" }} />
                            <span>{thread.likeCount}</span>
                        </div>
                        <div className="thread-detail-actions-item">
                            <HiOutlineChat />
                            <span>{thread.commentCount}</span>
                        </div>
                        <div className="thread-detail-actions-item" onClick={handleShare}>
                            <HiOutlineArrowPath />
                        </div>
                        <div className="thread-detail-actions-item" onClick={handleCopyLink}>
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
                        openWrite("", idx);
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