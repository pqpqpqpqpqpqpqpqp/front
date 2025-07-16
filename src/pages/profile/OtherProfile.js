import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Thread from 'components/Thread';
import { useAuth } from 'context/AuthContext';
import { toast } from 'react-toastify';
import 'css/profile.css';

function UserProfile() {
  const { idx } = useParams();
  const { userIdx: myIdx } = useAuth();
  const [profile, setProfile] = useState(null);
  const [currentTab, setCurrentTab] = useState('스레드');
  const [profileThreadList, setProfileThreadList] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/user/page/profile?userIdx=${idx}`);
        const data = await res.json();

        if (data.code === 200) {
          setProfile(data.data);
        } else {
          toast.error(`프로필 정보 불러오기 실패: ${data.message}`);
        }
      } catch (err) {
        toast.error(`프로필 정보 불러오기 실패: ${err.message}`);
      }
    };

    fetchUserProfile();
  }, [idx]);

  const toggleFollow = async () => {
    const url = isFollowing
      ? 'http://localhost:8080/api/follow/cancel'
      : 'http://localhost:8080/api/follow/regist';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followerIdx: myIdx, followingIdx: idx }),
      });

      const data = await res.json();
      if (data.code === 200) {
        setIsFollowing(prev => !prev);
        toast.success(isFollowing ? '언팔로우 성공' : '팔로우 성공');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(`팔로우 실패: ${err.message}`);
    }
  };

  useEffect(() => {
    if (!idx) return;

    const fetchTabData = async () => {
      let url = '';
      if (currentTab === '스레드') {
        url = `http://localhost:8080/api/user/page/threads?userIdx=${idx}`;
      } else if (currentTab === '답글') {
        url = `http://localhost:8080/api/user/page/replies?userIdx=${idx}`;
      } else if (currentTab === '미디어') {
        url = `http://localhost:8080/api/user/page/media-threads?userIdx=${idx}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.code === 200) {
          setProfileThreadList(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(`데이터 요청 실패: ${err.message}`);
      }
    };

    fetchTabData();
  }, [currentTab, idx]);

  if (!profile) return <div>로딩 중...</div>;

  return (
    <div className="profile_title">
      <h3>{idx}번 유저 프로필</h3>

      <div className="profile_container">
        <div className="profile_header">
          <div className="profile_pic">
            <img src={`http://localhost:8080${profile.profileImage}`} alt="프로필" />
          </div>
          <div className="profile_info">
            <div className="profile_name">{profile.userName}</div>
            <div className="profile_id">@{profile.userId}</div>
            <div className="profile_follow_cnt">
              팔로워 {profile.followerCount}명
            </div>
            <div className="profile_bio">{profile.bio}</div>
            <div className="profile_tags">{profile.userHashtag}</div>
          </div>
        </div>

        {myIdx !== idx && (
          <div className="profile_edit_btn_box">
            <button className="profile_edit_btn" onClick={toggleFollow}>
              {isFollowing ? '언팔로우' : '팔로우'}
            </button>
          </div>
        )}

        <div className="profile_tab_menus">
          {['스레드', '답글', '미디어'].map(tab => (
            <div
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={currentTab === tab ? 'active_tab' : ''}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="profile_tab_context">
          {profileThreadList.length > 0 ? (
            <ul className="profile-thread-list">
              {profileThreadList.map((thread) => (
                <li key={thread.threadIdx}>
                  <Thread thread={thread} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="profile_thread_empty">표시할 내용이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;