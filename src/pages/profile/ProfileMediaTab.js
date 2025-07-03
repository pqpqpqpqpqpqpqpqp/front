import 'css/media_tab.css'

function ProfileMediaTab() {
  const images = [
    'image1.png',
    'image2.png',
    'image3.png',
    'image4.png',
    'image5.png',
    'image6.png',
    'image7.png',
    'image8.png'
  ];
  return (
    <div className="media-tab">
      <h1>내 스레드 이미지</h1>
      <div className="media-grid">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Thread ${index + 1}`} className="media-item" />
        ))}
      </div>
    </div>
  );
}

export default ProfileMediaTab;