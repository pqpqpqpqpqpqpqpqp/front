import { HiOutlineHeart, HiOutlineChat, HiOutlinePaperAirplane, HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiOutlineArrowPath } from "react-icons/hi2"
import 'css/thread.css'

const Thread = ({ thread }) => (
  <div className="thread-card">
    <div className="thread-user-img" />
    <div className="thread-card-body">
      <div className="thread-header">
        <div className="thread-top">
          <div className="thread-user-id">{thread.user}</div>
          {thread.hashtag && <div className="thread-hashtag">&gt;&nbsp;{thread.hashtag}</div>}
          <div className="thread-date">{thread.createdAt}</div>
        </div>
        <div className="thread-menu">
          <HiOutlineDotsHorizontal />
        </div>
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
);

export default Thread;