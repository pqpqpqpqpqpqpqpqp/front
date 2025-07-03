import { useState } from 'react';
import ProfileEdit from './ProfileEdit';
import ProfileThreadTab from './ProfileThreadTab';
import ProfileReplyTab from './ProfileReplyTab';
import ProfileMediaTab from './ProfileMediaTab';
import 'css/profile.css'

function Profile() {
  const [currentTab, setCurrentTab] = useState('스레드');
  const [editOpen, setEditOpen] = useState(false);

  // 페이지 로드시 쿠키에 저장된 userIdx로 id, name, 프로필 사진, 팔로워 수 등등 가져올것 

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // db에 설정 저장
    setEditOpen(false);
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
      <div className="profile_container">
        <div className="profile_header">
          <div className="profile_pic" />
          <div className="profile_info">
            <div className="profile_name">name</div>
            <div className="profile_id">id</div>
            <div className="profile_follow_cnt">팔로워 0명</div>
          </div>
        </div>

        <button className="profile_edit_btn" onClick={() => setEditOpen(true)}>
          프로필 수정
        </button>

        {editOpen && (
          <ProfileEdit onClose={() => setEditOpen(false)} onSubmit={handleEditSubmit} />
        )}

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