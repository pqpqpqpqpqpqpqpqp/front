import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'css/sign.css'

function SignRestore() {
    const [userId, setUserId] = useState('');
    const [userPw, setuserPw] = useState('');
    const navigate = useNavigate();

    const handleRestore = (e) => {
        e.preventDefault();

        if (!userId.trim()) {
            toast.warn('아이디 또는 이메일/전화번호를 입력해주세요.');
            return;
        }

        if (userPw.trim().length < 4) {
            toast.warn('비밀번호는 최소 4자 이상이어야 합니다.');
            return;
        }
        /*
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userId);
        const isPhone = /^\d{10,11}$/.test(userId);
        
        let idType = 'id';
        if (isEmail) idType = 'email';
        else if (isPhone) idType = 'phone';
        
        const restorePayload = {
            type: idType,
            value: userId,
            password: userPw,
        };
        */
        // 추후 fetch로 바꿔서 요청을 넣을것

        toast.success('계정 복구 성공');
        navigate('/');
    };

    return (
        <div className="sign_container">
            <h2>계정 복구</h2>
            <form onSubmit={handleRestore} className="sign_form">
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
                <button type="submit">계정 복구</button>
            </form>
            <p>이미 회원이신가요? <Link to="/sign/login">로그인</Link> </p>
            <p>아직 회원이 아니신가요? <Link to="/sign/signup">회원가입</Link></p>
        </div>
    );
}

export default SignRestore;