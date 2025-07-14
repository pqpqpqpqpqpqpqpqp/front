import { useNavigate } from "react-router-dom";
import { HiOutlineHeart, HiOutlineChat, HiOutlinePaperAirplane } from "react-icons/hi";
import { HiOutlineArrowPath } from "react-icons/hi2"
import 'css/thread.css'

const Thread = ({ thread }) => {
  const navigate = useNavigate();

  const moveDetail = () => {
    navigate(`/thread/${thread.idx}`);
  }

  const moveProfile = (e) => {
    e.preventDefault();
    navigate(navigate(`/profile/${thread.useridx}`));
  };

  return (
    <div className="thread-card" onClick={moveDetail}>
      <div className="thread-user-img" onClick={moveProfile} />
      <div className="thread-body">
        <div className="thread-header">
          <div className="thread-user-id" onClick={moveProfile}>{thread.userId}</div>
          {thread.hashtag && <div className="thread-hashtag">&gt;&nbsp;{thread.hashtag}</div>}
          <div className="thread-date">{thread.createdAt}</div>
        </div>
        <div className="thread-content">{thread.content}</div>
        <div className="thread-actions">
          <div className="thread-actions-item">
            <HiOutlineHeart />
            <span>{thread.likes}</span>
          </div>
          <div className="thread-actions-item">
            <HiOutlineChat />
            <span>{thread.replies}</span>
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
  )
};

export default Thread;