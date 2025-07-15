import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ThreadUser from "components/ThreadUser";
import { useAuth } from "context/AuthContext";
import 'css/profile_follow.css';

function ProfileFollow({ onClose }) {
    const { userIdx } = useAuth();
    const [followTab, setFollowTab] = useState("팔로워");
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFollowClose = (e) => {
        if (e.target.classList.contains("profile_follow_container")) {
            onClose();
        }
    };

    useEffect(() => {
        if (!userIdx) return;

        const fetchFollowData = async () => {
            setLoading(true);
            try {
                const url =
                    followTab === "팔로워"
                        ? `http://localhost:8080/api/user/page/list/follower?userIdx=${userIdx}`
                        : `http://localhost:8080/api/user/page/list/following?userIdx=${userIdx}`;

                const res = await fetch(url);
                const data = await res.json();

                if (data.code === 200) {
                    setUserList(data.data);
                } else {
                    toast.error(`팔로우 목록 불러오기 실패: ${data.message}`);
                }
            } catch (err) {
                toast.error(`오류 발생: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowData();
    }, [followTab, userIdx]);

    const renderFollowBody = () => {
        if (loading) {
            return <div className="profile_follow_loading">로딩 중...</div>;
        }

        if (!userList.length) {
            return <div className="profile_follow_empty">표시할 사용자가 없습니다.</div>;
        }

        return (
            <ul>
                {userList.map((user) => (
                    <li key={user.userIdx}>
                        <ThreadUser user={user} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="profile_follow_container" onClick={handleFollowClose}>
            <div className="profile_follow_card">
                <div className="profile_follow_tab_menu">
                    <div
                        onClick={() => setFollowTab("팔로워")}
                        className={followTab === "팔로워" ? "active_follow_tab" : ""}
                    >
                        팔로워
                    </div>
                    <div
                        onClick={() => setFollowTab("팔로잉")}
                        className={followTab === "팔로잉" ? "active_follow_tab" : ""}
                    >
                        팔로잉
                    </div>
                </div>
                <div className="profile_follow_body">{renderFollowBody()}</div>
            </div>
        </div>
    );
}

export default ProfileFollow;
