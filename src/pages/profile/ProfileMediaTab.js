import 'css/profile_media_tab.css'

function ProfileMediaTab() {
  const images = null;

  return (
    <div className="media-tab">
      {Array.isArray(images) && images.length > 0 ? (
        <div className="media-grid">
          {images.map((src, index) => (
            <img key={index} src={src} alt={index} className="media-item" />
          ))}
        </div>
      ) : (
        <div className="media-no-item">이미지 없음</div>
      )}
    </div>
  );
}

export default ProfileMediaTab;