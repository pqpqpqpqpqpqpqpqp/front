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
import Profile from "../pages/Profile";

import '../css/app.css';

function AppRouter() {
    const location = useLocation();
    const current = location.pathname;
    const [menuDropdown, setMenuDropdown] = useState(false);

    const toggleDropdown = () => {
        setMenuDropdown(!menuDropdown);
    };

    return (
        <div className="appContainer">
            <nav className="navi">
                <div className="menuGroup">
                    <Link to="/">
                        <HiHome className={`icon ${current === '/' ? 'active' : ''}`} title="홈" />
                    </Link>
                    <Link to="/search">
                        <HiSearch className={`icon ${current === '/search' ? 'active' : ''}`} title="검색" />
                    </Link>
                    <Link to="/write">
                        <HiPlusCircle className={`icon ${current === '/write' ? 'active' : ''}`} title="작성" />
                    </Link>
                    <Link to="/notification">
                        <HiBell className={`icon ${current === '/notification' ? 'active' : ''}`} title="알림" />
                    </Link>
                    <Link to="/profile">
                        <HiUser className={`icon ${current === '/profile' ? 'active' : ''}`} title="프로필" />
                    </Link>
                </div>

                <div className="bottomMenu">
                    <div className="dropdown">
                        <HiMenu
                            className={`icon ${current === '/setting' ? 'active' : ''}`}
                            title="설정"
                            onClick={toggleDropdown}
                        />
                        {menuDropdown && (
                            <div className="dropdownContent">
                                <Link to="/sign/login">로그인</Link>
                                <Link to="/sign/signup">회원가입</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="context">
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