import React, { useState, useEffect } from 'react';
import 'css/profile_edit.css';

function ProfileEdit({ onClose, onSubmit, initialData }) {
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [userId, setUserId] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (initialData) {
      setBio(initialData.bio || '');
      setUserId(initialData.userId || '');
      setIsPrivate(initialData.privateCheck || false);
      setInterests(initialData.userHashtag || []);
      setPreviewUrl(initialData.profileImage ? `http://localhost:8080${initialData.profileImage}` : '');
    }
  }, [initialData]);

  const handleBioChange = (e) => setBio(e.target.value);
  const handleToggle = () => setIsPrivate(!isPrivate);

  const handleAddInterest = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const trimmed = inputValue.trim();
      const valid = /^[a-zA-Z0-9ㄱ-ㅎ가-힣_]+$/.test(trimmed);
      if (trimmed && valid && !interests.includes(trimmed)) {
        setInterests([...interests, trimmed]);
      }
      setInputValue('');
    }
  };

  const handleRemoveInterest = (tag) => {
    setInterests(interests.filter((item) => item !== tag));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    onSubmit({ bio, interests, isPrivate, userId, profileImage });
    onClose();
  };

  const handleEditClose = (e) => {
    if (e.target.className === 'profile_edit_container') {
      onClose();
    }
  };

  return (
    <div className="profile_edit_container" onClick={handleEditClose}>
      <div className="profile_edit_card" onClick={(e) => e.stopPropagation()}>
        <h2 className="profile_edit_title">프로필 수정</h2>

        <div className="profile_edit_flex">
          <div className="profile_edit_block">
            <div className="profile_edit_div">사용자 이름</div>
            <input
              type="text"
              className="profile_edit_input"
              placeholder="사용자 ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="profile_edit_pic" onClick={() => document.getElementById('profileImageInput').click()}>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="미리보기"
                className="profile_edit_preview"
              />
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            id="profileImageInput"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>

        <div className="profile_edit_div">소개</div>
        <textarea
          placeholder="소개 작성"
          className="profile_edit_input profile_edit_textarea"
          value={bio}
          onChange={handleBioChange}
          rows={1}
          maxLength={200}
        />

        <div className="profile_edit_div">관심사</div>
        <div className="profile_edit_input_wrapper">
          <input
            type="text"
            placeholder="관심사 추가"
            className="profile_edit_input"
            value={inputValue}
            onChange={(e) => {
              const raw = e.target.value;
              const filtered = raw.replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣_ ]/g, '');
              setInputValue(filtered);
            }}
            onKeyDown={handleAddInterest}
            maxLength={20}
          />
          <div className="profile_edit_hashtags">
            {interests.map((tag, idx) => (
              <span key={idx} className="profile_edit_hashtag">
                #{tag}
                <button
                  className="profile_edit_tag_remove"
                  onClick={() => handleRemoveInterest(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="profile_edit_flex">
          <div className="profile_edit_label">비공개 프로필</div>
          <label className="profile_edit_switch">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={handleToggle}
            />
            <span className="profile_edit_slider" />
          </label>
        </div>

        <button className="profile_edit_submit" onClick={handleSubmit}>
          완료
        </button>
      </div>
    </div>
  );
}

export default ProfileEdit;