import { useNavigate } from "react-router-dom";
import { HiOutlineHeart, HiOutlineChat, HiOutlinePaperAirplane, HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiOutlineArrowPath } from "react-icons/hi2"
import 'css/thread_reply.css'

const ThreadReply = ({ thread }) => {
  const navigate = useNavigate();

  const moveDetail = () => {
    navigate(`/thread/${thread.threadIdx}`);
  };

  const moveProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/profile/${thread.userIdx}`);  // userIdx로 변경
  };

  return (
    <div className="thread-reply-container">
      <div className="thread-reply-card" onClick={moveDetail}>
        <div className="thread-reply-user-img" onClick={moveProfile}>
          <img src={`http://localhost:8080${thread.profileImage}`} alt={`${thread.userId} profile`} />
        </div>
        <div className="thread-reply-body">
          <div className="thread-reply-header">
            <div className="thread-reply-user-id" onClick={moveProfile}>{thread.userId}</div>
            {thread.hashtag && <div className="thread-reply-hashtag">&gt;&nbsp;{thread.hashtag}</div>}
            <HiOutlineDotsHorizontal />
          </div>
          <div className="thread-reply-content">{thread.content}</div>
          <div className="thread-reply-actions">
            <div className="thread-reply-actions-item">
              <HiOutlineHeart />
              <span>{thread.likeCount}</span>
            </div>
            <div className="thread-reply-actions-item">
              <HiOutlineChat />
              <span>{thread.commentCount}</span>
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
  );
};

export default ThreadReply;