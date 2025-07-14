import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { HiHome, HiOutlineHeart, HiSearch, HiPlusCircle, HiUser, HiMenu } from "react-icons/hi";
import { useAuth } from "context/AuthContext";
import 'css/app.css';

function NaviBar({onWriteOpen }) {
    const { isLoggedIn, logout } = useAuth();
    const location = useLocation();
    const current = location.pathname;
    const [menuDropdown, setMenuDropdown] = useState(false);

    return (
        <nav className="app_navi">
            <div className="menu_group">
                <Link to="/">
                    <HiHome className={`nav_icon ${current === '/' ? 'active' : ''}`} title="홈" />
                </Link>
                <Link to="/search">
                    <HiSearch className={`nav_icon ${current === '/search' ? 'active' : ''}`} title="검색" />
                </Link>
                <HiPlusCircle
                    className='nav_icon'
                    title="작성"
                    onClick={() => {
                        if (!isLoggedIn) {
                            toast.warn('로그인이 필요합니다');
                            return;
                        }
                        onWriteOpen();
                    }} />
                <Link to="/follow">
                    <HiOutlineHeart className={`nav_icon ${current === '/follow' ? 'active' : ''}`} title="팔로우" />
                </Link>
                <Link to="/profile">
                    <HiUser className={`nav_icon ${current === '/profile' ? 'active' : ''}`} title="프로필" />
                </Link>
            </div>

            <div className="menu_bottom">
                <div className="setting_dropdown">
                    <HiMenu
                        className={`nav_icon ${current === '/setting' ? 'active' : ''}`}
                        title="설정"
                        onMouseEnter={() => setMenuDropdown(true)}
                    />
                    {menuDropdown && (
                        <div className="setting_content" onMouseLeave={() => setMenuDropdown(false)}>
                            {isLoggedIn ? (
                                <>
                                    <Link to="/setting">설정</Link>
                                    <Link to="/like">좋아요</Link>
                                    <div className="div_link" onClick={logout}>로그아웃</div>
                                </>
                            ) : (
                                <>
                                    <Link to="/sign/login">로그인</Link>
                                    <Link to="/sign/signup">회원가입</Link>
                                    <Link to="/sign/restore">계정 복구</Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NaviBar;