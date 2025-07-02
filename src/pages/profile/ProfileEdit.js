import 'css/profile_edit.css'

function ProfileEdit({ onClose, onSubmit }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("profile_edit_container")) {
      onClose();
    }
  };

  return (
    <div className="profile_edit_container" onClick={handleOverlayClick}>
      <div className="profile_edit_card">
        <h2 className="profile_edit_title">프로필 수정</h2>

        <div className="profile_edit_section">
          <div className="profile_edit_between">
            <div>
              <label className="profile_edit_label">이름</label>
              <div> name (@id) </div>
            </div>
            <div className="profile_edit_pic" />
          </div>
        </div>

        <div className="profile_edit_section">
          <label className="profile_edit_label">소개</label>
          <input type="text" placeholder="소개 작성" className="profile_edit_input" />
        </div>

        <div className="profile_edit_section">
          <label className="profile_edit_label">관심사</label>
          <input type="text" placeholder="관심사 추가" className="profile_edit_input" />
        </div>

        <div className="profile_edit_section">
          <label className="profile_edit_label">링크</label>
          <input type="url" placeholder="링크 추가" className="profile_edit_input" />
        </div>

        <div className="profile_edit_section">
          <div className="profile_edit_between">
            <label className="profile_edit_label">비공개 프로필</label>
            <label className="profile_edit_switch">
              <input type="checkbox" />
              <span className="profile_edit_slider"></span>
            </label>
          </div>
        </div>

        <button className="profile_edit_submit" onClick={onSubmit}>
          완료
        </button>
      </div>
    </div>
  );
}

export default ProfileEdit;