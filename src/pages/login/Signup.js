import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'css/sign.css';

function Signup() {
  const [userName, setUserName] = useState('');
  const [emailPhone, setEmailPhone] = useState('');
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [isEmailPhoneChecked, setIsEmailPhoneChecked] = useState(false);
  const [isUserIdChecked, setIsUserIdChecked] = useState(false);
  const navigate = useNavigate();

  const isValidName = (value) => {
    const isKorean = /^[가-힣]{2,}$/.test(value);
    const isEnglish = /^[a-zA-Z]{2,}$/.test(value);
    return isKorean || isEnglish;
  };
  const isValidEmail = (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  const isValidPhone = (value) => /^\d{10,11}$/.test(value);
  const isValidId = (value) => /^[a-zA-Z0-9_.-]{4,20}$/.test(value);
  const isValidPw = (value) =>
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{8,20}$/.test(value);

  useEffect(() => {
    setIsEmailPhoneChecked(false);
  }, [emailPhone]);

  useEffect(() => {
    setIsUserIdChecked(false);
  }, [userId]);

  const checkEmailPhone = async () => {
    if (!emailPhone.trim() || (!isValidEmail(emailPhone) && !isValidPhone(emailPhone))) {
      toast.warn('유효한 이메일 또는 전화번호를 입력해주세요.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/user/check/email-phone?inputEmailPhone=${encodeURIComponent(emailPhone)}`);
      const data = await res.json();

      if (data.code === 200) {
        toast.success('사용 가능한 이메일 또는 전화번호입니다.');
        setIsEmailPhoneChecked(true);
      } else {
        toast.warn(data.message || '이미 사용 중인 이메일 또는 전화번호입니다.');
        setIsEmailPhoneChecked(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('중복 확인 중 오류가 발생했습니다.');
      setIsEmailPhoneChecked(false);
    }
  };

  const checkUserId = async () => {
    if (!userId.trim() || userId.length < 4 || !isValidId(userId)) {
      toast.warn('아이디는 영문, 숫자, 밑줄, 하이픈, 마침표를 포함한 4~20자여야 합니다.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/user/check/id?inputUserId=${encodeURIComponent(userId)}`);
      const data = await res.json();

      if (data.code === 200) {
        toast.success('사용 가능한 아이디입니다.');
        setIsUserIdChecked(true);
      } else {
        toast.warn(data.message || '이미 사용 중인 아이디입니다.');
        setIsUserIdChecked(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('중복 확인 중 오류가 발생했습니다.');
      setIsUserIdChecked(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !isValidName(userName)) {
      toast.warn('이름은 한글 또는 영문으로 2자 이상 입력해주세요.');
      return;
    }

    if (!emailPhone.trim() || (!isValidEmail(emailPhone) && !isValidPhone(emailPhone))) {
      toast.warn('유효한 이메일 또는 전화번호를 입력해주세요.');
      return;
    }

    if (!userId.trim() || !isValidId(userId)) {
      toast.warn('사용자 이름은 영문, 숫자, 밑줄, 하이픈, 마침표를 포함한 4~20자여야 합니다.');
      return;
    }

    if (!isValidPw(userPw)) {
      toast.warn('비밀번호는 영문, 숫자, 특수문자를 포함해 8~20자로 입력해주세요.');
      return;
    }

    if (!isEmailPhoneChecked) {
      toast.warn('이메일 또는 휴대폰 중복 확인을 해주세요.');
      return;
    }

    if (!isUserIdChecked) {
      toast.warn('사용자 이름 중복 확인을 해주세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user/regist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          emailPhone: emailPhone,
          password: userPw,
          userId: userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`회원가입 실패: ${errorData.message || '서버 오류'}`);
        return;
      }

      toast.success('회원가입 성공!');
      navigate('/sign/login');
    } catch (err) {
      toast.error(`회원가입 중 오류가 발생했습니다: ${err.message}`);
    }
  };

  return (
    <div className="sign_container">
      <h2>회원가입</h2>
      <form onSubmit={(e) => { handleSignup(e) }} className="sign_form">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="이름"
          required />
        <div className='sign_form_row'>
          <input
            type="text"
            value={emailPhone}
            onChange={(e) => setEmailPhone(e.target.value)}
            placeholder="휴대폰 번호 또는 이메일 주소"
            required />
          <button type="button" onClick={checkEmailPhone}>중복확인</button>
        </div>
        <div className='sign_form_row'>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="사용자 이름"
            required />
          <button type="button" onClick={checkUserId}>중복확인</button>
        </div>
        <input
          type="password"
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
          placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8~20자)"
          required />
        <button className='sign_form_submit_btn' type="submit">회원가입</button>
      </form>
      <p>
        이미 회원이신가요? <Link to="/sign/login">로그인</Link>
      </p>
    </div>
  );
}
//작업 완
export default Signup;