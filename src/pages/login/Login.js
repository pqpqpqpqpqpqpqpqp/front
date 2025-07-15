import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import 'css/sign.css';
import { toast } from 'react-toastify';

function Login() {
    const [userId, setUserId] = useState('');
    const [userPw, setuserPw] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!userId.trim()) {
            toast.warn('이메일/전화번호를 입력해주세요.');
            return;
        }

        if (userPw.trim().length < 8) {
            toast.warn('비밀번호는 최소 8자 이상이어야 합니다.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputId: userId,
                    inputPw: userPw,
                }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok && data.code === 200) {
                const idx = data.data;
                toast.success('로그인 성공');
                login(idx);
                navigate('/');
            } else {
                toast.error(`로그인 실패: ${data.message || '서버 오류'}`);
            }
        } catch (err) {
            toast.error(`로그인 중 오류가 발생했습니다: ${err.message}`);
        }
    };

    return (
        <div className="sign_container">
            <h2>로그인</h2>
            <form onSubmit={handleLogin} className="sign_form">
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder='이메일 또는 전화번호'
                    required
                />
                <input
                    type="password"
                    value={userPw}
                    onChange={(e) => setuserPw(e.target.value)}
                    placeholder='비밀번호'
                    required
                />
                <button className='sign_form_submit_btn' type="submit">로그인</button>
            </form>
            <p>
                아직 회원이 아니신가요? <Link to="/sign/signup">회원가입</Link>
            </p>
        </div>
    );
}
// 작업 완
export default Login;