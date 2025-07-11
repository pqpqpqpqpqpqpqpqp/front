import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import Signup from '../pages/login/Signup';

function SignRouter() {

    return (
        <div className="sign_context">
            <Routes>
                <Route path="/sign/login" element={<Login />} />
                <Route path="/sign/signup" element={<Signup />} />
                <Route path="/sign/restore" element={<>계정 복구 페이지 - 로그인이나 회원가입을 살짝 바꿔서 만듫것</>} />
            </Routes>
        </div>
    )
}

export default SignRouter;