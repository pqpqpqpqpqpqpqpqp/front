import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/sign.css';

function Signup() {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [emailPhone, setEmailPhone] = useState('');
  const [userPw, setUserPw] = useState('');
  const navigate = useNavigate();

  const isValidName = (value) => /^[가-힣a-zA-Z]+$/.test(value);
  const isValidEmail = (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  const isValidPhone = (value) => /^\d{10,11}$/.test(value);
  const isValidId = (value) => /^[a-zA-Z0-9_.-]{4,20}$/.test(value);
  const isValidPw = (value) => /^[a-zA-Z0-9]{4,20}$/.test(value);

  const handleSignup = (e) => {
    e.preventDefault();

    // === 입력값 유효성 검사 ===
    if (!userName.trim() || userName.trim().length < 2 || !isValidName(userName)) {
      alert('이름은 한글 또는 영문 2자 이상으로 입력해주세요.');
      return;
    }

    if (!emailPhone.trim() || (!isValidEmail(emailPhone) && !isValidPhone(emailPhone))) {
      alert('유효한 이메일 또는 전화번호를 입력해주세요.');
      return;
    }

    if (!userId.trim() || userId.length < 4 || !isValidId(userId)) {
      alert('아이디는 영문, 숫자, 밑줄, 하이픈, 마침표를 포함한 4~20자여야 합니다.');
      return;
    }

    if (!isValidPw(userPw)) {
      alert('비밀번호는 영문자와 숫자를 포함한 4~20자의 문자열이어야 하며, 특수문자는 사용할 수 없습니다.');
      return;
    }

    // 회원가입 처리 (향후 fetch 요청 예정)
    alert('회원가입 성공');
    navigate('/login');
  };

  return (
    <div className="signContainer">
      <h2>회원가입</h2>
      <form onSubmit={handleSignup} className="signForm">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="이름"
          required
        />
        <input
          type="text"
          value={emailPhone}
          onChange={(e) => setEmailPhone(e.target.value)}
          placeholder="휴대폰 번호 또는 이메일 주소"
          required
        />
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="사용자 이름"
          required
        />
        <input
          type="password"
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
          placeholder="비밀번호"
          required
        />
        <button type="submit">회원가입</button>
      </form>
      <p>
        이미 회원이신가요? <Link to="/sign/login">로그인</Link>
      </p>
    </div>
  );
}

export default Signup;