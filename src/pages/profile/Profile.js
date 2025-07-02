import { useState } from 'react';
import ProfileEdit from './ProfileEdit';
import 'css/profile.css'

function Profile() {
  const [activeTab, setActiveTab] = useState('스레드');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // db에 설정 저장
    setIsModalOpen(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case '스레드':
        return '내가 작성한 스레드(부모가 없는 스레드만)';
      case '답글':
        return '내가 작성한 스레드(부모가 있는 스레드만)';
      case '미디어':
        return '내 스레드 이미지 모음';
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

        <button className="profile_edit_btn" onClick={() => setIsModalOpen(true)}>
          프로필 수정
        </button>

        {isModalOpen && (
          <ProfileEdit onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
        )}

        <div className="profile_tab_menus">
          <div
            onClick={() => setActiveTab("스레드")}
            className={activeTab === "스레드" ? "active_tab" : ""}
          >
            스레드
          </div>
          <div
            onClick={() => setActiveTab("답글")}
            className={activeTab === "답글" ? "active_tab" : ""}
          >
            답글
          </div>
          <div
            onClick={() => setActiveTab("미디어")}
            className={activeTab === "미디어" ? "active_tab" : ""}
          >
            미디어
          </div>
        </div>

        <div className="profile_tab_context">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default Profile;