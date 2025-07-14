import { Link } from "react-router-dom";
import 'css/login_required.css'

function LoginRequired() {
    return (
        <div className="login-required-container">
            <div className="login-required-box">
                <h2>로그인이 필요한 서비스입니다</h2>
                <p>
                    이미 회원이신가요?{" "}
                    <Link to="/sign/login" className="login-link">로그인</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginRequired;