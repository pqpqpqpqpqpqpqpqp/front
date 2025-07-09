import { useState } from 'react';
import 'css/profile_edit.css'

function ProfileEdit({ onClose, onSubmit }) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");

  const handleBioChange = (e) => {
    setBio(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleToggle = () => {
    setIsPrivate(!isPrivate);
  };

  const handleSubmit = () => {
    onSubmit({
      bio,
      interests,
      isPrivate,
    });
  };

  const handleEditClose = (e) => {
    if (e.target.classList.contains("profile_edit_container")) {
      onClose();
    }
  };

  return (
    <div className="profile_edit_container" onClick={handleEditClose}>
      <div className="profile_edit_card">
        <h2 className="profile_edit_title">프로필 수정</h2>

        <div className="profile_edit_flex">
          <div className='profile_edit_block'>
            <label className="profile_edit_label">이름</label>
            <div> name (@id) </div>
          </div>
          <div className="profile_edit_pic" />
        </div>

        <label className="profile_edit_label">소개</label>
        <textarea
          placeholder="소개 작성"
          className="profile_edit_input profile_edit_textarea"
          value={bio}
          onChange={handleBioChange}
          rows={1}
          maxLength={200} />

        <label className="profile_edit_label">관심사</label>
        <input
          type="text"
          placeholder="관심사 추가"
          className="profile_edit_input"
          value={interests}
          onChange={(e) => {
            const value = e.target.value;
            const valid = /^[a-zA-Z0-9ㄱ-ㅎ가-힣_ ]*$/.test(value); // 허용 문자만 통과
            if (valid) setInterests(value);
          }}
          maxLength={12} />

        <div className="profile_edit_flex">
          <label className="profile_edit_label">비공개 프로필</label>
          <div className="profile_edit_switch">
            <input
              type="checkbox"
              id="privateToggle"
              checked={isPrivate}
              onChange={handleToggle} />
            <label htmlFor="privateToggle" className="profile_edit_slider" />
          </div>
        </div>

        <button className="profile_edit_submit" onClick={handleSubmit}>
          완료
        </button>
      </div>
    </div>
  );
}

export default ProfileEdit;