import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { HiHome, HiOutlineHeart, HiSearch, HiPlusCircle, HiUser, HiMenu } from "react-icons/hi";

import Home from "../pages/Home";
import Follow from "../pages/Follow";
import Search from "../pages/search/Search";
import Like from "../pages/Like";
import Profile from "../pages/profile/Profile";
import Setting from "pages/Setting";
import PrivateRouter from "./PrivateRouter";
import ThreadWrite from "components/ThreadWrite";
import ThreadDetail from "components/ThreadDetail";

import 'css/app.css';

function AppRouter() {
    const location = useLocation();
    const current = location.pathname;
    const [menuDropdown, setMenuDropdown] = useState(false);
    const [writeOpen, setWriteOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        console.log("🔁 라우터 렌더링됨, isLoggedIn =", isLoggedIn);
    }, [isLoggedIn]);

    const logout = () => {
        // 대충 로그아웃 요청 로직
        setIsLoggedIn(false);
    }

    return (
        <div className="app_container">
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
                                toast('로그인이 필요합니다');
                                return;
                            }
                            setWriteOpen(true);
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
                                        <div className="div_link" onClick={() => {
                                            logout();
                                        }}>로그아웃</div>
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

            <div className="app_context">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/follow" element={
                        <PrivateRouter isLoggedIn={isLoggedIn}>
                            <Follow />
                        </PrivateRouter>} />
                    <Route path="/setting" element={
                        <PrivateRouter isLoggedIn={isLoggedIn}>
                            <Setting />
                        </PrivateRouter>} />
                    <Route path="/like" element={
                        <PrivateRouter isLoggedIn={isLoggedIn}>
                            <Like />
                        </PrivateRouter>} />
                    <Route path="/thread/:id" element={<ThreadDetail />} />
                </Routes>
                {writeOpen && (
                    <ThreadWrite onClose={() => setWriteOpen(false)} />
                )}
            </div>
        </div>
    );
}

export default AppRouter;