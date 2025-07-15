import { useNavigate } from "react-router-dom";
import { HiOutlineHeart, HiOutlineChat, HiOutlinePaperAirplane } from "react-icons/hi";
import { HiOutlineArrowPath } from "react-icons/hi2"
import 'css/thread.css'

const Thread = ({ thread }) => {
  const navigate = useNavigate();

  const moveDetail = () => {
    navigate(`/thread/${thread.threadIdx}`);
  };

  const moveProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/profile/${thread.userIdx}`);
  };

  return (
    <div className="thread-card" onClick={moveDetail}>
      <div className="thread-user-img" onClick={moveProfile}>
        {thread.profileImage && (
          <img
            src={`http://localhost:8080${thread.profileImage}`}
            alt="프로필"
            className="thread-profile-img"
          />
        )}
      </div>
      <div className="thread-body">
        <div className="thread-header">
          <div className="thread-user-id" onClick={moveProfile}>{thread.userId}</div>
          {thread.hashtag && <div className="thread-hashtag">&gt;&nbsp;{thread.hashtag}</div>}
          <div className="thread-date">{thread.createdAt}</div>
        </div>
        <div className="thread-content">{thread.content}</div>
        {thread.fileUrls && (
          <div className="thread-image">
            <img
              src={`http://localhost:8080${thread.fileUrls}`}
              alt="첨부 이미지"
              className="thread-attachment"
            />
          </div>
        )}
        <div className="thread-actions">
          <div className="thread-actions-item">
            <HiOutlineHeart />
            <span>{thread.likeCount}</span>
          </div>
          <div className="thread-actions-item">
            <HiOutlineChat />
            <span>{thread.commentCount}</span>
          </div>
          <div className="thread-actions-item">
            <HiOutlineArrowPath />
          </div>
          <div className="thread-actions-item">
            <HiOutlinePaperAirplane />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thread;