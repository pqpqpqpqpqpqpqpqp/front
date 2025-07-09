import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { HiHome, HiOutlineHeart, HiSearch, HiPlusCircle, HiUser, HiMenu } from "react-icons/hi";

import Home from "../pages/Home";
import Follow from "../pages/Follow";
import Search from "../pages/search/Search";
import Like from "../pages/Like";
import Profile from "../pages/profile/Profile";
import ThreadWrite from "components/ThreadWrite";
import ThreadDetail from "components/ThreadDetail";

import 'css/app.css';

function AppRouter() {
    const location = useLocation();
    const current = location.pathname;
    const [menuDropdown, setMenuDropdown] = useState(false);
    const [writeOpen, setWriteOpen] = useState(false);

    const toggleDropdown = () => {
        setMenuDropdown(!menuDropdown);
    };

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
                    <HiPlusCircle className='nav_icon' title="작성" onClick={() => setWriteOpen(true)} />
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
                            onClick={toggleDropdown}
                        />
                        {menuDropdown && (
                            <div className="setting_content">
                                <Link to="/sign/login">로그인</Link>
                                <Link to="/sign/signup">회원가입</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="app_context">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/follow" element={<Follow />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/like" element={<Like />} />
                    <Route path="/profile" element={<Profile />} />
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