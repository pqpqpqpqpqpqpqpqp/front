import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import Login from '../pages/login/Login';
import Signup from '../pages/login/Signup';
import LoginRequired from 'pages/login/LoginRequired';

function SignRouter() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="sign_context">
            <Routes>
                <Route path="/sign/login" element={<Login />} />
                <Route path="/sign/signup" element={<Signup />} />
                <Route path="/sign/required" element={<LoginRequired />} />
            </Routes>
        </div>
    )
}

export default SignRouter;