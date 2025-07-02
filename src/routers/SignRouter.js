import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import Signup from '../pages/login/Signup';

function SignRouter() {

    return (
        <div>
            <Routes>
                <Route path="/sign/login" element={<Login />} />
                <Route path="/sign/signup" element={<Signup />} />
            </Routes>
        </div>
    )
}

export default SignRouter;