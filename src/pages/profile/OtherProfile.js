import { useState, useEffect } from 'react';
import ProfileEdit from './ProfileEdit';
import ProfileFollow from './ProfileFollow';
import Thread from 'components/Thread';
import 'css/profile.css'

function OtherProfile() {
  const [currentTab, setCurrentTab] = useState('스레드');
  const [editModal, setEditModal] = useState(false);
  const [followModal, setFollowModal] = useState(false);
  const [profileThreadList, setProfileThreadList] = useState([]);

  const handleEditSubmit = () => {
    setEditModal(false);
  };

  const fetchThreadData = async () => {
    return [
      {
        threadIdx: 1,
        userId: "emily_james",
        userIdx: 11,
        hashtag: "#travel",
        createdAt: "2025-07-10",
        content: "Just came back from Iceland 🇮🇸 The landscapes are unreal!",
        likes: 124,
        replies: 8
      }
    ];
  };

  const fetchReplyData = async () => {
    return [
      {
        threadIdx: 4,
        userId: "noah_chen",
        userIdx: 12,
        hashtag: "#reply",
        createdAt: "2025-07-11",
        content: "Reply content",
        likes: 5,
        replies: 1
      }
    ];
  };

  const fetchMediaData = async () => {
    return [
      {
        threadIdx: 7,
        userId: "sofia_ruz",
        userIdx: 13,
        hashtag: "#photo",
        createdAt: "2025-07-12",
        content: "Media content with 📸",
        likes: 15,
        replies: 3
      }
    ];
  };


  useEffect(() => {
    // 탭에 따라 다른 데이터를 불러오는 함수
    const fetchTabData = async () => {
      try {
        if (currentTab === '스레드') {
          const data = await fetchThreadData();
          setProfileThreadList(data);
        } else if (currentTab === '답글') {
          const data = await fetchReplyData();
          setProfileThreadList(data);
        } else if (currentTab === '미디어') {
          const data = await fetchMediaData();
          setProfileThreadList(data);
        }
      } catch (error) {
        console.error('데이터 요청 실패:', error);
      }
    };

    fetchTabData();
  }, [currentTab]);

  const renderTabContext = () => {
    switch (currentTab) {
      case '스레드':
        return (
          <ul className="profile-thread-list">
            {profileThreadList.map((thread) => (
              <li key={thread.id}>
                <Thread thread={thread} />
              </li>
            ))}
          </ul>
        );
      case '답글':
        return (
          <ul className="profile-thread-list">
            {profileThreadList.map((thread) => (
              <li key={thread.id}>
                <Thread thread={thread} />
              </li>
            ))}
          </ul>
        );
      case '미디어':
        return (
          <ul className="profile-thread-list">
            {profileThreadList.map((thread) => (
              <li key={thread.id}>
                <Thread thread={thread} />
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile_title">
      <h3>프로필</h3>
      {followModal && (
        <ProfileFollow onClose={() => setFollowModal(false)} />
      )}
      {editModal && (
        <ProfileEdit onClose={() => setEditModal(false)} onSubmit={handleEditSubmit} />
      )}
      <div className="profile_container">
        <div className="profile_header">
          <div className="profile_pic" />
          <div className="profile_info">
            <div className="profile_name">name</div>
            <div className="profile_id">id</div>
            <div className="profile_follow_cnt" onClick={() => setFollowModal(true)}>팔로워 0명</div>
          </div>
        </div>

        <div className='profile_follow_btn_box'>
          <button className="profile_follow_btn" onClick={() => {}}>
            팔로우
          </button>
        </div>


        <div className="profile_tab_menus">
          <div
            onClick={() => setCurrentTab("스레드")}
            className={currentTab === "스레드" ? "active_tab" : ""}
          >
            스레드
          </div>
          <div
            onClick={() => setCurrentTab("답글")}
            className={currentTab === "답글" ? "active_tab" : ""}
          >
            답글
          </div>
          <div
            onClick={() => setCurrentTab("미디어")}
            className={currentTab === "미디어" ? "active_tab" : ""}
          >
            미디어
          </div>
        </div>

        <div className="profile_tab_context">{renderTabContext()}</div>
      </div>
    </div>
  );
}

export default OtherProfile;