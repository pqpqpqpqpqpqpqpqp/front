import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import Signup from '../pages/login/Signup';
import SignRestore from 'pages/login/SignRestore';
import LoginRequired from 'pages/login/LoginRequired';

function SignRouter() {

    return (
        <div className="sign_context">
            <Routes>
                <Route path="/sign/login" element={<Login />} />
                <Route path="/sign/signup" element={<Signup />} />
                <Route path="/sign/restore" element={<SignRestore />} />
                <Route path="/sign/required" element={<LoginRequired />} />
            </Routes>
        </div>
    )
}

export default SignRouter;