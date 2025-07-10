import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'css/sign.css';

function Login() {
    const [userId, setUserId] = useState('');
    const [userPw, setuserPw] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!userId.trim()) {
            alert('아이디 또는 이메일/전화번호를 입력해주세요.');
            return;
        }

        if (userPw.trim().length < 4) {
            alert('비밀번호는 최소 4자 이상이어야 합니다.');
            return;
        }
        /*
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userId);
        const isPhone = /^\d{10,11}$/.test(userId);
        
        let loginType = 'id';
        if (isEmail) loginType = 'email';
        else if (isPhone) loginType = 'phone';
        
        const loginPayload = {
            type: loginType,
            value: userId,
            password: userPw,
        };
        */
        // 추후 fetch로 바꿔서 요청을 넣을것
        
        alert('로그인 성공');
        navigate('/');
    };

    return (
        <div className="sign_container">
            <h2>로그인</h2>
            <form onSubmit={handleLogin} className="sign_form">
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder='아이디 또는 이메일, 전화번호'
                    required
                />
                <input
                    type="password"
                    value={userPw}
                    onChange={(e) => setuserPw(e.target.value)}
                    placeholder='비밀번호'
                    required
                />
                <button type="submit">로그인</button>
            </form>
            <p>
                아직 회원이 아니신가요? <Link to="/sign/signup">회원가입</Link>
            </p>
        </div>
    );
}

export default Login;