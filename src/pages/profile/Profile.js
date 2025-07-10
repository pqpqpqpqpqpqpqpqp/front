import { useState } from 'react';
import ProfileEdit from './ProfileEdit';
import ProfileFollow from './ProfileFollow';
import ProfileThreadTab from './ProfileThreadTab';
import ProfileReplyTab from './ProfileReplyTab';
import ProfileMediaTab from './ProfileMediaTab';
import 'css/profile.css'

function Profile() {
  const [currentTab, setCurrentTab] = useState('스레드');
  const [editModal, setEditModal] = useState(false);
  const [followModal, setFollowModal] = useState(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEditModal(false);
  };

  const renderTabContext = () => {
    switch (currentTab) {
      case '스레드':
        return <ProfileThreadTab />;
      case '답글':
        return <ProfileReplyTab />;
      case '미디어':
        return <ProfileMediaTab />;
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

        <button className="profile_edit_btn" onClick={() => setEditModal(true)}>
          프로필 수정
        </button>



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

export default Profile;