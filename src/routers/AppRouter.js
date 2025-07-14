import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Follow from "../pages/Follow";
import Search from "../pages/search/Search";
import Like from "../pages/Like";
import MyProfile from "../pages/profile/MyProfile";
import OtherProfile from "pages/profile/OtherProfile";
import Setting from "../pages/Setting";
import PrivateRouter from "./PrivateRouter";
import ThreadDetail from "components/ThreadDetail";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={
                <PrivateRouter>
                    <MyProfile />
                </PrivateRouter>
            } />
            <Route path="/profile/:idx" element={
                    <OtherProfile />
            } />
            <Route path="/follow" element={
                <PrivateRouter>
                    <Follow />
                </PrivateRouter>
            } />
            <Route path="/setting" element={
                <PrivateRouter>
                    <Setting />
                </PrivateRouter>
            } />
            <Route path="/like" element={
                <PrivateRouter>
                    <Like />
                </PrivateRouter>
            } />
            <Route path="/thread/:idx" element={<ThreadDetail />} />
        </Routes>
    );
}

export default AppRouter;