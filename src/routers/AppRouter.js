import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
    HiHome, HiSearch, HiPlusCircle, HiUser, HiBell, HiMenu
} from "react-icons/hi";

import Home from "../pages/Home";
import Search from "../pages/Search";
import Write from "../pages/Write";
import Like from "../pages/Like";
import Notification from "../pages/Notification";
import Profile from "../pages/profile/Profile";

import 'css/app.css';

function AppRouter() {
    const location = useLocation();
    const current = location.pathname;
    const [menuDropdown, setMenuDropdown] = useState(false);

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
                    <Link to="/write">
                        <HiPlusCircle className={`nav_icon ${current === '/write' ? 'active' : ''}`} title="작성" />
                    </Link>
                    <Link to="/notification">
                        <HiBell className={`nav_icon ${current === '/notification' ? 'active' : ''}`} title="알림" />
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
                                <Link>허전해서</Link>
                                <Link>넣은</Link>
                                <Link>링크</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="app_context">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/write" element={<Write />} />
                    <Route path="/like" element={<Like />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </div>
    );
}

export default AppRouter;