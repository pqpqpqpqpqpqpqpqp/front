import { useState, useEffect } from 'react';
import ProfileEdit from './ProfileEdit';
import ProfileFollow from './ProfileFollow';
import Thread from 'components/Thread';
import 'css/profile.css'
import { useAuth } from 'context/AuthContext';
import { toast } from 'react-toastify';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [followModal, setFollowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentTab, setCurrentTab] = useState('스레드');
  const [profileThreadList, setProfileThreadList] = useState([]);
  const { userIdx } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/user/page/profile?userIdx=${userIdx}`);
        const data = await res.json();

        if (data.code === 200) {
          setProfile(data.data);
        } else {
          toast.error(`프로필 정보 불러오기 실패: ${data.message}`)
        }
      } catch (err) {
        toast.error(`프로필 정보 불러오기 실패: ${err.message}`)
      }
    };

    fetchUserProfile();
  }, [userIdx]);

  const handleEditSubmit = async ({ userId, bio, interests, isPrivate, profileImage }) => {
    const formData = new FormData();
    formData.append('userIdx', userIdx);
    formData.append('userId', userId);
    formData.append('bio', bio);
    formData.append('privateCheck', isPrivate);

    interests.forEach(tag => {
      formData.append('hashtagName', tag);
    });

    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const res = await fetch('http://localhost:8080/api/user/update/profile', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.code === 200) {
        toast.success('프로필 수정 성공');
      } else {
        toast.error(`프로필 수정 실패: ${data.message}`);
      }
    } catch (err) {
      toast.error(`오류: ${err.message}`);
    }
  };

  useEffect(() => {
    if (!userIdx) return <div>로딩 중...</div>;
    const fetchTabData = async () => {
      try {
        let url = '';
        if (currentTab === '스레드') {
          url = `http://localhost:8080/api/user/page/threads?userIdx=${userIdx}`;
        } else if (currentTab === '답글') {
          url = `http://localhost:8080/api/user/page/replies?userIdx=${userIdx}`;
        } else if (currentTab === '미디어') {
          url = `http://localhost:8080/api/user/page/media-threads?userIdx=${userIdx}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (data.code === 200) {
          setProfileThreadList(data.data);
        } else {
          toast.error(`데이터 불러오기 실패: ${data.message}`);
        }
      } catch (error) {
        toast.error(`데이터 요청 실패: ${error.message}`);
      }
    };

    if (userIdx) {
      fetchTabData();
    }
  }, [currentTab, userIdx]);

  const renderTabContext = () => {
    if (!profileThreadList || profileThreadList.length === 0) {
      return <div className="profile_thread_empty">표시할 내용이 없습니다.</div>;
    }

    switch (currentTab) {
      case '스레드':
        return (
          <ul className="profile-thread-list">
            {profileThreadList.map((thread) => (
              <li key={thread.threadIdx}>
                <Thread thread={thread} />
              </li>
            ))}
          </ul>
        );
      case '답글':
        return (
          <ul className="profile-thread-list">
            {profileThreadList.map((thread) => (
              <li key={thread.threadIdx}>
                <Thread thread={thread} />
              </li>
            ))}
          </ul>
        );
      case '미디어':
        return (
          <ul className="profile-thread-list">
            {profileThreadList.map((thread) => (
              <li key={thread.threadIdx}>
                <Thread thread={thread} />
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  if (!profile) return <div>로딩 중...</div>

  return (
    <div className="profile_title">
      <h3>{userIdx}번 유저 프로필</h3>
      {followModal && (
        <ProfileFollow onClose={() => setFollowModal(false)} />
      )}
      {editModal && (
        <ProfileEdit
          onClose={() => setEditModal(false)}
          onSubmit={handleEditSubmit}
          initialData={profile}
        />
      )}
      <div className='profile_container'>
        <div className='profile_header'>
          <div className="profile_pic">
            <img src={`http://localhost:8080${profile.profileImage}`} alt="프로필" />
          </div>
          <div className="profile_info">
            <div className="profile_name">{profile.userName}</div>
            <div className="profile_id">@{profile.userId}</div>
            <div className="profile_follow_cnt" onClick={() => setFollowModal(true)}>
              팔로워 {profile.followerCount}명
            </div>
            <div className="profile_bio">{profile.bio}</div>
            <div className="profile_tags">{profile.userHashtag}</div>
          </div>
        </div>

        <div className='profile_edit_btn_box'>
          <button className="profile_edit_btn" onClick={() => setEditModal(true)}>
            프로필 수정
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

export default Profile;