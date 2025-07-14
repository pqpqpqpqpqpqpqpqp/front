import { useState } from "react";
import ThreadUser from "components/ThreadUser";
import 'css/profile_follow.css'

function ProfileFollow({ onClose }) {
    const [followTab, setFollowTab] = useState('팔로워');

    const followerList = [
        { userIdx: 1, userId: 'jake123', userName: 'Jake Thompson' },
        { userIdx: 2, userId: 'mia_dev', userName: 'Mia Andersen' },
        { userIdx: 3, userId: 'liam2025', userName: 'Liam Rodriguez' },
        { userIdx: 4, userId: 'zoe.d', userName: 'Zoe Dupont' },
        { userIdx: 5, userId: 'niko_w', userName: 'Nikolai Wexler' }
    ];

    const followingList = [
        { userIdx: 1, userId: 'jake123', userName: 'Jake Thompson' },
        { userIdx: 2, userId: 'mia_dev', userName: 'Mia Andersen' },
        { userIdx: 3, userId: 'liam2025', userName: 'Liam Rodriguez' },
        { userIdx: 4, userId: 'zoe.d', userName: 'Zoe Dupont' },
        { userIdx: 5, userId: 'niko_w', userName: 'Nikolai Wexler' }
    ];

    const handleFollowClose = (e) => {
        if (e.target.classList.contains("profile_follow_container")) {
            onClose();
        }
    }

    const renderFollowBody = () => {
        switch (followTab) {
            case '팔로워':
                return (
                    <ul>
                        {followerList.map((user) => (
                            <li key={user.id}>
                                <ThreadUser user={user} />
                            </li>
                        ))}
                    </ul>
                );
            case '팔로잉':
                return (
                    <ul>
                        {followingList.map((user) => (
                            <li key={user.id}>
                                <ThreadUser user={user} />
                            </li>
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <div className="profile_follow_container" onClick={handleFollowClose}>
            <div className="profile_follow_card">
                <div className="profile_follow_tab_menu">
                    <div
                        onClick={() => setFollowTab("팔로워")}
                        className={followTab === "팔로워" ? "active_follow_tab" : ""}
                    >팔로워</div>
                    <div
                        onClick={() => setFollowTab("팔로잉")}
                        className={followTab === "팔로잉" ? "active_follow_tab" : ""}
                    >팔로잉</div>
                </div>
                <div className="profile_follow_body">{renderFollowBody()}</div>
            </div>
        </div>
    )
}

export default ProfileFollow;